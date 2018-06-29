import { ChangeDetectionStrategy, Component, Input, HostListener } from '@angular/core';
import { GalleryItemComponent } from '@ngx-gallery/core';
import { Post } from './post';
import { Router } from '@angular/router';

@Component({
  selector: 'gallery-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `<div [lazyImage]="data?.pages[0]?.content_url" (loading)="loading = $event"></div>
  <i class="g-loading" *ngIf="loading"></i>`,
  styles: [`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    div {
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  `],
})
export class GalleryPostComponent implements GalleryItemComponent {
  loading: boolean;

  @Input() data: Post;

  @HostListener('tap', ['$event']) onClick(ev: Event) {
    this.tapContent();
  }

  constructor(private router: Router) { }

  tapContent() {
    const url = this.router.parseUrl("/post/" + this.data.id).toString();
    window.open(url, '_blank');
  }
}