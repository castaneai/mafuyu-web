import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TopPageComponent } from './page/top.page.component';

const routes: Routes = [
  { path: '', component: TopPageComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}