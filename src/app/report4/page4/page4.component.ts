import { Component, OnInit } from '@angular/core';
import { AppState, DataByGivunGroup } from '../../app.state';
import * as echarts from 'echarts';
import { RootService } from '../../root.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class Page4Component implements OnInit {
  height : number;
  heightChart: number;
  fontResulation;
  //pngAcademic =2;
  //pngAcademicColor = 'green'
  constructor(public appStore: AppState,private rootService: RootService,public dialog: MatDialog) {  
      this.fontResulation = window.innerWidth < 600 ? 0 : ((window.innerWidth-1000)/100);
      this.appStore.tags=[]; 
      console.log(appStore.selectgivunGroup.value);  
  }

  ngOnInit() {
    this.height =  window.innerHeight-200;   
    this.appStore.selectmdd = null;
  }
  dataGraf3(){
    //מחזיר נתון לרכיב מכל הפאקט כמו הגרפים שם הוספנו פילטור של גולדל וכאן פילטור של שנה וקבוצת גיל
      
      if(this.appStore.selectgivunGroup.value < 5){
        this.appStore.factAllData= this.appStore.factAllData.filter(
          x=>x.kv_gil_id=== this.appStore.selectgil.value
        );}
      return  this.appStore.factAllData.filter(x => x.year=== 2020
      && x.id_givun_group=== this.appStore.selectgivunGroup.value
      && x.count_emp>-1)
     
  }
 
exportAsCSVcub(allDataToExport,nameKotar) { 
  console.log(allDataToExport);//console.log(showMdd);
  let tableToExport= new Array<object>();  
  tableToExport.push({
    godel_Name : 'גודל עסק',
    mdd: 'מספר מועסקים' ,
    }); 
  for(let i=0; i<allDataToExport.length; i++)
  {
    tableToExport.push({
      godel_Name : allDataToExport[i].godel ? allDataToExport[i].godel: this.appStore.godelFilterData.filter(x => x.value === allDataToExport[i].godel_id)[0].name,
      mdd: Number(allDataToExport[i].count_emp).toFixed(2)  
      });      
  }
  let titleCsv = nameKotar;   
  this.appStore.tags.forEach(element => {   
    if(element.type!='godel') {  
      switch (element.type) {
      case 'gil':{       
        titleCsv += ',גיל:'
        break; }             
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
 
exportAsCSV(allDataToExport,nameKotar,showMdd) { 
  //console.log(allDataToExport);console.log(showMdd);
  let tableToExport= new Array<object>();  
  tableToExport.push({
    year : 'שנה',
    anaf_Name_Short : 'קבוצת גיל',
    mdd: nameKotar ,
    }); 
  for(let i=0; i<allDataToExport.length; i++)
  {
    if(allDataToExport[i][showMdd]>-1){
    tableToExport.push({
      year : allDataToExport[i]['year'],
      anaf_Name_Short : this.appStore.gilFilterData.filter(x =>x.value === Number(allDataToExport[i]['kv_gil_id']))[0].name,
      mdd: Number(allDataToExport[i][showMdd]).toFixed(2)  
      });      
  }}
  let titleCsv = nameKotar;   
  this.appStore.tags.forEach(element => {  
    if(element.type!='gil') { 
      switch (element.type) {              
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
  get stateMegama6(): any {
    return this.appStore.grafData6;
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

get numAllAcadmic(): any {    
  return   this.appStore.homePageSumData.filter(x=>x.IfAcademic_id === 2);
                                             
} 

get stateMumifAcademic(): any { 
  return this.appStore.academicPrcnt.filter(x => 
    x.anaf_sivug=== this.appStore.selectanaf.value
  );
}

}
