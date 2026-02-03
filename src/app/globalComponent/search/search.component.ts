import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from '../../root.service';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @HostBinding('class.container') container = true;

  @Input('tags') tags!: string[];

  height!: number;

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState
  ) {}

  ngOnInit(): void {
    this.height = 40;
  }

  colorCatgory(catgory: number): string {
    return this.rootService.getColorChart(catgory);
  }

  NameCatgory(catgory: number): any[] {
    return this.appStore.givunGroupFilterData
      .filter(x => x.value === Number(catgory));
  }

  getNumAllByCatgory(catgory: number): any[] {
    return this.appStore.homePageData
      .filter(x =>
        x.madad_group_id === Number(catgory) &&
        x.description_id === 0 &&
        x.gender_id === 0
      );
  }

  get numAll(): any {
    return this.appStore.homePageSumAllData;
  }

}
