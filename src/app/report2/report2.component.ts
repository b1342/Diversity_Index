import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from '../app.state';
import { RootService } from '../root.service';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.scss']
})
export class report2Component implements OnInit,OnChanges {
  
  height : number;
  constructor(public appStore: AppState,private rootService: RootService) {    

    this.rootService.loadDataCaptchaV3(); 
  }
  ngOnChanges() {
    
  }

  ngOnInit() { 
    this.height =  window.innerHeight-72;    
  
  }

    
}
