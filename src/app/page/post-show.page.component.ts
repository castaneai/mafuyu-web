import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import {PostService} from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';

@Component({
    selector: 'app-post-show',
    templateUrl: 'post-show.page.component.html',
    styleUrls: ['post-show.page.component.css'],
})
export class PostShowPageComponent implements OnInit {

    post: Post;

    constructor(
        private route: ActivatedRoute,
        private meta: Meta,
        private postService: PostService,
    ) { }

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .then(post => {
                this.setMeta(post);
                this.post = post;
            });
    }

    setMeta(post: Post) {
        this.meta.addTags([
            {name: "og:title", content: post.title},
            {name: "og:image", content: post.thumbnail_url},
            {name: "og:description", content: post.tags.join(' ')},
        ])
    }
}