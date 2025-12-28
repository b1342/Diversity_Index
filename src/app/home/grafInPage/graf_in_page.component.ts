
import { RootService } from './../../root.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { AppState } from '../../app.state';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'graf_in_page',
  templateUrl: './graf_in_page.component.html',
  styleUrls: ['./graf_in_page.component.scss']
})
export class GrafInPageComponent implements OnInit {
  @HostBinding('class.container') container = true;
  @Input('catgory') catgory: number;
  height;
  constructor(private rootService: RootService, private appStore: AppState,public dialog: MatDialog) {

  }


  ngOnInit() {
    this.height =  window.innerHeight-65;
  }
  get colorCatgory(): string { 
     
    return   this.rootService.getColorChart(this.catgory);
  } 
  get numAll(): any {      
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 0 
                                               && x.gender_id=== 0); 
  } 
  get numAllWomen(): any {    
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 0 
                                               && x.gender_id=== 3);
  } 
  get numAllMen(): any {      
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 0 
                                               && x.gender_id=== 1);
  } 
  get numAllAcadmicMen(): any {    
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 3 
                                               && x.gender_id=== 1);
  } 
  get numAllNoAcadmicMen(): any {      
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 2 
                                               && x.gender_id=== 1);
  } 
  get numAllAcadmicWomen(): any {    
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 3 
                                               && x.gender_id=== 3);
  } 
  get numAllNoAcadmicWomen(): any {      
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(this.catgory)
                                               && x.description_id=== 2 
                                               && x.gender_id=== 3);
  } 


  get pieChartNoAcademi(): object {      
    return   this.appStore['pieChartNoAcademi'+ this.catgory];
  }

  get pieChartAcademi(): object {      
    return   this.appStore['pieChartAcademi'+ this.catgory];
  }
  
 
}
