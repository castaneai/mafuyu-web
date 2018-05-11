const fs = require('fs');
const functions = require('firebase-functions');
const datastore = require('@google-cloud/datastore')();

exports.ogp = functions.https.onRequest((request, response) => {
    if (!request.path) {
        response.redirect('/');
        return;
    }
    const postId = request.path ? parseInt(request.path.split('/')[2]) : null;
    if (!postId) {
        response.redirect('/');
        return;
    }

    const key = datastore.key(['Post', postId]);
    const query = datastore
        .get(key)
        .then(results => {
            const post = results[0];
            if (!post) {
                console.error('not found');
                response.redirect('/');
                return;
            }
            response.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000');

            fs.readFile('./index.html', 'utf8', (err, html) => {
                if (err) {
                    console.error(err);
                    response.redirect('/');
                    return;
                }
                const responseHtml = html
                    .replace(/<meta property="og:title" content=""/g, `<meta property="og:title" content="${post.title}"`)
                    .replace(/<meta property="og:description" content=""/g, `<meta property="og:description" content="${post.tags.join(' ')}"`)
                    .replace(/<meta property="og:url" content=""/g, `<meta property="og:url" content="/post/${postId}"`)
                    .replace(/<meta property="og:image" content=""/g, `<meta property="og:image" content="${post.thumbnail_url}"`);
                response.status(200).send(responseHtml);
            });
        })
        .catch(err => {
            console.error(err);
        });
});
