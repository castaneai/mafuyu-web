import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { TopPageComponent } from './page/top.page.component';
import { PostShowPageComponent } from './page/post-show.page.component';
import { PostService } from './post.service';
import { AppRoutingModule } from './app.routing.module';
import { TagService } from './tag.service';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GalleryPostComponent } from './gallery-post.component';
import { GalleryPostThumbnailComponent } from './gallery-post-thumbnail.component';

@NgModule({
    declarations: [
        AppComponent,
        TopPageComponent,
        PostShowPageComponent,
        GalleryPostComponent,
        GalleryPostThumbnailComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        // material 
        MatInputModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,

        // for gallery
        GalleryModule.forRoot(),
        LightboxModule.forRoot({
            panelClass: 'fullscreen'
        }),
        LazyLoadImageModule,
    ],
    entryComponents: [
        GalleryPostComponent,
        GalleryPostThumbnailComponent,
    ],
    providers: [PostService, TagService],
    bootstrap: [AppComponent],
})
export class AppModule { }
