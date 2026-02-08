import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrls: ['./dialog-alert.component.scss'],
    standalone: false
})
export class DialogAlertComponent implements OnInit {

  width!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    private readonly dialogRef: MatDialogRef<DialogAlertComponent>
  ) {
    const screenWidth = window.innerWidth;
    this.width = screenWidth - (screenWidth / 100 * 550);
  }

  ngOnInit(): void {}

  closeDilog(): void {
    this.dialogRef.close();
  }

  mailto(emailAddress: string, emailSubject: string): string {
    return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
  }

}
