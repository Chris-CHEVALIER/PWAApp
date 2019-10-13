import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'hello', component: HelloComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
