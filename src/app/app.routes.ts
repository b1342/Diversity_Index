import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { report1Component } from './report1/report1.component';
import { report2Component } from './report2/report2.component';
import { report3Component } from './report3/report3.component';
import { report4Component } from './report4/report4.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'report1', component: report1Component },
  { path: 'report2', component: report2Component },
  { path: 'report3', component: report3Component },
  { path: 'report4', component: report4Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
