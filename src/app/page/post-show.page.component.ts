import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { PostService } from '../post.service';
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
        private platformLocation: PlatformLocation,
        private route: ActivatedRoute,
        private postService: PostService,
    ) { }

    ngOnInit() {
        this.getPost();
    }

    getPost() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPost(id)
            .then(post => {
                this.post = post;
            });
    }
}