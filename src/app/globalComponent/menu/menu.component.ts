
import { Component, OnInit, HostBinding } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';
import { Router } from '@angular/router';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @HostBinding('class.container') container = true;

  constructor(private rootService: RootService, private appStore: AppState,
    public router: Router) {

  }


  ngOnInit() {

  }
  homePage(){
    this.router.navigateByUrl('/');
  }
  
}
