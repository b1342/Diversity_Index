import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @HostBinding('class.container') container = true;

  constructor(
    private readonly rootService: RootService,
    private readonly appStore: AppState,
    public router: Router
  ) {}

  ngOnInit(): void {}

  homePage(): void {
    this.router.navigateByUrl('/');
  }

}
