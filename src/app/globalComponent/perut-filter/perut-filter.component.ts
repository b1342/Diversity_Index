
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { RootService } from 'src/app/root.service';
import { AppState } from 'src/app/app.state';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Report3Service } from 'src/app/report3/report3.service';




@Component({
  selector: 'app-perut-filter',
  templateUrl: './perut-filter.component.html',
  styleUrls: ['./perut-filter.component.scss']
})
export class PerutFilterComponent implements OnInit {
  @HostBinding('class.container') container = true;
  @Input('report') report: number;

  constructor(private rootService: RootService,private report3Service: Report3Service, 
              private appStore: AppState,public dialog: MatDialog) {
    this.appStore.tags=[];   
  }


  ngOnInit() {

  }

  get filterSTR(): string {   
      return this.appStore.selectmdd != null ? this.appStore.selectmdd.name : '';
  }

  get tags(): any { 
  
    return this.appStore.tags;
  }
  tag_click(tag: string) {
    const index =  this.tags.indexOf(tag, 0);
    if (index === -1) {
      this.tags.push(tag);
    }
  
 }

  remove_tag_click(itemTag: any) {  
    const index =  this.appStore.tags.findIndex(a => a === itemTag);   
     if (index > -1) {     
      this.appStore.tags.splice(index, 1);   
      this.appStore['select' + itemTag.type]=this.appStore[itemTag.type + 'FilterData'][0]; 
            
     }
     else
       this.appStore.tags=[];
     switch (Number(this.report)) {
      case 1:{ 
        this.rootService.changeSelect();      
        this.rootService.loadDataPage1(); 
        break; }             
      case 2:{  
        this.rootService.changeSelect();    
        this.rootService.loadDataPage2();   
        break;}    
      case 3:{   
        this.report3Service.loadDataPage3();
        break;
      }
      case 4:{     
        this.rootService.loadDataPage4(); 
        break; }      
    }  
 }
  openAgdarotMadd()
  {
    const dialogConfig = new MatDialogConfig();
       dialogConfig.disableClose = true;
       dialogConfig.autoFocus = true;
      //  dialogConfig.height = 400px';
      //  dialogConfig.width = (window.innerWidth/100)*40 + 'px';

      // dialogConfig.data = {
      // id: 1,
      // title: '',
      // };

     const dialogRef = this.dialog.open(DialogComponent,  {
      //  width: '250px',
      //  height: '300px'
     });
     dialogRef.afterClosed().subscribe(result => {

    });
  }


}
