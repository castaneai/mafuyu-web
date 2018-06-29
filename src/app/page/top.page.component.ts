
import { debounceTime } from 'rxjs/operators';
import 'hammerjs';
import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { FormControl } from '@angular/forms';
import { TagInfo } from '../tag';

import { TagService } from '../tag.service';
import { Post } from '../post';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryItem, Gallery } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { GalleryPostComponent } from '../gallery-post.component';
import { GalleryPostThumbnailComponent } from '../gallery-post-thumbnail.component';

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.component.html',
    styleUrls: ['top.page.component.css'],
})
export class TopPageComponent implements OnInit {
    searchKeyword = new FormControl();
    suggestTagInfos: TagInfo[] = [];
    posts: Post[] = [];

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
        this.gallery.ref('lightbox').load(posts.map(this.postToGalleryItem));
    }

    postToGalleryItem(post: Post): GalleryItem {
        return {
            data: post,
            component: GalleryPostComponent,
            thumbComponent: GalleryPostThumbnailComponent,
        };
    }

    viewPost(post: Post) {
        const startIndex = this.posts.findIndex(p => p.id === post.id);
        this.lightbox.open(startIndex, 'lightbox');
    }
}
