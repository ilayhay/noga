import { Address } from "./address.model";
import { Contact } from "./contacts.model";

export interface Customer {
    id: number;
    name: string;
    customerNumber: string;
    isDeleted: boolean;
    created: Date;
    addresses?: Address[];
    contacts?: Contact[];
  }