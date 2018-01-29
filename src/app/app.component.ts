import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  postCount: number;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPostCount()
      .then(count => this.postCount = count);
  }

}
