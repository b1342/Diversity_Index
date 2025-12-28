import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import { RootService } from '../../root.service';
import { MatDialogConfig } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/globalComponent/dialog/dialog.component';
import { Router } from '@angular/router';
import { Report3Service } from '../report3.service';

@Component({
  selector: 'app-filter3',
  templateUrl: './filter3.component.html',
  styleUrls: ['./filter3.component.scss']
})
export class Filter3Component implements OnInit {

selectedMosad:any;
selectedGodel:any;
selectedGil: any;
selectedLeom: any;
selectedAnaf: any;
selectedGander: any;
selectedAcademic: any;
selectedSektor: any;
selectedMdd: any;
selectedYear: any;
selectedGivunGroup: any;
constructor(public appStore: AppState,private rootService: RootService,private report3Service: Report3Service
    ,public dialog: MatDialog,public router: Router) {
     this.selectedSektor=this.sektorFilter[0];
     this.appStore.selectsektor = this.selectedSektor;
    
     this.selectedMdd=null;
     this.appStore.selectmdd = null;
     
   

    this.loadFiltersData();
  }
  openPage(){
    this.router.navigateByUrl('/');
  }
  ngOnInit() {

   // this.yearFilter = this.selectedMosad.value;
  }
  get yearFilter(): any {  
    return this.appStore.yearFilterData;
  }
 get godelFilter(): any {
    return this.appStore.godelFilterData;
  }
  get mddFilter(): any {
    return this.appStore.mddFilterData;
  }
  get sektorFilter(): any {
    return this.appStore.sektorFilterData;
  }
 get gilFilter(): any {
    return this.appStore.gilFilterData;
  }
  get leomFilter(): any {
    return this.appStore.leomFilterData;
  }
 get anafFilter(): any {
    return this.appStore.anafFilterData;
  }
  get ganderFilter(): any {
    return this.appStore.ganderFilterData;
  }
 get academicFilter(): any {
    return this.appStore.academicFilterData;
  }
  get givunGroupFilter(): any {
    return this.appStore.givunGroupFilterData;
  }

  onSelect(event,data,selectName) {     
    const index =  this.appStore.tags.findIndex(a => a.type === selectName);
    if (index>-1) {
       this.appStore.tags.splice(index, 1);
    }
   const select = data[event['target']['selectedIndex']];
   this.appStore['select'+selectName] = select;
   if(selectName !== 'mdd')
      this.appStore.tags.push({type:selectName,value:select});
   //this.rootService.changeSelect();   
   this.report3Service.loadDataPage3();
  }
  loadFiltersData(){
   
    this.appStore.tags=[];
    this.selectedGil=this.gilFilter[0];
    this.appStore.selectgil=this.selectedGil;
    this.selectedGodel=this.godelFilter[0];
    this.appStore.selectgodel=this.selectedGodel;
    this.selectedLeom=this.leomFilter[0];
    this.appStore.selectleom=this.selectedLeom;
    this.selectedAnaf=this.anafFilter[0];
    this.appStore.selectanaf=this.selectedAnaf;
    this.selectedGander=this.ganderFilter[0];
    this.appStore.selectgander=this.selectedGander;
    this.selectedAcademic=this.academicFilter[0];
    this.appStore.selectacademic=this.selectedAcademic;
    this.selectedYear=this.yearFilter[0];
    this.appStore.selectyear=this.selectedYear;
    this.selectedGivunGroup=this.givunGroupFilter[0];
    this.appStore.selectgivunGroup=this.selectedGivunGroup;
    this.report3Service.loadDataPage3();
  }

  openAgdarotMadd()
  {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
     

     const dialogRef = this.dialog.open(DialogComponent,  {     
     });
     dialogRef.afterClosed().subscribe(result => {

    });
  }

}
