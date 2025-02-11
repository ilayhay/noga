import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-card',
  imports: [CommonModule],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss'
})
export class CustomerCardComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomerCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}
