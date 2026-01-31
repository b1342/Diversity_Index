import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import * as echarts from 'echarts';
import { RootService } from '../../root.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  height : number;
  heightChart: number;
  fontResulation;
  //pngAcademic =2;
  //pngAcademicColor = 'green'
  constructor(public appStore: AppState,private rootService: RootService) {  
      this.fontResulation = window.innerWidth < 600 ? 0 : ((window.innerWidth-1000)/100);      
  }

  ngOnInit() {
    this.height =  window.innerHeight-185; 
    this.appStore.selectmdd = null;

  }



  // get pngAcademicColor(): string {      
  //   return  this.appStore.selectmdd.name;
  // }
  get pngAcademic(): number {  
    switch (this.appStore.selectgivunGroup.value) {
      case 1:
          return 1;         
      case 2:
          return 2; 
      case 3:
          return 3; 
      case 4:
         return 4; 
      case 5:
        return 5; 
      case 6:
         return 5;         
      
    }
  }
  get pngAcademicColor(): string {
    return this.rootService.getColorChart(this.appStore.selectgivunGroup.value);      
  }
 
  get stateMegama(): any {  
    return this.appStore.grafData;
  }

}
