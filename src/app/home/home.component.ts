import { Component, OnInit } from '@angular/core';
import { AppState, FilterData, factData } from '../app.state';
import * as echarts from 'echarts';
import { RootService } from '../root.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { DialogAlertComponent } from '../globalComponent/dialog-alert/dialog-alert.component';
import { ReCaptchaV3Service } from 'ng-recaptcha';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  height : number;
 // width : number;
  heightChart: number;
  fontResulation;
  
  constructor(public appStore: AppState,
              private rootService: RootService,
              public router: Router,
              
            ){
      this.fontResulation = window.innerWidth < 600 ? 0 : ((window.innerWidth-1000)/100);
     
     }

  ngOnInit() {
    this.height =  window.innerHeight-132;
    //this.dialogOpenSite();
   // this.width =  window.innerWidth;
    //this.rootService.loadDataHome();
   // this.heightChart =  window.innerHeight-145;
  }
  openPage(router){
  
    this.router.navigateByUrl('/'+router);
  
 }
}
