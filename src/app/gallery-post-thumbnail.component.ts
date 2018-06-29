import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryItemComponent } from '@ngx-gallery/core';

@Component({
  selector: 'thumbnail-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div [lazyImage]="data.thumbnail_url"></div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
    div {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
    }
  `]
})
export class GalleryPostThumbnailComponent implements GalleryItemComponent {
  @Input() data: any;
}