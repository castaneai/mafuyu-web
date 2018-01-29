export class Post {
    id: number;
    title: string;
    tags: string[];
    pages: PostPage[];
    thumbnail_url: string;
}

export class PostPage {
    content_url: string;
}