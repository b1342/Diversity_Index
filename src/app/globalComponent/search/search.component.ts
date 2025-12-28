import { RootService } from '../../root.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { AppState } from '../../app.state';

import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @HostBinding('class.container') container = true;
  // tslint:disable-next-line:no-input-rename
  @Input('tags') tags: string[]; 

  height : number;
  constructor(private rootService: RootService, private appStore: AppState) {

  }
 
  ngOnInit() {
    this.height = 40;
  }
  colorCatgory(catgory: number): string { 
     
    return this.rootService.getColorChart(catgory);
  } 

  NameCatgory(catgory: number): any {      
    return this.appStore.givunGroupFilterData.filter(x=>x.value === Number(catgory));
  } 

  getNumAllByCatgory(catgory :Number): any {      
    return   this.appStore.homePageData.filter(x=>x.madad_group_id === Number(catgory)
                                               && x.description_id=== 0 
                                               && x.gender_id=== 0); 
  } 

  get numAll(): any {      
    return   this.appStore.homePageSumAllData; 
  } 
 
}
