;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppState, factData, DataByGivunGroup } from 'src/app/app.state';



@Injectable({
  providedIn: 'root'
})
export class Report3Service {

  public data: Array<object>;
  url= environment.API_ENDPOINT; // 'https://mkappt120.clalit.org.il:1888/api/tz';

  constructor(private http: HttpClient, private appStore: AppState) {  }
   
  loadDataPage3() {
    this.clearPage();
    //console.log(this.appStore.countEmpSumData); 
    this.appStore.factAllData = this.appStore.factAll.filter(x => 
           x.year=== this.appStore.selectyear.value
        && x.ifAcademicid=== this.appStore.selectacademic.value
        && x.godel_id=== this.appStore.selectgodel.value)
        ///נתון לרכיב הראשון נתונים מטבלה נפרדת
    this.appStore.countEmpSum= this.appStore.countEmpSumData.filter(x => 
          x.year=== this.appStore.selectyear.value
        && x.IfAcademic_id=== this.appStore.selectacademic.value
        && x.kv_gil_id=== this.appStore.selectgil.value)
         //שאר הרכיבים נתונים
        this.appStore.givunGroupData0= this.dataGraf(this.appStore.mddFilterData[0]);
        this.appStore.givunGroupData1= this.dataGraf(this.appStore.mddFilterData[1]);
        this.appStore.givunGroupData2= this.dataGraf(this.appStore.mddFilterData[2]);
        this.appStore.givunGroupData3= this.dataGraf(this.appStore.mddFilterData[3]);
       
  }
  clearPage() {
    this.appStore.givunGroupData0=null;
    this.appStore.givunGroupData1=null;
    this.appStore.givunGroupData2=null;
    this.appStore.givunGroupData3=null;
  }
  dataGraf(nameValMdd: any){
    let maxNum=-1;
        let res= new Array<factData>();  
        let dataByGivunGroup= new Array<DataByGivunGroup>();  
        this.appStore.givunGroupFilterData.forEach(element => {
          res=this.appStore.factAllData.filter(x => x.id_givun_group === element.value);
          //   && x.anaf_sivug === index);
            if(element.value < 5){
              res =  res.filter(
                 x=>x.kv_gil_id=== this.appStore.selectgil.value
               );}
            if(element.value===5 ){
              res=  res.filter(
                x=>x.leom_id=== 0 
          );}    
            if(element.value > 1){
              res =  res.filter(
                x=>x.gender_id=== this.appStore.selectgander.value
          );}
      
          res.forEach((item, index) => { 
          if(item[nameValMdd.value]>-1) {
            dataByGivunGroup.push({
              value: item[nameValMdd.value], 
              nameMdd : nameValMdd.name,           
              givun: item.id_givun_group,
              givunName: item.givun_group,
              anaf_sivug: item.anaf_sivug,
              anaf_Name_Short : item.anaf_Name_Short
            });}
          });
        });
        //console.log(dataByGivunGroup);
        return dataByGivunGroup;
      }
    
    
    }