import { Dialog } from "@angular/cdk/dialog";
import { Injectable } from "@angular/core";
import { Customer } from "../Models/customer.model";
import { CustomerFormComponent } from "../../customer-form/customer-form.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class CustomerDialogService {
  constructor(private dialog: MatDialog ) { }

  openEditDialog(customer?: Customer) {
    return this.dialog.open(CustomerFormComponent, {
      data: { customer },
      width: '600px',
      disableClose: true,
      direction: 'rtl'
    }).afterClosed();
  }
}