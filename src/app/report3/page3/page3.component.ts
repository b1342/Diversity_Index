import { Component, OnInit } from '@angular/core';
import { AppState, factData, DataByGivunGroup } from '../../app.state';
import * as echarts from 'echarts';
import { RootService } from '../../root.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {
  height : number;
  heightChart: number;
  fontResulation;
  selectedAnaf: any;
  selectanaf: Array<any>;
  //pngAcademic =2;
  //pngAcademicColor = 'green'
  constructor(private appStore: AppState,private rootService: RootService,public dialog: MatDialog) {  
      this.fontResulation = window.innerWidth < 600 ? 0 : ((window.innerWidth-1000)/100);
      this.appStore.tags=[]; 
      this.selectanaf= new Array<any>();  
      this.selectanaf[0]=this.anafFilter[0];
      this.selectanaf[1]=this.anafFilter[0];
      this.selectanaf[2]=this.anafFilter[0];
      this.selectanaf[3]=this.anafFilter[0];  
  }

  ngOnInit() {
    this.height =  window.innerHeight-295;   
  }
  get anafFilter(): any {    
    return this.appStore.anafFilterData;
  }

  colorCatgory(catgory: number): string { 
     
    return this.rootService.getColorChart(catgory);
  } 

  get stateNameMadd(): any {
    return this.appStore.mddFilterData;
  }
  maxScala(index : string){
    // let maxNum=-1;
    // this.appStore.givunGroupFilterData.forEach(element => {
    //   //const maxVal = this.rootService.loadDataPage3(index,element.value)[0];      
    //   if(maxVal && maxNum < maxVal.count_emp) maxNum = maxVal.count_emp;     
    // });
    // return maxNum;
  }

  dataGraf(index : string , res:  Array<DataByGivunGroup>){ 
  //  console.log(this.appStore.givunGroupData2);   
        return res.filter(x => x.anaf_sivug === index);
      }
    
  onSelect(event,data,item) {
    const select = data[event['target']['selectedIndex']];
    this.selectanaf[item] = select;   
  }

}
