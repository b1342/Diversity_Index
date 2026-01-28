import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CacheService } from 'ng2-cache';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { Response } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';
import { NgxEchartsModule  } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AppRoutingModule } from './app.routes';
import { AppService } from './app.service';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';

import { MatDialogModule, MatButtonModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';
// import { AuthHttp, AuthConfig } from 'angular2-jwt';

import {report1Component} from './report1/report1.component'
import {report2Component} from './report2/report2.component'
import { APP_STORE_PROVIDER } from './app.store';
import { RootService } from './root.service';


import { AngularSvgIconModule } from 'angular-svg-icon';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { NgxHighlightWordsModule } from 'ngx-highlight-words';

import { MatExpansionModule } from '@angular/material/expansion';
import { Page2Component } from './report2/page2/page2.component';
import { Page1Component } from './report1/page1/page1.component';
import { FilterComponent } from './report1/filter/filter.component';
import { Filter2Component } from './report2/filter/filter2.component';
import { GrafAcademicComponent } from './report2/grafAcademic/grafAcademic.component';
import { HomeComponent } from './home/home.component';
import { PageHomeComponent } from './home/pageHome/page_home.component';
import { GrafInPageComponent } from './home/grafInPage/graf_in_page.component';
import { MenuComponent } from './globalComponent/menu/menu.component';
import { DialogComponent } from './globalComponent/dialog/dialog.component';
import { SearchComponent } from './globalComponent/search/search.component';
import { report3Component } from './report3/report3.component';
import { Filter3Component } from './report3/filter3/filter3.component';
import { Page3Component } from './report3/page3/page3.component';
import { PerutFilterComponent } from './globalComponent/perut-filter/perut-filter.component';
import { report4Component } from './report4/report4.component';
import { Page4Component } from './report4/page4/page4.component';
import { Filter4Component } from './report4/filter4/filter4.component';
import { perutCategoryComponent } from './globalComponent/perut-category/perut-category.component';
import { numCategoryComponent } from './globalComponent/num-category/num-category.component';
import { barByFilterComponent } from './globalComponent/bar-by-filter/bar-by-filter.component';
import { barByCategoryComponent } from './globalComponent/bar-by-category/bar-by-category.component';
import { DialogAlertComponent } from './globalComponent/dialog-alert/dialog-alert.component';
import { bigBarByFilterComponent } from './globalComponent/big-bar-by-filter/big-bar-by-filter.component';
import { environment } from 'src/environments/environment';
import { Interceptor } from './Interceptor';
// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
  name: 'million'
})

export class MillionPipe extends DecimalPipe {
  transform(value: number): any {
    let format = '1.0-0';
    if (Math.abs(value) < 10000000) { format = '1.2-2'; }
    return super.transform(((value || 0) / 1000000), format) + ' M';
  }
}

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false },
    'siteKey': '6Lf7UL0cAAAAAIt_m-d24WG4mA1XFPHE8yVckc5S',
  };

}


@NgModule({
  declarations: [
    AppComponent,
    MillionPipe,
    report1Component,
    report2Component,
    report3Component,
    report4Component,
    Page2Component,
    Page3Component,
    Page4Component,
    MenuComponent,
    DialogComponent,
    DialogAlertComponent,
    SearchComponent,
    Page1Component,
    FilterComponent,    
    Filter2Component,
    Filter3Component,
    Filter4Component,
    HomeComponent,
    GrafAcademicComponent,
    PageHomeComponent,
    GrafInPageComponent,
    PerutFilterComponent,
    perutCategoryComponent,
    numCategoryComponent,
    barByFilterComponent,
    barByCategoryComponent,
    bigBarByFilterComponent
  ],
  imports: [
    AppRoutingModule,
     HttpClientModule, AlertModule.forRoot(), MDBBootstrapModule.forRoot(),
     NgxEchartsModule, FormsModule, Ng2CompleterModule, 
    BrowserAnimationsModule, NgxDatatableModule, ScrollToModule.forRoot(), AngularSvgIconModule,
    ChartModule,
    TableModule,
    InputSwitchModule,
    //NgxHighlightWordsModule,
    TooltipModule.forRoot(),
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    RecaptchaV3Module,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    AppService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    MillionPipe,
    APP_STORE_PROVIDER,
    RootService,
    CacheService,
 //  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    

  ],
  bootstrap: [AppComponent],
  entryComponents: [
      DialogComponent,
      DialogAlertComponent
      ]
  
})
export class AppModule {
}