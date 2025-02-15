import { CustomerDialogService } from "./../Shared/Services/customerDialog.service";
import { Component } from "@angular/core";
import { Customer } from "../Shared/Models/customer.model";
import { Observable } from "rxjs/internal/Observable";
import { CustomerService } from "../Shared/Services/customer.service";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { CustomerFormComponent } from "../customer-form/customer-form.component";
import { CustomerCardComponent } from "../customer-card/customer-card.component";
import { MatButtonModule } from "@angular/material/button";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-customer-list",
  imports: [CommonModule, MatButtonModule],
  templateUrl: "./customer-list.component.html",
  styleUrl: "./customer-list.component.scss",
})
export class CustomerListComponent {
  customers: Customer[] = [];
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private customerDialog: CustomerDialogService
  ) {}
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe((res) => {
      this.isLoading = false;
      this.customers = res;
    });
  }

  addCustomer() {
    this.customerDialog.openEditDialog().subscribe(async (result) => {
      this.customers =
        (await this.customerService.getCustomers().toPromise()) ?? [];
    });
  }

  async viewCustomer(id: number) {
    const customer = await this.customerService.getCustomer(id).toPromise();
    this.dialog.open(CustomerCardComponent, {
      width: "600px",
      data: customer,
    });
  }

  async editCustomer(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    this.customerDialog.openEditDialog(customer).subscribe(async (result) => {
      this.customers =
        (await this.customerService.getCustomers().toPromise()) ?? [];
    });
  }

  async deleteCustomer(id: number) {
    await this.customerService.deleteCustomer(id).toPromise();
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }
}
