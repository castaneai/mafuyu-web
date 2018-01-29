import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TopPageComponent } from './page/top.page.component';
import { PostShowPageComponent } from './page/post-show.page.component';
import { PostService } from './post.service';
import { AppRoutingModule } from './app.routing.module';
import { TagService } from './tag.service';


@NgModule({
  declarations: [
    AppComponent,
    TopPageComponent,
    PostShowPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatGridListModule,
  ],
  providers: [
    PostService,
    TagService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
