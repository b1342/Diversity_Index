import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent implements OnInit {

  width: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DialogAlertComponent>) {
      this.width =  window.innerWidth-((window.innerWidth)/100*550);

  }

  ngOnInit() {
    
  }

  closeDilog()
  {
    this.dialogRef.close();

  }

  mailto(emailAddress: string, emailSubject: any) {
    return "mailto:" + emailAddress + "?subject=" + emailSubject
}
  
}
