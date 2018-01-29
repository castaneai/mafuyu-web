import { Component, OnInit } from '@angular/core';

import {PostService} from '../post.service';

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.component.html',
    styleUrls: ['top.page.component.css'],
})
export class TopPageComponent implements OnInit {

    private postCount: number;

    constructor(
        private postService: PostService,
    ) { }

    ngOnInit() {
        this.postService
            .getPostCount()
            .then(count => this.postCount = count);
    }
}