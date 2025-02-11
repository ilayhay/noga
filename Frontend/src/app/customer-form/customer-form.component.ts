import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { Contact } from "../Shared/Models/contacts.model";
import { Address } from "../Shared/Models/address.model";
import { CustomerService } from "../Shared/Services/customer.service";
import { Customer } from "../Shared/Models/customer.model";
import { CustomerRequest } from "../Shared/Requests/customerRequest.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-customer-form",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  templateUrl: "./customer-form.component.html",
  styleUrl: "./customer-form.component.scss",
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  editMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data?: { customer: Customer }
  ) {
    this.customerForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(255)]],
      customerNumber: [
        "",
        [Validators.required, Validators.pattern("^[0-9]{9}$")],
      ],
      addresses: this.fb.array([]),
      contacts: this.fb.array([]),
    });

    if (data?.customer) {
      this.initializeWithCustomer(data.customer);
    }
  }

  get addresses() {
    return this.customerForm.get("addresses") as FormArray;
  }

  get contacts() {
    return this.customerForm.get("contacts") as FormArray;
  }

  private initializeWithCustomer(customer: Customer) {
    this.editMode = true;
    this.customerForm.addControl("id", this.fb.control("", []));
    this.customerForm.patchValue({
      id: customer.id,
      name: customer.name,
      customerNumber: customer.customerNumber,
    });

    customer.addresses?.forEach((address) => {
      this.addresses.push(this.createAddressGroup(address));
    });

    customer.contacts?.forEach((contact) => {
      this.contacts.push(this.createContactGroup(contact));
    });
  }

  private createAddressGroup(address?: Address) {
    return this.fb.group({
      city: [
        address?.city || "",
        [Validators.required, Validators.maxLength(100)],
      ],
      street: [
        address?.street || "",
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  private createContactGroup(contact?: Contact) {
    return this.fb.group({
      fullName: [
        contact?.fullName || "",
        [Validators.required, Validators.maxLength(255)],
      ],
      officeNumber: [contact?.officeNumber || "", [Validators.maxLength(15)]],
      email: [
        contact?.email || "",
        [Validators.maxLength(100), Validators.email],
      ],
    });
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());
  }

  addContact() {
    this.contacts.push(this.createContactGroup());
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  removeContact(index: number) {
    this.contacts.removeAt(index);
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.isSubmitting = true;
      const customerData = this.customerForm.value;
      let observable : Observable<Customer> = new Observable<Customer>
      if(this.editMode){
        const customer: Partial<Customer> = {
          id: customerData.id,
          name: customerData.name,
          customerNumber: customerData.customerNumber,
          addresses: customerData.addresses,
          contacts: customerData.contacts,
        };
        observable = this.customerService.updateCustomer(customerData.id, customer)
      }
      else{

        
        const customerRequest: CustomerRequest = {
          name: this.customerForm.value.name,
          customerNumber: this.customerForm.value.customerNumber,
          created: this.customerForm.value.created,
          isDeleted: this.customerForm.value.isDeleted,
        };
        observable = this.customerService.createCustomer(customerRequest);
      }
      observable.subscribe({
        next: (result: any) => {
          this.isSubmitting = false;
          this.dialogRef.close(result);
        },
        error: (error: any) => {
          this.isSubmitting = false;
          alert("אירעה שגיאה בשמירת הלקוח");
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
