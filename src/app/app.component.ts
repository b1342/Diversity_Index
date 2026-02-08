import { Router } from '@angular/router';
import { RootService } from './root.service';
import { Component,  OnInit, HostBinding } from '@angular/core';
import { AppService } from './app.service';
import { AppState } from './app.state';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAlertComponent } from './globalComponent/dialog-alert/dialog-alert.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})     
export class AppComponent implements  OnInit {
  ngOnInit() {
    console.log('AppStore:', this.appStore);
  }
  // @HostBinding('@routerTransition') routerTransition;
  @HostBinding('class.app-container') container = true; 
  isReady = false;
  

  
  constructor(private rootService: RootService, private appService: AppService,
    public appStore: AppState, public dialog: MatDialog,
    private route: Router) {
        this.dialogOpenSite();
        this.initialization(); 
    
  }
  

  async initialization() {      
  //  await this.rootService.loadFilterData('year'); 
  //  await this.rootService.importCsv();
   //  await this.rootService.importCsv('C:\Users\TamarMe1\source\repos\testApi\testApi\EqualityData_version7.xlsx');    
    this.isReady = true;
    this.appStore.isReady= true;
    this.run();
  }


  run() {
     try {  
     //  this.isReady = this.rootService.loadAcademicPrcntData(),    
     //  console.log( this.isReady);
       this.rootService.loadFilter();       
    } finally {     
    }
  }

  dialogOpenSite()
  {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = false;
       dialogConfig.autoFocus = false;  
       dialogConfig.hasBackdrop= false;  
     const dialogRef = this.dialog.open(DialogAlertComponent,  {  
      //   hasBackdrop: false,            
     });
     dialogRef.afterClosed().subscribe(result => {

    });
  } 

}