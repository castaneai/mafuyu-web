
import { debounceTime } from 'rxjs/operators';
import 'hammerjs';
import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormControl } from '@angular/forms';
import { TagInfo } from '../tag';

import { TagService } from '../tag.service';
import { Post } from '../post';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryItem, Gallery, GalleryRef } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { GalleryPostComponent } from '../gallery-post.component';
import { GalleryPostThumbnailComponent } from '../gallery-post-thumbnail.component';

const GALLERY_LOAD_COUNT = 31;
const GALLERY_LOAD_RANGE = Math.floor(GALLERY_LOAD_COUNT / 2);

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.component.html',
    styleUrls: ['top.page.component.css'],
})
export class TopPageComponent implements OnInit {

    searchKeyword = new FormControl();
    suggestTagInfos: TagInfo[] = [];
    posts: Post[] = [];
    currentIndex: number = 0;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        private tagService: TagService,
        private gallery: Gallery,
        private lightbox: Lightbox,
    ) { }

    ngOnInit() {
        this.searchKeyword.valueChanges.pipe(debounceTime(400)).subscribe(keyword => {
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
            .then(ps => this.renderPosts(ps));
    }

    renderPosts(posts: Post[]) {
        this.posts = posts;
    }

    postToGalleryItem(post: Post): GalleryItem {
        return {
            data: post,
            component: GalleryPostComponent,
            thumbComponent: GalleryPostThumbnailComponent,
        };
    }

    getGalleryRef(): GalleryRef {
        return this.gallery.ref('lightbox');
    }

    viewPost(post: Post) {
        const totalIndex = this.posts.findIndex(p => p.id === post.id);
        const loadPosts = this.posts.slice(
            Math.max(0, totalIndex - GALLERY_LOAD_RANGE),
            Math.min(totalIndex + GALLERY_LOAD_RANGE + 1, this.posts.length)
        );
        this.getGalleryRef().load(loadPosts.map(this.postToGalleryItem));
        const loadIndex = loadPosts.findIndex(p => p.id == post.id);
        this.lightbox.open(loadIndex, 'lightbox');
    }
}
