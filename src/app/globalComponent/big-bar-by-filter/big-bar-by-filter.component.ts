
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-big-bar-by-filter',
  templateUrl: './big-bar-by-filter.component.html',
  styleUrls: ['./big-bar-by-filter.component.scss']
})
export class bigBarByFilterComponent implements OnInit {
  height : number;
  @HostBinding('class.container') container = true;
  @Input('Scala') scalaData: any;
  @Input('catgory') catgory: number;
     
 constructor(private rootService: RootService, private appStore: AppState) {
 
  }


  ngOnInit() {
    this.height =  (window.innerHeight-300)/5; 
  //  this.dataCountEmp = this.anaf === 'anaf_Global_Id' ? this.appStore.factAllData[0].anaf_Global_Id : this.appStore.selectanaf.value 
  }

//  getdata(){
//   this.dataCountEmp = this.appStore.factAll.filter(x => x.year=== 2020
//     && x.kv_gil_id=== this.appStore.selectgil.value 
//     && x.ifAcademicid=== this.appStore.selectacademic.value
//     && x.id_givun_group=== this.catgory
//     && x.anaf_sivug === this.appStore.selectanaf.value);
//     if(this.appStore.selectgivunGroup.value===5 || this.catgory === -1){
//       this.dataCountEmp= this.dataCountEmp.filter(
//         x=>x.leom_id=== 0 
//   );}    
//     if(this.appStore.selectgivunGroup.value >1 && this.catgory > 0){
//       this.dataCountEmp= this.dataCountEmp.filter(
//         x=>x.gender_id=== this.appStore.selectgander.value
//   );} 
//  }
  
  colorCatgory(index: number): string {      
     if(this.catgory === -1) 
     return this.appStore.selectgodel.value === index || 
     this.appStore.selectgodel.value === 0 ? '#1A6F96' : '#D1DDE2';
     else
     return this.appStore.selectgodel.value === index || 
     this.appStore.selectgodel.value === 0 ? '#8F4091' : '#D1DDE2';
  } 

  get maxScala(): number { 
    return Math.max.apply(this, this.scalaData.filter(x => x.godel_id > 0).map(a => a.count_emp)); 
  } 

  get godelData(): Array<FilterData> {      
    return  this.appStore.godelFilterData.filter(x => x.value> 0); 
  } 

   getGodelName(index : number): Array<FilterData> {      
    return  this.appStore.godelFilterData.filter(x => x.value === index); 
  } 
   stateData(index : number): any {   
    return this.scalaData.filter(x => x.godel_id === index)
       .sort((a, b) => a.godel_id > b.godel_id ? -1 : a.godel_id > b.godel_id ? 1 : 0);
  } 

  exportAsCSV() { 
    const nameKotar ='מספר מועסקים לפי גודל עסק ';
    let tableToExport= new Array<object>();  
    tableToExport.push({
      godel : 'גודל עסק',
      mdd: 'מספר מועסקים' ,
      }); 
    for(let i=0; i<this.scalaData.length; i++)
    {
      tableToExport.push({
        godel : this.appStore.godelFilterData.filter(x => x.value === this.scalaData[i].godel_id),
        mdd: Number(this.scalaData[i].count_emp) 
        });      
    }
    let titleCsv = nameKotar;     
    this.appStore.tags.forEach(element => {    
        switch (element.type) {
        case 'gil':{       
          titleCsv += ',גיל:'
          break; }             
        default :
        { titleCsv += ','
           break;}       
        }  
      titleCsv += element.value.name ;
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
}
