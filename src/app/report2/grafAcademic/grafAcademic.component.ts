import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../app.state';
import { RootService } from '../../root.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-grafAcademic',
  templateUrl: './grafAcademic.component.html',
  styleUrls: ['./grafAcademic.component.css']
})
export class GrafAcademicComponent implements OnInit {
  
  @Input('isAcademic') isAcademic: number;
  pngAcademic =2;
  height: number;
  display = 'list';
  data: any;

  constructor(private rootService: RootService, private appStore: AppState) {
    this.data=this.appStore.factAllData.filter(x=>x.ifAcademicid === this.appStore.selectacademic[0]);
  }

  ngOnInit(): void { 
   const resulation =  (Number(window.innerHeight) / 7);
   this.height = window.innerHeight-85-resulation;
  }
  exportAsCSV(allDataToExport,showMdd) { 
    const name = showMdd.name;
    const nameMdd = showMdd.value;
    allDataToExport =allDataToExport
     .sort((a, b) => a[nameMdd] > b[nameMdd] ? -1 : a[nameMdd] > b[nameMdd] ? 1 : 0);  
   
    let tableToExport= new Array<object>();  
    tableToExport.push({
      anaf_Name_Short : 'ענף',
      mdd: name,
      }); 
    for(let i=0; i<allDataToExport.length; i++)
    {
      tableToExport.push({      
        anaf_Name_Short : allDataToExport[i]['anaf_Name_Short'],
        mdd: allDataToExport[i][nameMdd]>-1? Number(allDataToExport[i][nameMdd]).toFixed(2): '' 
        });      
    }
    const nameKotar= showMdd.name+ '-' + this.appStore.academicFilterData.filter(x=> x.value === this.isAcademic)[0].name;    
    let titleCsv = nameKotar;
    this.appStore.tags.forEach(element => {        
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
    });   
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
  get stateCount_emp(): any {
    return this.appStore.factAllData.filter(x=>x.ifAcademicid === this.isAcademic)
    .sort((a, b) => a.count_emp > b.count_emp ? -1 : a.count_emp > b.count_emp ? 1 : 0);  
  }
  get stateAverage_salary(): any {
    return this.appStore.factAllData.filter(x=>x.ifAcademicid === this.isAcademic )
    .sort((a, b) => a.average_salary > b.average_salary ? -1 : a.average_salary > b.average_salary ? 1 : 0);  
  }
  get stateZiun_shivioniut_sahar(): any {
    return this.appStore.factAllData.filter(x=>x.ifAcademicid === this.isAcademic )
    .sort((a, b) => a.tziun_shivioniut_sahar > b.tziun_shivioniut_sahar ? -1 : a.tziun_shivioniut_sahar > b.tziun_shivioniut_sahar ? 1 : 0);  
  }
  get statetZiunei_yetzug(): any {
    return this.appStore.factAllData.filter(x=>x.ifAcademicid === this.isAcademic )
    .sort((a, b) => a.tziunei_yetzug > b.tziunei_yetzug ? -1 : a.tziunei_yetzug > b.tziunei_yetzug ? 1 : 0);  
  }




    get stateNameMadd(): any {    
    return this.appStore.mddFilterData;
  }

}
