
import { AppService } from './app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { appStore } from './app.store';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


import { Injectable } from '@angular/core';
import { AppState, AppStateError, FilterData, factData, homeData, homeSumData, homeSumAllData, FilterStrData, academicPrcnt, DataByGivunGroup, CountEmpSum } from './app.state';
import {map} from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { strictEqual } from 'assert';
import { IfStmt } from '@angular/compiler';
import { RecaptchaService } from './recaptcha.service';

//import * as XLSX from 'ts-xlsx';
 


@Injectable()
export class RootService {
    url = environment.API_ENDPOINT;
    fontResulation;
    LastValidDate: Date;
    loadDefaultsPromise: Promise<any[]>;
      
  
    // tslint:disable-next-line:no-shadowed-variable
    constructor(private appStore: AppState,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        private recaptchaService: RecaptchaService,
        private http: HttpClient) {
          console.log(window.innerWidth);
          this.fontResulation = window.innerWidth < 1300 ? 0 : 5;
  
    }


    async  importCsv(){    
      const url='./assets/EqualityData.xlsx'; 
      const response = await fetch(url)
      const data = await response.blob()     
      this.http.get(url,{responseType: 'arraybuffer'}).subscribe((data: any) => { console.log(data); });
      this.http.get(url,{responseType: 'arraybuffer'}).subscribe((dataALL: any) => { 
      var data = new Uint8Array(dataALL);
      var arr = new Array();
      var str = String.fromCharCode.apply(String, arr);
      console.log(arr);
      for(var i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
        //console.log( arr[i]);
      }
      var bstr = arr.join("");
      console.log(bstr);
      //var workbook = XLSX.read(bstr, {type:"binary"});
      // var first_sheet_name = workbook.SheetNames[0];
      // var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));  
    });
    this.http.get<any>(url).pipe(
    map((result:HttpResponse<Blob>) => {
      console.log(result);          
    }));
      // // if(files && files.length > 0) {
      // //    let file : File = files.item(0); 
      // //      console.log(file.name);
      // //      console.log(file.size);
      // //      console.log(file.type);
      // //      let reader: FileReader = new FileReader();
      // //      reader.readAsText(file);
      // //      reader.onload = (e) => {
      // //         let csv: string = reader.result as string;
      // //         console.log(csv);
      // //      }
        // //}
    }

    clearData() {

    }
    async loadFilterData(name) {
      try {
        this.http.get(this.url + name).subscribe((data: any) => { 
       // return this.http.post('Equality_'+this.url + 'GetDatafilterNonToken' ,{ 
        //  nameFilter: name})
       //   .subscribe((data: any) => { 
        if(data) { console.log(data);
        if ( data == '405' )  { this.appStore.isReady = false; return; }    
        let res= new Array<object>();     
        data.sort((a, b) => Number(a.column1) < Number(b.column1) ? -1 : Number(a.column1) <Number(b.column1 ? 1 : 0)). 
        forEach((item, index) => {
            if(index > 0 && Number(item['column1']>-1)) res.push({name: item['column0'], value: Number(item['column1'])
            });
        }); 
        this.appStore[name+'FilterData'] = res;
        this.appStore['select'+name]=this.appStore[name+'FilterData'][0]; 
        }
      else
      {
        this.appStore[name+'FilterData'] = null;
        this.appStore['select'+name]=null;
      }
       });  
      } catch (error) {
      }
    }
    // 180 רשומות כל פעם 180 כל הנתונים לפי קבוצת גיוון
    loadaALLDataByFilter_180(numRows: number, givunGroup: number,givunGroupName: string) {
      // this.loadaALLDataByFilter(1,'נשים');
      // this.loadaALLDataByFilter(2,'ערבים וערביות');
      // this.loadaALLDataByFilter(3,'יוצאי ויוצאות אתיופיה');
      // this.loadaALLDataByFilter(4,'חרדים וחרדיות');
      // this.loadaALLDataByFilter(5,'בני ובנות 45 ומעלה'); 
      // this.loadaALLDataByFilter(-1,'לא קבוצת גיוון'); 
      try {
      let numRowCount;    
      console.log('starALLDataByFilter' + numRows + ' ' +Date());
      // this.http.post(this.url,{        
      //   selectgivunGroup: givunGroup, 
      //   selectCount: numRows,              
      //   })
      alert(givunGroup)
      alert(numRows)
       this.http.get(this.url + givunGroup).subscribe((data: any) => { 
          if(data) {  
          if ( data == '405' )  { return  this.appStore.isReady = false;   }              
          let res= new Array<factData>();     
          data.forEach((item, index) => {
          this.appStore.factAll.push({
               year : Number(item['column0']),
               anaf_sivug : item['column1'],
               anaf_Name: item['column14'],
               anaf_Name_Short: item['column15'],
               givun_group: item['column16'],
               id_givun_group: Number(item['column17']),
               anaf_Global: item['column13'],
               anaf_Type_Id : Number(item['column3']),
               anaf_Global_Id : Number(item['column2']), 
               godel_id  : Number(item['column4']), 
               leom_id: Number(item['column5']),
               gender_id: Number(item['column6']),
               kv_gil_id: Number(item['column7']),
               ifAcademicid: Number(item['column8']),
               count_emp: Number(Number(item['column9']).toFixed(0)),
               tziunei_yetzug: Number(item['column10']),
               tziun_shivioniut_sahar: Number(item['column11']),
               average_salary: Number(Number(item['column12']).toFixed(0)),              
            });
            numRowCount = Number(item['index']);
        });} 
        console.log('endALLDataByFilter' + numRows + ' ' +Date());
        if(data.length===180){
         const numRowsCount = numRowCount+1;
         this.loadaALLDataByFilter_180(numRowsCount, givunGroup,givunGroupName);
       }
       else{
         console.log('endALLDataByFilter  ' +Date());
         this.appStore.isReady = true;         
          if(givunGroup>-1)
             this.appStore.givunGroupFilterData.push({name: givunGroupName, value: givunGroup})         
          }         
       }
        );
      } catch (error) {
      } 
      }

      loadALLDataByFilter(givunGroup: number,givunGroupName: string) {
        // this.loadaALLDataByFilter(1,'נשים');
        // this.loadaALLDataByFilter(2,'ערבים וערביות');
        // this.loadaALLDataByFilter(3,'יוצאי ויוצאות אתיופיה');
        // this.loadaALLDataByFilter(4,'חרדים וחרדיות');
        // this.loadaALLDataByFilter(5,'בני ובנות 45 ומעלה'); 
        // this.loadaALLDataByFilter(-1,'לא קבוצת גיוון'); 
        try {
          this.recaptchaService.execute('importantAction')
          .subscribe((token: string) => {
              console.log('starALLDataByFilter'  +Date());
              this.http.get(this.url+ givunGroup
              //   selectgivunGroup: givunGroup, 
              //   tokenCaptcha : token          
              //   }
              ).subscribe((data: any) => {         
                  if(data) { 
                  if ( data == '405' )  { this.appStore.isReady = false; return;  }           
                  else {let res= new Array<factData>();     
                  data.forEach((item, index) => {
                  this.appStore.factAll.push({
                      year : Number(item['column0']),
                      anaf_sivug : item['column1'],
                      anaf_Name: item['column14'],
                      anaf_Name_Short: item['column15'],
                      givun_group: item['column16'],
                      id_givun_group: Number(item['column17']),
                      anaf_Global: item['column13'],
                      anaf_Type_Id : Number(item['column3']),
                      anaf_Global_Id : Number(item['column2']), 
                      godel_id  : Number(item['column4']), 
                      leom_id: Number(item['column5']),
                      gender_id: Number(item['column6']),
                      kv_gil_id: Number(item['column7']),
                      ifAcademicid: Number(item['column8']),
                      count_emp: Number(Number(item['column9']).toFixed(0)),
                      tziunei_yetzug: Number(item['column10']),
                      tziun_shivioniut_sahar: Number(item['column11']),
                      average_salary: Number(Number(item['column12']).toFixed(0)),              
                    });             
                });}
                this.appStore.isReady = true;         
                  if(givunGroup>-1)
                    this.appStore.givunGroupFilterData.push({name: givunGroupName, value: givunGroup}) 
                  console.log('endALLDataByFilter'  +Date());  
                    
              } 
            });
          });
          } catch (error) {
      } 
      }
    //  loadaALLData() {
    //    console.log('factALLData');
    //     this.getData('factALLData').subscribe((data: any) => {  
    //       if ( data == '405' )  { this.appStore.isReady = false; return; }             
    //        let res= new Array<factData>();     
    //        data.forEach((item, index) => {
    //            if(index > 0) res.push({
    //             year : Number(item['column0']),
    //             anaf_sivug : item['column1'],
    //             anaf_Name: item['column14'],
    //             anaf_Name_Short: item['column15'],
    //             givun_group: item['column16'],
    //             id_givun_group: Number(item['column17']),
    //             anaf_Global: item['column13'],
    //             anaf_Type_Id : Number(item['column3']),
    //             anaf_Global_Id : Number(item['column2']), 
    //             godel_id  : Number(item['column4']), 
    //             leom_id: Number(item['column5']),
    //             gender_id: Number(item['column6']),
    //             kv_gil_id: Number(item['column7']),
    //             ifAcademicid: Number(item['column8']),
    //             count_emp: Number(Number(item['column9']).toFixed(0)),
    //             tziunei_yetzug: Number(item['column10']),
    //             tziun_shivioniut_sahar: Number(item['column11']),
    //             average_salary: Number(Number(item['column12']).toFixed(0)),
    //          });
    //      }); 
    //        console.log(res);
    //        this.appStore.factAll = res;
    //     });
    //     }
       

     getData(name,token) {          
          // return this.http.post(this.url + 'GetDatafilter' ,{ 
           return this.http.get(this.url + name );
            // nameFilter: name, 
            // tokenCaptcha : token});       
     }
    
    async loadFilterToData() {
  try {
    await this.loadAcademicPrcntData();
    await this.loadHomePageData();
    await this.loadaHomeSumAllData();
    await this.loadaHomeSumData();
    await this.loadFilterAnafAllData();
    await this.loadCountEmpSum();

    await this.loadFilterData('year');
    await this.loadFilterData('leom');
    await this.loadFilterData('godel');
    await this.loadFilterData('gil');
    await this.loadFilterData('anafGlobal');

    console.log('Data loaded');
  } catch (error) {
    console.error('Error loading data:', error);
    this.appStore.isReady = false;
  }
}

    //פונקציה המחזירה נתונים כל פעם 180 רשומות כל עוד חוזרים נתונים
    loadaALLDataByCount180(numRows) {       
      console.log('starALLDataByFilter' + numRows + ' ' +Date());    
      this.http.post(this.url,{        
        selectCount: numRows,        
        }).subscribe((data: any) => { 
          data.forEach((item, index) => {
          this.appStore.factAll.push({
               year : Number(item['column0']),
               anaf_sivug : item['column1'],
               anaf_Name: item['column14'],
               anaf_Name_Short: item['column15'],
               givun_group: item['column16'],
               id_givun_group: Number(item['column17']),
               anaf_Global: item['column13'],
               anaf_Type_Id : Number(item['column3']),
               anaf_Global_Id : Number(item['column2']), 
               godel_id  : Number(item['column4']), 
               leom_id: Number(item['column5']),
               gender_id: Number(item['column6']),
               kv_gil_id: Number(item['column7']),
               ifAcademicid: Number(item['column8']),
               count_emp: Number(Number(item['column9']).toFixed(0)),
               tziunei_yetzug: Number(item['column10']),
               tziun_shivioniut_sahar: Number(item['column11']),
               average_salary: Number(Number(item['column12']).toFixed(0)),
            });                 
         });
         console.log('endALLDataByFilter' + numRows + ' ' +Date());
         if(data.length===180){
          const numRowsCount = numRows+1;
          this.loadaALLDataByCount180(numRowsCount)
        }
        else{
          this.appStore.isReady = true; 
          console.log('endALLDataByFilter  ' +Date());
        }         
        });
      }

       async  loadFilter(){ 
        try { 
         await this.loadFilterToData(),
        // loadAcademicPrcntData(), 
         //this.PageData(),
         //this.loadaHomeSumAllData(),
         //this.loadaHomeSumData(),
         //this.loadFilterAnafAllData(),       
         //this.loadFilterData('year'),
         //this.loadFilterData('leom'),
         //this.loadFilterData('godel'),
         //this.loadFilterData('gil'),
         //this.loadFilterData('anafGlobal'), 
         //this.loadFilterData('givunGroup'), 
        this.appStore.ganderFilterData=[{value :0, name : 'סך הכל'},
        {value :1,name : `גברים`} ,{value :3,name : `נשים`}]  
        this.appStore.selectgander=this.appStore.ganderFilterData[0]; 
        this.appStore.academicFilterData=[{value :0, name : 'כל הקבוצות'},
        {value :2,name : `אקדמאים`} ,{value :3,name : `לא אקדמאים`}]  
        this.appStore['selectacademic']=this.appStore.academicFilterData[0];                  
        this.appStore.sektorFilterData=[{value :1, name : 'פרטי'},
        {value :2,name : `ציבורי`}] 
        this.appStore.mddFilterData=[{value :'average_salary', name : 'שכר ממוצע'},
        {value :'count_emp',name : 'מספר מועסקים'},{value :'tziun_shivioniut_sahar',name : `ציון שיוויוניות השכר`},{value :'tziunei_yetzug',name : `ציון הייצוג`}]       
        this.appStore.isReady = true;             
        // this.appStore.factAll= new Array<factData>();  
        // this.appStore.givunGroupFilterData = new Array<FilterData>();      
        // this.loadALLDataByFilter(1,'נשים');
        // this.loadALLDataByFilter(2,'ערבים וערביות');
        // this.loadALLDataByFilter(3,'יוצאי ויוצאות אתיופיה');
        // this.loadALLDataByFilter(4,'חרדים וחרדיות');
        // this.loadALLDataByFilter(5,'בני ובנות 45 ומעלה'); 
        // this.loadALLDataByFilter(-1,'לא קבוצת גיוון');
      } catch (error) {
      }
    }
    async loadCountEmpSum() {     
      try {
        this.recaptchaService.execute('importantAction')
      .subscribe((token: string) => {
        this.getData('countEmpSum',token).subscribe((data: any) => { console.log(data);
        if ( data == '405' )  { this.appStore.isReady = false; return; }     
        let res= new Array<CountEmpSum>();          
        data.forEach((item, index) => {
            if(index > 0 && Number(item['column5']) > -1) res.push({
            godel : item['column0'],	
            kv_gil: item['column1'],	
            year: Number(item['column2']),
            IfAcademic: item['column3'],		
            anaf_type: item['column4'],		
            count_emp: Number(Number(item['column5']).toFixed(0)),
            anaf_sivug: item['column6'],
            anaf_Type_Id: Number(item['column7']),	
            anaf_Global_Id: Number(item['column8']),	
            anaf_Global: item['column9'],	
            anaf_Name: item['column10'],		
            anaf_Name_Short: item['column11'],	
            godel_id: Number(item['column12']),
            kv_gil_id: Number(item['column13']),
            IfAcademic_id: Number(item['column14']),   
          });          
        });
        this.appStore.countEmpSumData = res; 
       });});
      } catch (error) {
      }
      }
       loadAcademicPrcntData() : any{
        try {
          this.recaptchaService.execute('importantAction')
          .subscribe((token: string) => {
            this.getData('academicPrcntData',token).subscribe((data: any) => { 
              console.log(data);
            if ( data == '405' )  { this.appStore.isReady = false; return; }      
            let res= new Array<academicPrcnt>();          
            data.forEach((item, index) => {
                if(index > 0) res.push({
                  anaf_Global: item['column0'], 
                  anaf_sivug: item['column1'], 
                  anaf_Name: item['column2'], 
                  anaf_Global_Id: item['column3'],
                  anaf_Type_Id: item['column4'],
                  anaf_Name_Short: item['column5'],	
                  academic_prcnt_2020:item['column6'],
                  non_academic_2020:item['column7'],	
                  year: item['column8']                  
                });
            }); 
            this.appStore.academicPrcnt = res;   
            return '200';        
          }); 
        }); 
        }
         catch (error) {   this.appStore.isReady = false;  return;    
        }
       }
        async loadFilterAnafAllData() {
          try {
         this.recaptchaService.execute('importantAction')
            .subscribe((token: string) => {
              this.getData('anaf',token).subscribe((data: any) => { 
                  if ( data == '405' )  { this.appStore.isReady = false; return; }      
                  let res= new Array<FilterStrData>();          
                  //sort((a, b) => Number(a.column1) < Number(b.column1) ? -1 : Number(a.column1) <Number(b.column1 ? 1 : 0)). 
                  data.forEach((item, index) => {
                      if(index > 0) res.push({name: item['column4'], value: item['column5']
                      });
                  }); 
                  this.appStore.anafFilterData = res;
                  this.appStore.selectanaf=this.appStore.anafFilterData[0];
              });
          });
        } catch (error) {
        }
      }
        
 

  async loadaHomeSumAllData() {
    try {
      this.recaptchaService.execute('importantAction')
      .subscribe((token: string) => {
    this.getData('Equality_globaldata_population',token).subscribe((data: any) => {  console.log(data);
      if ( data == '405' )  { this.appStore.isReady = false; return; }            
      let res= new Array<homeSumAllData>();     
      data.forEach((item, index) => {
          if(index > 0) res.push({           
           value : Number(item['column0']),
           year : Number(item['column1'])                         
        });
    });   
    this.appStore.homePageSumAllData = res;
   });  
   
  }); 
  } catch (error) {
  }
}
  async loadaHomeSumData() {
    try { 
      this.recaptchaService.execute('importantAction')
      .subscribe((token: string) => {

    this.getData('Equality_globaldata_academic',token).subscribe((data: any) => { console.log("kkkkkkkkkk",data);
      if ( data == '405' )  {this.appStore.isReady = false; return; }    
      let res= new Array<homeSumData>();     
      data.forEach((item, index) => {
        console.log(item);
          if(index > 0) res.push({
          IfAcademic : (item['column0']),
           value : Number(item['column1']),
           year: Number(item['column2']),
           IfAcademic_id  : Number(item['column3']),                   
        });
    });   
    
    this.appStore.homePageSumData = res;
   });
  }); 
  } catch (error) {
  }
}
  async loadHomePageData() {
   try { 
    this.recaptchaService.execute('importantAction')
    .subscribe((token: string) => {  
    this.getData('Equality_globaldata',token).subscribe((data: any) => {  console.log(data);
      if ( data == '405' )  { this.appStore.isReady = false; return; }            
      let res= new Array<homeData>();     
      data.forEach((item, index) => {        
        if(index > 0) res.push({
           madad_group : item['column0'],
           description : item['column1'],
           gender: item['column2'],          
           value : Number(item['column3']),
           year : Number(item['column4']), 
           gender_id : Number(item['column5']), 
           description_id: Number(item['column6']),
           madad_group_id: Number(item['column7'])           
        });
    });     
    console.log(res,"res2");
    
    this.appStore.homePageData = res; 
    this.loadDataHome();
    }); 
   });
   } catch (error) {
    }
 }
 loadDataCaptchaV3() {
  if (this.appStore.factAll === null) {
    this.recaptchaService.execute('importantAction')
      .subscribe({
        next: (token: string) => {
          if (!token) {
            console.log('Recaptcha token is missing');
            this.appStore.isReady = false;
            return;
          }  

          this.appStore.factAll = new Array<factData>();
          this.appStore.givunGroupFilterData = new Array<FilterData>();

          this.loadALLDataByFilter(1,'נשים');
          this.loadALLDataByFilter(2,'ערבים וערביות');
          this.loadALLDataByFilter(3,'יוצאי ויוצאות אתיופיה');
          this.loadALLDataByFilter(4,'חרדים וחרדיות');
          this.loadALLDataByFilter(5,'בני ובנות 45 ומעלה');
          this.loadALLDataByFilter(-1,'לא קבוצת גיוון');
        },
        error: () => {
          this.appStore.isReady = false;
        }
      });
  }
}

loadSselect(){
 
    this.appStore.selectgil=this.appStore.gilFilterData[0]; 
    this.appStore.selectgodel=this.appStore.godelFilterData[0];  
    this.appStore.selectleom=this.appStore.leomFilterData[0];  
    this.appStore.selectanaf=this.appStore.anafFilterData[0];  
    this.appStore.selectgander=this.appStore.ganderFilterData[0]; 
    this.appStore.selectacademic=this.appStore.academicFilterData[0];
    this.appStore.selectyear=this.appStore.yearFilterData[0]; 
    this.appStore.selectgivunGroup=this.appStore.givunGroupFilterData[0];   
}
changeSelect(){ 
  if(this.appStore.selectgivunGroup.value === 1) 
   {
     this.appStore.disableGander = true;
     this.appStore.selectgander=this.appStore.ganderFilterData[0];    
     const index =  this.appStore.tags.findIndex(a => a.type === 'gander');
     if (index>-1) {
     this.appStore.tags.splice(index, 1);
     }    
   }
   if(this.appStore.selectgivunGroup.value === 5) {  
    this.appStore.disableGil = true; 
    this.appStore.selectgil=this.appStore.gilFilterData[0];   
     const index =  this.appStore.tags.findIndex(a => a.type === 'gil');
     if (index>-1) {
     this.appStore.tags.splice(index, 1);
     } 
    }
}
async loadDataHome() {  
    this.appStore.pieChartNoAcademi1=this.convertDataToPieChart(1,2);
    this.appStore.pieChartNoAcademi2=this.convertDataToPieChart(2,2);
    this.appStore.pieChartNoAcademi3=this.convertDataToPieChart(3,2);
    this.appStore.pieChartNoAcademi4=this.convertDataToPieChart(4,2);
    this.appStore.pieChartNoAcademi5=this.convertDataToPieChart(5,2);
    this.appStore.pieChartAcademi1=this.convertDataToPieChart(1,3);
    this.appStore.pieChartAcademi2=this.convertDataToPieChart(2,3);
    this.appStore.pieChartAcademi3=this.convertDataToPieChart(3,3);
    this.appStore.pieChartAcademi4=this.convertDataToPieChart(4,3);
    this.appStore.pieChartAcademi5=this.convertDataToPieChart(5,3);    
 }

async loadDataPage2() {  
    this.appStore.factAllData = this.appStore.factAll.
    filter(x=>x.year === this.appStore.selectyear.value //&& x.godel_id=== this.appStore.selectgodel.value
          && x.godel_id=== this.appStore.selectgodel.value         
          && x.id_givun_group=== this.appStore.selectgivunGroup.value);          
     if(this.appStore.selectgivunGroup.value < 5){
          this.appStore.factAllData= this.appStore.factAllData.filter(
             x=>x.kv_gil_id=== this.appStore.selectgil.value 
           );}
      if(this.appStore.selectgivunGroup.value === 5){
            this.appStore.factAllData= this.appStore.factAllData.filter(
               x=>x.leom_id=== 0 
       );}       
           
     if(this.appStore.selectgivunGroup.value > 1){
            this.appStore.factAllData= this.appStore.factAllData.filter(
               x=>x.gender_id=== this.appStore.selectgander.value
             );}             
}


    async loadDataPage1() { 
        console.log('loadDataPage1');
       // console.log(this.appStore.factAll);         
        this.clearPage();
        this.appStore.factAllData = this.appStore.factAll.
        filter(x=> x.ifAcademicid=== this.appStore.selectacademic.value
        && x.id_givun_group=== this.appStore.selectgivunGroup.value);  
        if(this.appStore.selectgivunGroup.value < 5){
          this.appStore.factAllData= this.appStore.factAllData.filter(
             x=>x.kv_gil_id=== this.appStore.selectgil.value
           );}
        if(this.appStore.selectgivunGroup.value === 5){
            this.appStore.factAllData= this.appStore.factAllData.filter(
               x=>x.leom_id=== 0 
       );}    
          if(this.appStore.selectgivunGroup.value > 1){
                  this.appStore.factAllData= this.appStore.factAllData.filter(
                    x=>x.gender_id=== this.appStore.selectgander.value
                  );}   
            
      this.appStore.grafData= this.convertMegamaDataToChart(1,this.appStore.selectmdd.value);
      this.appStore.grafData2= this.convertMegamaDataToChart(2,this.appStore.selectmdd.value);
      this.appStore.grafData3= this.convertMegamaDataToChart(3,this.appStore.selectmdd.value);
      this.appStore.grafData4= this.convertMegamaDataToChart(4,this.appStore.selectmdd.value);
      this.appStore.grafData5= this.convertMegamaDataToChart(5,this.appStore.selectmdd.value);
      this.appStore.grafData6= this.convertMegamaDataToChart(6,this.appStore.selectmdd.value);
      //console.log(this.appStore.factAllData);  
      //console.log(this.appStore.selectmdd.value); 
  } catch (ex) {
   
  }

   async loadDataPage4() {
    this.clearPage();
    this.appStore.factAllData = this.appStore.factAll.filter(x =>
         x.ifAcademicid=== this.appStore.selectacademic.value
      && x.anaf_sivug === this.appStore.selectanaf.value);
      if(this.appStore.selectgivunGroup.value===5){
        this.appStore.factAllData=  this.appStore.factAllData.filter(
          x=>x.leom_id=== 0 
    );}    
      if(this.appStore.selectgivunGroup.value >1 ){
        this.appStore.factAllData=  this.appStore.factAllData.filter(
          x=>x.gender_id=== this.appStore.selectgander.value
    );} //.
    //filter(x=> x.id_givun_group=== this.appStore.selectgivunGroup.value);  
    // if(this.appStore.selectgivunGroup.value < 5){
    //   this.appStore.factAllData= this.appStore.factAllData.filter(
    //      x=>x.kv_gil_id=== this.appStore.selectgil.value
    //    );}

    this.appStore.countEmpSum= this.appStore.countEmpSumData.filter(x => 
      x.year=== 2020
    && x.IfAcademic_id=== this.appStore.selectacademic.value
    && x.anaf_sivug === this.appStore.selectanaf.value
    && x.kv_gil_id=== this.appStore.selectgil.value)
    //console.log(this.appStore.countEmpSum);
    this.appStore.grafData= this.convertMegamaDataToChartReport4(this.appStore.selectanaf.value,this.appStore.mddFilterData[0].value);
    this.appStore.grafData2=this.convertMegamaDataToChartReport4(this.appStore.selectanaf.value,this.appStore.mddFilterData[1].value);
    this.appStore.grafData3=this.convertMegamaDataToChartReport4(this.appStore.selectanaf.value,this.appStore.mddFilterData[3].value,2);
    this.appStore.grafData4=this.convertMegamaDataToChartReport4(this.appStore.selectanaf.value,this.appStore.mddFilterData[2].value,2);
  
  }
  clearPage(){
    this.appStore.grafData=null;
    this.appStore.grafData2=null;
    this.appStore.grafData3=null;
    this.appStore.grafData4=null;
    this.appStore.grafData5=null;
    this.appStore.grafData6=null;
  }
getColorChart(catgory){
  switch (Number(catgory)) {
    case 1:
        return '#CA3C3D';         
    case 2:
        return '#8F4091'; 
    case 3:
        return '#009F4D'; 
    case 4:
       return '#438BCA'; 
    case 5:
      return '#F8AA2E'; 
    case 6:
       return '#F8AA2E';         
    
  }
}


convertMegamaDataToChartReport4(anafSivug :string,viewMDD :string,numToFixed: number = 0) { 
//   if(this.appStore.selectgivunGroup.value === 5){
//     this.appStore.factAllData= this.appStore.factAllData.filter(
//        x=>x.leom_id=== 0 
// );}    
  let dataAnafGodel = this.appStore.factAllData.filter(x=>x.anaf_sivug=== anafSivug
    && (x.id_givun_group=== this.appStore.selectgivunGroup.value
    || (x.id_givun_group=== 5 && x.leom_id=== 0))
   // && x.id_givun_group=== this.appStore.selectgivunGroup.value
   && x.godel_id=== this.appStore.selectgodel.value) 
   // && x.ifAcademicid=== this.appStore.selectacademic.value)
    .sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0);
  //if(anafGodel === 6)  dataAnafGodel = this.appStore.factAllData.filter(x=>x.anaf_Global_Id=== 8 || x.anaf_Global_Id=== 7 ).sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0); 
   const seriesAll =[];   
   const maxScala = Math.max.apply(this, dataAnafGodel.map(a => a[viewMDD]));   
   const minScala = Math.min.apply(this, dataAnafGodel.map(a => a[viewMDD] >-1? a[viewMDD]: maxScala));    
   const dataDistinct= (dataAnafGodel.filter( (thing, i, arr) => arr.findIndex(t => t['kv_gil_id'] === thing['kv_gil_id']) === i).sort((a, b) => a['kv_gil_id'] < b['kv_gil_id'] ? -1 : a['kv_gil_id'] < b['kv_gil_id'] ? 1 : 0));
   const yearDistinct= (dataAnafGodel.filter( (thing, i, arr) => arr.findIndex(t => t['year'] === thing['year']) === i)).sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0); 
   dataDistinct.forEach((itemAnaf, index) => {  
      const dataArr =dataAnafGodel.filter(item => item['kv_gil_id'] === itemAnaf['kv_gil_id']);
          seriesAll.push({
          name: this.appStore.gilFilterData.filter(item => item.value === itemAnaf['kv_gil_id'])[0].name,
              type:'line',                
              textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
              data: dataArr.map(a =>  a[viewMDD] >-1?a[viewMDD].toFixed(numToFixed):null),
              lineStyle:{ width: 2},
      });
    });


   const chartOption = {
      color: ['#8F4091','#0095DA','#7D8285','#3AC2C2','#3AC2C2','#0B435C','#1A6F96','#7D8285','#0DABDD','#3AC2C2'],
       tooltip: {
           show: true,        
           textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
           trigger: 'axis',
           backgroundColor:'white',
           borderWidth: 1 ,
           padding: 10 ,           
           axisPointer: {
               type: 'none'
           },
           formatter: function (params) {    
             //console.log(params.sort((a, b) => a.data > b.data ? -1 : a.data > b.data ? 1 : 0));     
            let res = '<p dir="rtl" style="line-height:20px;color:#000">' + params[0].name + '</p>';
            params.sort((a, b) => Number(a.data) > Number(b.data) ? -1 : Number(a.data) > Number(b.data) ? 1 : 0).forEach(item => {
                if (item.data !== '') {
                    const xx = '<p dir="rtl" style="line-height:20px;color:#000">'
                    + item.marker + ' ' +  item.seriesName + ': ' + formatNumber(Number(item.data), "en-IN", "1.0-" +numToFixed) + '</p>';
                    res += xx;
                }
            });
            
            // var data = '<p>' + params[0].name + '</p>';
            // for (let i = 0; i < params.length ; i++) {              
            //   res += '<p class="padding:15px 0;">' + params[i].marker + params[i].seriesName + '<span style="font-weight:900;float:right;padding-left:15px;">' + params[i].value + '</span>' + '</p>';
            // }
            // console.log(res);
            return  res;
          },
           
       }, 
       legend:{             
          top: 1,
          left: 0,
          RIGHT: 0,    
          padding: 3 ,       
          show: true,
          textStyle: { color: '#000' ,fontSize: 8 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
        
      },
       grid: {
           bottom: 0,
           left: 0,
           RIGHT: 0,
           top: 35,
           containLabel: true,
           textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
       },
       xAxis: {
          boundaryGap: false,            
          data: yearDistinct.map(a => a.year),
          axisLabel: {
           textStyle: { color: '#000' ,fontSize: 8 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
          },           
       },
       yAxis: {
           min: minScala - (minScala/100*10),
           max: maxScala + (maxScala/100*10),            
           splitLine: {
              show: true,
              interval :3,
            },            
           type: 'value',
           splitNumber: 0,
           scale: true,
           axisLabel: {
              show: true,
              showMaxLabel :true,
              showMinLabel:true,
              splitNumber:2,
               formatter: function (params) {
                //  if(params === minScala || params === maxScala)
                //     return  formatNumber(Number(params), "en-IN", "1.0-" + numToFixed);  
                 if(params === minScala - (minScala/100*10) && minScala >-1)
                    return  formatNumber(Number(minScala), "en-IN", "1.0-" +numToFixed);  
                 if( params === maxScala+(maxScala/100*10) && maxScala > -1)
                    return  formatNumber(Number(maxScala), "en-IN", "1.0-" +numToFixed); 
                              
               },
               textStyle: { color: '#000' ,fontSize: 7 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
           },
                 
       },
       series: seriesAll
   };   
   let nameChart;
   let chartData;
   if(dataDistinct.length>0)  
    chartData = {data: dataAnafGodel,chart:chartOption,name: dataDistinct[0].anaf_Global}; 
   return chartData;
}
  convertMegamaDataToChart(anafGodel :number,viewMDD :string) { 
    const numToFixed =  (viewMDD === this.appStore.mddFilterData[0].value || viewMDD === this.appStore.mddFilterData[1].value)? 0: 2;
    let dataAnafGodel = this.appStore.factAllData.filter(x=>x.anaf_Global_Id=== anafGodel).sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0);
    //מגזר ציבורי מציג קוביה עבור קבוצות ענף 8 ו7 כך הוגדר 
    //אם מציגים גרף מגזר ציבורי פילטר גודל עסק לא מושפיע על רכיב
    if(anafGodel === 6)  dataAnafGodel = this.appStore.factAllData.filter(x=>x.anaf_Global_Id=== 8 || x.anaf_Global_Id=== 7 ).sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0); 
    else dataAnafGodel = dataAnafGodel.filter(x=>x.godel_id === this.appStore.selectgodel.value);
     const seriesAll =[];
     const maxScala = Math.max.apply(this, dataAnafGodel.map(a => a[viewMDD])); 
     const minScala = Math.min.apply(this, dataAnafGodel.map(a => a[viewMDD] >-1? a[viewMDD]: maxScala));     
     const dataDistinct= (dataAnafGodel.filter( (thing, i, arr) => arr.findIndex(t => t['anaf_sivug'] === thing['anaf_sivug']) === i).sort((a, b) => a.anaf_sivug < b.anaf_sivug ? -1 : a.anaf_sivug < b.anaf_sivug ? 1 : 0));
     const yearDistinct= (dataAnafGodel.filter( (thing, i, arr) => arr.findIndex(t => t['year'] === thing['year']) === i)).sort((a, b) => a.year < b.year ? -1 : a.year < b.year ? 1 : 0); 
    
     dataDistinct.forEach((itemAnaf, index) => {  
      const dataArr =dataAnafGodel.filter(item => item['anaf_sivug'] === itemAnaf['anaf_sivug']);
            seriesAll.push({
                name: itemAnaf['anaf_Name_Short'],
                type:'line',                
                textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
                data: dataArr.map(a =>  a[viewMDD] >-1?a[viewMDD].toFixed(numToFixed):null),
                lineStyle:{ width: 2},
        });
      });
     const chartOption = {
        color: ['#8F4091','#1A6F96','#7D8285','#0DABDD','#3AC2C2','#0B435C','#1A6F96','#7D8285','#0DABDD','#3AC2C2'],
         tooltip: {
             show: true,        
             textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
             trigger: 'axis',
             backgroundColor:'white',
             borderWidth: 1 ,
             padding: 10 ,           
             axisPointer: {
                 type: 'none'
             },
             formatter: function (params) {    
             let res = '<p dir="rtl" style="line-height:20px;color:#000">' + params[0].name + '</p>';
             params.sort((a, b) => Number(a.data) > Number(b.data) ? -1 : Number(a.data) > Number(b.data) ? 1 : 0).forEach(item => {
                 if (item.data !== '' && Number(item.data) > 0) {
                     const xx = '<p dir="rtl" style="line-height:20px;color:#000">'
                     + item.marker + ' ' +  item.seriesName + ': ' + formatNumber(Number(item.data), "en-IN", "1.0-" +numToFixed) + '</p>';
                     res += xx;
                 }
             });            
             return  res;
           },
         }, 
         legend:{             
            top: 5,
            left: 0,
            RIGHT: 0,    
            padding: 3 ,       
            show: true,
            textStyle: { color: '#000' ,fontSize: 8 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
          
        },
         grid: {
             bottom: 0,
             left: 0,
             RIGHT: 0,
             top: 45,
             containLabel: true,
             textStyle: { color: '#000' ,fontSize: 9 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
         },
         xAxis: {
            boundaryGap: false,            
            data: yearDistinct.map(a => a.year),
            axisLabel: {
             textStyle: { color: '#000' ,fontSize: 8 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
            },           
         },
         yAxis: {
             min: minScala - (minScala/100*10),
             max: maxScala+(maxScala/100*10),            
             splitLine: {
                show: true,
                interval :3,
              },            
             type: 'value',
             splitNumber: 0,
             scale: true,
             axisLabel: {
                show: true,
                showMaxLabel :true,
                showMinLabel:true,
                splitNumber:2,
                 formatter: function (params) {
                  //  if(params === minScala - (minScala/100*10) || params === maxScala+(maxScala/100*10))
                  //     return  formatNumber(Number(params), "en-IN", "1.0-" +numToFixed);  
                   if(params === minScala - (minScala/100*10) && minScala >-1)
                      return  formatNumber(Number(minScala), "en-IN", "1.0-" +numToFixed);  
                   if( params === maxScala+(maxScala/100*10) && maxScala > -1)
                      return  formatNumber(Number(maxScala), "en-IN", "1.0-" +numToFixed); 
                 },
                 textStyle: { color: '#000' ,fontSize: 7 + this.fontResulation , fontFamily: 'Rubik' ,fontWeight: '400'},
             },
                   
         },
         series: seriesAll
     };   
     let nameChart;
     let chartData;
     if(dataDistinct.length>0)  
      chartData = {data: dataAnafGodel,chart:chartOption,name: dataDistinct[0].anaf_Global}; 
     return chartData;
 }
 


  convertDataToPieChart(catgory: number ,IfAcademic: number){
   const dataToPieChart= this.appStore.homePageData.filter(x=>x.madad_group_id === Number(catgory)
    && x.description_id === IfAcademic 
    && x.gender_id=== 0);
    if(dataToPieChart.length>0) {
     return  {
        tooltip: {
          trigger: 'item'
        },
       
        legend: {
          show:false,
          top: '5%',
          left: 'center'
        },
        
        series: [
          {
            color:[this.getColorChart(catgory),'#D3E3FD'],
            name: (dataToPieChart[0].value).toFixed(0) + '%',
            type: 'pie',
            radius: ['70%', '90%'],
            label: {
                formatter:'{a}',
                show: true,
                color: "#000" ,
                fontSize: 9 + this.fontResulation,
                fontWeight: '500',
                position: 'center',
               // padding: [0, 0, 35, 0]
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 9 + this.fontResulation,
                fontWeight: '500'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: dataToPieChart[0].value,  tooltip: {
                show:false,
              }},
              {value:  100-dataToPieChart[0].value,            
                         
              tooltip: {
                  show:false,
              }},
             
            ]
          }
        ]
      };
    }
    return null;
  }
}