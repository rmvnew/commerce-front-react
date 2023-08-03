import { AddressInterface } from "./address.interface"







export interface SupplierInterface{

  supplierName: string
  supplierCnpj: string
  supplierTelephone: string
  supplierEmail: string
  address:AddressInterface

}