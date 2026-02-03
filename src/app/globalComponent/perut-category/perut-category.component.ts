import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-perut-category',
  templateUrl: './perut-category.component.html',
  styleUrls: ['./perut-category.component.scss']
})
export class perutCategoryComponent implements OnInit {

  @HostBinding('class.container') container = true;

  @Input('headerTxt') headerTxt!: string;

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState
  ) {}

  ngOnInit(): void {}

  colorCatgory(catgory: number): string {
    return this.rootService.getColorChart(catgory);
  }

}
