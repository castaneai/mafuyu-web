import 'hammerjs';
import { Component, OnInit, keyframes } from '@angular/core';

import { PostService } from '../post.service';
import { FormControl } from '@angular/forms';
import { TagInfo } from '../tag';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { TagService } from '../tag.service';
import { Post } from '../post';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';

import {
    NgxGalleryOptions,
    NgxGalleryImage,
    NgxGalleryAnimation,
    NgxGalleryImageSize,
} from 'ngx-gallery';

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.component.html',
    styleUrls: ['top.page.component.css'],
})
export class TopPageComponent implements OnInit {
    searchKeyword = new FormControl();
    suggestTagInfos: TagInfo[] = [];
    posts: Post[] = [];

    galleryOptions: NgxGalleryOptions[] = [
        {
            width: '100%',
            height: '100%',

            imageSwipe: true,
            imageSize: NgxGalleryImageSize.Contain,
            imageAnimation: NgxGalleryAnimation.Slide,

            thumbnailsMargin: 0,
            thumbnailsSwipe: true,
            thumbnailMargin: 0,
            thumbnailsMoveSize: 4,

            preview: false,
        },
    ];
    galleryImages: NgxGalleryImage[] = [];
    galleryVisible: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        private tagService: TagService,
    ) {}

    ngOnInit() {
        this.searchKeyword.valueChanges.debounceTime(400).subscribe(keyword => {
            this.tagService
                .getTagInfos(keyword)
                .then(tagInfos => (this.suggestTagInfos = tagInfos));
        });

        const q = this.route.snapshot.queryParamMap.get('q');
        if (q !== null) {
            this.searchPost(q);
        }
    }

    searchPost(keyword: string) {
        this.router.navigate(['/'], { queryParams: { q: keyword } });
        this.postService
            .searchPost(keyword)
            .then(posts => (this.posts = posts));
    }

    viewPost(post: Post) {
        const startIndex = this.posts.findIndex(p => p.id === post.id);
        this.galleryOptions[0].startIndex = startIndex;
        this.galleryImages = this.posts.map(p => this.postToGalleryImage(p));
        this.galleryVisible = true;
    }

    closeGallery() {
        this.galleryVisible = false;
    }

    private postToGalleryImage(post: Post): NgxGalleryImage {
        return {
            small: post.thumbnail_url,
            medium: post.pages[0].content_url,
            big: post.pages[0].content_url,
            url: `/post/${post.id}`,
            description: post.tags.join(' '),
        };
    }
}
