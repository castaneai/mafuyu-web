import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TopPageComponent } from './page/top.page.component';
import { PostShowPageComponent } from './page/post-show.page.component';

const routes: Routes = [
  { path: '', component: TopPageComponent },
  { path: 'post/:id', component: PostShowPageComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}