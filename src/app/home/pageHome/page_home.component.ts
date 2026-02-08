
import { RootService } from './../../root.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { AppState } from '../../app.state';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';



@Component({
  selector: 'app-page_home',
  templateUrl: './page_home.component.html',
  styleUrls: ['./page_home.component.scss']
})
export class PageHomeComponent implements OnInit {
  @HostBinding('class.container') container = true;
  height;
  constructor(private rootService: RootService, public appStore: AppState,public dialog: MatDialog) {

  }


  ngOnInit() {
    this.height =  window.innerHeight-137;
  }
  
  get numAll(): any {      
    return   this.appStore.homePageSumAllData; 
  } 
  get numAllAcadmic(): any {    
    return   this.appStore.homePageSumData.filter(x=>x.IfAcademic_id === 2);
                                               
  } 
  get numAllNoAcadmic(): any {      
    return   this.appStore.homePageSumData.filter(x=>x.IfAcademic_id === 3)
                                              
  } 
  get pieChartNoAcademi(): object {      
    return   this.appStore.pieChartNoAcademi1;
  }
  openAgdarotMadd()
  {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;      

     const dialogRef = this.dialog.open(DialogComponent,  {
      //  width: '250px',
      //  height: '300px'
     });
     dialogRef.afterClosed().subscribe(result => {

    });
  }
}
