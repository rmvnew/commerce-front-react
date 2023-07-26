import { useState } from "react"
import { ClientFormMain, ClientRegisterContainer, FormContainer, UserFormLabel } from "./client.register.styled"



export const ClientRegister = () => {


    const [clientName, setClientName] = useState("")
    const [clientCnpj, setClientCnpj] = useState("")
    const [clientCpf, setClientCpf] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientResponsible, setClientResponsible] = useState("")
    const [company, setCompany] = useState("")
    const [address, setAddress] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [homeNumber, setHomeNumber] = useState("")
    const [telephone, setTelephone] = useState("")


    return (

        <ClientRegisterContainer>

            <ClientFormMain>

                <FormContainer>
                    <UserFormLabel>Nome</UserFormLabel>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Digite o nome do client"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </FormContainer>

                <FormContainer>
                    <UserFormLabel>Nome</UserFormLabel>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Digite o nome do client"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </FormContainer>

            </ClientFormMain>
        </ClientRegisterContainer>

    )
}