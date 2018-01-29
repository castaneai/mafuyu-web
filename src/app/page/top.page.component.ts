import { Component, OnInit, keyframes } from '@angular/core';

import {PostService} from '../post.service';
import { FormControl } from '@angular/forms';
import { TagInfo } from '../tag';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TagService } from '../tag.service';
import { Post } from '../post';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.component.html',
    styleUrls: ['top.page.component.css'],
})
export class TopPageComponent implements OnInit {

    postCount: number;
    searchKeyword = new FormControl();
    suggestTagInfos: TagInfo[] = [];
    posts: Post[] = [];

    constructor(
        private postService: PostService,
        private tagService: TagService,
    ) { }

    ngOnInit() {
        this.searchKeyword.valueChanges
            .debounceTime(400)
            .subscribe(keyword => {
                this.tagService
                    .getTagInfos(keyword)
                    .then(tagInfos => this.suggestTagInfos = tagInfos);
            });

        this.postService
            .getPostCount()
            .then(count => this.postCount = count);
    }

    searchPost(keyword: string) {
        this.postService.searchPost(keyword)
            .then(posts => this.posts = posts);
    }
}