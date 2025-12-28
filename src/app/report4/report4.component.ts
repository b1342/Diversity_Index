import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from '../app.state';
import { RootService } from '../root.service';

@Component({
  selector: 'app-report4',
  templateUrl: './report4.component.html',
  styleUrls: ['./report4.component.scss']
})
export class report4Component implements OnInit,OnChanges {
  
  height : number;
  constructor(public appStore: AppState,private rootService: RootService) {    
    this.rootService.loadDataCaptchaV3(); 

  }
  ngOnChanges() {
    
  }

  ngOnInit() {    
    this.height =  window.innerHeight-75;
  }

    
}
