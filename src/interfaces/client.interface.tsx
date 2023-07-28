import {  AddressInterface } from "./address.interface"





export interface ClientInterface{

    clientName: string
    clientCnpj: string
    clientCpf: string
    clientEmail: string
    clientResponsible: string
    company: boolean
    addressRequestDto: AddressInterface
    telephone: string

}