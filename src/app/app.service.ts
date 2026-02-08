import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Injectable , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Injectable()
export class AppService implements OnInit {


   url = environment.API_ENDPOINT;

   constructor(private http: HttpClient, private appStore: AppState) {
   }

   ngOnInit() {  
    
    }

  



}
