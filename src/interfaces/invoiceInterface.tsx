import { InvoiceType } from "../common/enums"
import { SupplierInterface } from "./Supplier.interface"
import { ClientInterface } from "./client.interface"





export interface InvoiceInterface {

    invoiceNumber?: string | null
    invoiceSerie?: string | null
    invoiceDate: Date
    invoiceType: InvoiceType,
    dueDate: Date,
    totalAmount: number,
    supplier?: SupplierInterface | null,
    client?: ClientInterface | null
    paid: boolean
    paymentDate: Date
    saleCode: string
    invoiceNote?: string | null

}