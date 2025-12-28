import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  width: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DialogComponent>) {
      this.width =  window.innerWidth-((window.innerWidth)/100*60);

  }

  ngOnInit() {
    
  }

  closeDilog()
  {
    this.dialogRef.close();

  }
  opanPDF()
  {
    window.open('./assets/mddPdf.pdf','_blank');
    
  }

}
