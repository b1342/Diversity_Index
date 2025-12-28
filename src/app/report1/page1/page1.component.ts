import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import * as echarts from 'echarts';
import { RootService } from '../../root.service';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Angular2Csv } from 'angular2-csv';
import { NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  height : number;
  heightChart: number;
  fontResulation;
  
  constructor(private appStore: AppState,
    public dialog: MatDialog,
    private rootService: RootService, private ngZone: NgZone){
      this.fontResulation = window.innerWidth < 600 ? 0 : ((window.innerWidth-1000)/100);
      this.appStore.tags=[];
     }

     
     onChartClick(selected) {
       debugger;
       console.log(Number(selected['dataIndex']));
      // logger.log(this.appStore.ishpuzTfusa);
          this.ngZone.runGuarded(() => {
             // const chartOption: echarts.EChartOption = this.state.chartOption;              
               
              //  console.log(chartOption.yAxis['axisPointer'].value);
              //  chartOption.yAxis['axisPointer'].value = this.state.units_s[this.state.indexSelected];
              //  this.appStore.ishpuzTfusa.chartOption = chartOption;
     
        });
      }
 
  ngOnInit() {
    this.height =  window.innerHeight-200;
   // this.heightChart =  window.innerHeight-145;
  }
  get filterSTR(): string {      
    return   this.appStore.selectmdd.name;
  }
  get tags(): any {      
    return this.appStore.tags;
  }
  tag_click(tag: string) {
    const index =  this.tags.indexOf(tag, 0);
    if (index === -1) {
      this.tags.push(tag);
    }   
 }

 getAnafName(anafId :number): any {   
   
  return   this.appStore.anafGlobalFilterData.filter(x=>x.value === Number(anafId));
                                           
} 
  remove_tag_click(itemTag: any) {
    const index =  this.appStore.tags.findIndex(a => a === itemTag);   
    if (index > -1) {     
     this.appStore.tags.splice(index, 1);  
     this.appStore['select' + itemTag.type]=this.appStore[itemTag.type + 'FilterData'][0];  
     this.rootService.loadDataPage1();     
    }
    else
      this.appStore.tags=[];
    this.rootService.changeSelect();
}  


  get stateMegama(): any {
     return this.appStore.grafData;
  }

  get stateMegama2(): any {
     return this.appStore.grafData2;
  }
  get stateMegama3(): any {
    return this.appStore.grafData3;
 }
 get stateMegama4(): any {
    return this.appStore.grafData4;
 }
 get stateMegama5(): any {
    return this.appStore.grafData5;
 }
 get stateMegama6(): any {
    return this.appStore.grafData6;
 }

 exportAsCSV(allDataToExport,nameKotar) { 
    let tableToExport= new Array<object>();  
    tableToExport.push({
      year : 'שנה',
      anaf_Name_Short : 'ענף',
      mdd: this.appStore.selectmdd != null ?  this.appStore.selectmdd.name : '' ,
      }); 
    for(let i=0; i<allDataToExport.length; i++)
    {
      tableToExport.push({
        year : allDataToExport[i]['year'],
        anaf_Name_Short : allDataToExport[i]['anaf_Name_Short'],
        mdd: allDataToExport[i][this.appStore.selectmdd.value]>-1? Number(allDataToExport[i][this.appStore.selectmdd.value]).toFixed(2): '' 
        });      
    }
    let titleCsv = nameKotar;  
    const nameMigdar6=this.getAnafName(7)[0].name;
    this.appStore.tags.forEach(element => { 
      //אם מיצאים מגזר ציבורי פילטר גודל עסק לא מושפיע על רכיב
       if(nameKotar !== nameMigdar6 || (nameKotar === nameMigdar6 && element.type!='godel')){
      switch (element.type) {
        case 'gil':{       
          titleCsv += ',גיל:'
          break; }             
        case 'godel':{      
          titleCsv += ',גודל עסק:'
          break;}    
        default :
        { titleCsv += ','
           break;}       
        }  
      titleCsv += element.value.name;
    }});   
    const options = {
      fieldSeparator  : ',',
      quoteStrings    : '"',
      decimalseparator: '.',
      showLabels      : true,
      ///headers         : Object.keys(tableToExport[0]),
      showTitle       : true,
      title           : titleCsv,
      useBom          : true,
  };
  return new Angular2Csv(tableToExport, nameKotar,options);
  }
   
  openAgdarotMadd()
  {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
      //  dialogConfig.height = 400px';
      //  dialogConfig.width = (window.innerWidth/100)*40 + 'px';

      // dialogConfig.data = {
      // id: 1,
      // title: '',
      // };

     const dialogRef = this.dialog.open(DialogComponent,  {
      //  width: '250px',
      //  height: '300px'
     });
     dialogRef.afterClosed().subscribe(result => {

    });
  }

   

}
