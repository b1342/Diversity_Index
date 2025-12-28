import { Component, OnInit } from '@angular/core';
import { AppState, factData, FilterData } from '../app.state';
import { RootService } from '../root.service';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
// import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
export class report1Component implements OnInit {
  
  height : number;
  constructor(public appStore: AppState,private rootService: RootService
   ) { 
   this.rootService.loadDataCaptchaV3(); 
  }

  ngOnInit() {    
    this.height =  window.innerHeight-75;
   // this.rootService.loadDataPage1();
  }

    
}
