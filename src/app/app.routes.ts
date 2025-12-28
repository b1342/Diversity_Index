import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import {  RouterModule} from '@angular/router';

import { report1Component } from './report1/report1.component';
import { report2Component } from './report2/report2.component';
import { HomeComponent } from './home/home.component';
import { report3Component } from './report3/report3.component';
import { report4Component } from './report4/report4.component';


export const routes: any[] = [
  {path: '*/:id', component: AppComponent},
  {path: '', component: HomeComponent , pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'report1', component: report1Component},
  {path: 'report2', component: report2Component},
  {path: 'report3', component: report3Component},
  {path: 'report4', component: report4Component}
];

  @NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
  })
  export class appRoutingModule {

  }

  
