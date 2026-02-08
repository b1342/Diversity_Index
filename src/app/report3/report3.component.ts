import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from '../app.state';
import { RootService } from '../root.service';
import {  MatDialogConfig,  MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../globalComponent/dialog-alert/dialog-alert.component';


@Component({
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.scss']
})
export class report3Component implements OnInit,OnChanges {
  
  height : number;
  constructor(public appStore: AppState,private rootService: RootService,public dialog: MatDialog) { 
    this.rootService.loadDataCaptchaV3(); 
  }
  ngOnChanges() {
  }

  ngOnInit() {    
    this.height =  window.innerHeight-72; 
  }

    
}
