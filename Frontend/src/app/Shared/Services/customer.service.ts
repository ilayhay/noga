import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Customer } from "../Models/customer.model";
import { Contact } from "../Models/contacts.model";
import { Address } from "../Models/address.model";
import { CustomerRequest } from "../Requests/customerRequest.service";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private apiUrl = "api/customers";
  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: CustomerRequest): Observable<Customer> {
    return this.http
      .post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
