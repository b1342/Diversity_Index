
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';




@Component({
  selector: 'app-num-category',
  templateUrl: './num-category.component.html',
  styleUrls: ['./num-category.component.scss']
})
export class numCategoryComponent implements OnInit {
  @HostBinding('class.container') container = true;
  @Input('headerTxt') headerTxt: string;
  @Input('Scala') scalaData: any;
  constructor(private rootService: RootService, private appStore: AppState) {

  }


  ngOnInit() {

  }
//  get stateData(): any { 
//       return this.scalaData.sort((a, b) => a.id_givun_group > b.id_givun_group ? -1 : a.id_givun_group > b.id_givun_group ? 1 : 0);
//     } 

    stateData(index : number): any { 
     // console.log(this.scalaData.filter(x => x.givun === index));
      return this.scalaData.filter(x => x.givun === index)
       .sort((a, b) => a.id_givun_group > b.id_givun_group ? -1 : a.id_givun_group > b.id_givun_group ? 1 : 0);
    } 
  colorCatgory(catgory: number): string { 
     
    return this.rootService.getColorChart(catgory);
  } 

  exportAsCSV() { 
    let nameKotar =' לפי קבוצת גיוון';
    let tableToExport= new Array<object>();  
    if(this.scalaData){
      tableToExport.push({
      godel : 'קבוצת גיוון',
      mdd: this.scalaData[0].nameMdd ,
      }); 
      nameKotar = this.scalaData[0].nameMdd+ nameKotar;
    }
  
    for(let i=0; i<this.scalaData.length; i++)
    {
      tableToExport.push({
        godel : this.scalaData[i].givunName,
        mdd: Number(this.scalaData[i].value).toFixed(0)
        });      
    }
    let titleCsv = nameKotar ;  
    if(this.scalaData) titleCsv +=',' + this.scalaData[0].anaf_Name_Short;    
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
