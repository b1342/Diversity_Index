import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  width!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    private readonly dialogRef: MatDialogRef<DialogComponent>
  ) {
    const screenWidth = window.innerWidth;
    this.width = screenWidth - (screenWidth / 100 * 60);
  }

  ngOnInit(): void {}

  closeDilog(): void {
    this.dialogRef.close();
  }

  opanPDF(): void {
    window.open('./assets/mddPdf.pdf', '_blank');
  }
}
