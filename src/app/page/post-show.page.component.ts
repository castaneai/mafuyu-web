import { Component, OnInit } from '@angular/core';

import {PostService} from '../post.service';

@Component({
    selector: 'app-post-show',
    templateUrl: 'post-show.page.component.html',
    styleUrls: ['post-show.page.component.css'],
})
export class PostShowPageComponent implements OnInit {

    constructor(
        private postService: PostService,
    ) { }

    ngOnInit() {
    }
}