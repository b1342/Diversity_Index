
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState, FilterData } from 'src/app/app.state';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';




@Component({
  selector: 'app-bar-by-filter',
  templateUrl: './bar-by-filter.component.html',
  styleUrls: ['./bar-by-filter.component.scss']
})
export class barByFilterComponent implements OnInit {
  height : number;
  @HostBinding('class.container') container = true;
 // @Input('AnafSivug') anafSivug: string;
  @Input('Scala') scalaData: any;
  constructor(private rootService: RootService, private appStore: AppState) {

  }


  ngOnInit() {
    this.height =  (window.innerHeight-300)/5; 
   }
  colorCatgory(index: number): string { 
    return this.appStore.selectgodel.value === index || 
    this.appStore.selectgodel.value === 0 ? '#1A6F96' : '#D1DDE2';    
 } 

  get godelData(): Array<FilterData> {      
    return  this.appStore.godelFilterData.filter(x => x.value> 0); 
  } 


  get maxScala(): number {      
    return Math.max.apply(this,this.scalaData.filter(x => x.godel_id > 0).map(a => a.count_emp)); 
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
      godel : ''+this.scalaData[i].godel+'',
      mdd: Number(this.scalaData[i].count_emp) 
      });      
  }
  let titleCsv = nameKotar;
  if(this.scalaData) titleCsv +=',' + this.scalaData[0].anaf_Name_Short;   
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
    titleCsv += element.value.name ;
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
}
