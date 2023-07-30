import { useEffect, useRef, useState } from "react"
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material"
import CNPJTextField from "../../../components/mask/cnpj.inputMask"
import CPFTextMask from "../../../components/mask/cpf.inputMask"
import CEPTextFieldMask from "../../../components/mask/cep.inputMask"
import { ClientInterface } from '../../../interfaces/client.interface';
import PhoneTextFieldMask from "../../../components/mask/phone.inputMask"
import { api } from "../../../hooks/useApi"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios';
import React from "react"
import { ClientFormMain, ClientRows } from "./client.register.styled"
import { TitleFont } from "../list/client.list.styled"



export const ClientRegister = () => {


    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate()


    const onSubmit = (event: any) => {
        event.preventDefault()
    }




    function createClient() {

        const client: ClientInterface = {

            clientName: clientName,
            clientCnpj: clientCnpj,
            clientCpf: clientCpf,
            clientEmail: clientEmail,
            clientResponsible: clientResponsible,
            company: company,
            addressRequestDto: {
                zipcode: zipcode,
                state: state,
                city: city,
                district: district,
                street: street,
                homeNumber: homeNumber,
            },
            telephone: telephone,

        }

        return client

    }



    function saveClient() {


        const client = createClient()


        api.post("/client", client)
            .then((response) => {
                navigate("/client")
            })
            .catch((error) => {

                console.log(error.response);
                toast.error(
                    error.response.data.message,
                    {
                        // position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
            })

    }


    function updateClient() {


        const client = createClient()


        api.put(`/client/${clientId}`, client)
            .then((response) => {
                navigate("/client")
            })
            .catch((error) => {

                console.log(error.response);
                toast.error(
                    error.response.data.message,
                    {
                        // position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
            })

    }







    const allFieldsFilled = () => {
        return (
            clientName !== "" &&
            clientEmail !== "" &&
            clientResponsible !== "" &&
            (company ? clientCnpj !== "" : clientCpf !== "") &&
            zipcode !== "" &&
            state !== "" &&
            city !== "" &&
            district !== "" &&
            street !== "" &&
            homeNumber !== "" &&
            telephone !== ""
        );
    }


    const [clientId, setClientId] = useState(0)
    const [clientName, setClientName] = useState("")
    const [clientCnpj, setClientCnpj] = useState("")
    const [clientCpf, setClientCpf] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientResponsible, setClientResponsible] = useState("")
    const [company, setCompany] = useState(false)
    const [update, setUpdate] = useState(false)
    const [zipcode, setZipcode] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [homeNumber, setHomeNumber] = useState("")
    const [telephone, setTelephone] = useState("")

    const homeNumberRef = useRef<HTMLInputElement | null>(null);


    async function getAddress(cep: string) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            const address = response.data

            setState(address.uf)
            setCity(address.localidade)
            setDistrict(address.bairro)
            setStreet(address.logradouro)

            if (homeNumberRef.current !== null) {
                homeNumberRef.current.focus();
            }




        } catch (error) {
            console.error('Erro ao buscar CEP: ', error);
        }
    }



    useEffect(() => {

        if (zipcode.length === 9) {

            getAddress(zipcode.replace("-", ""))
        }

    }, [zipcode])



    function setClient() {


        setUpdate(dataResult === undefined ? false : true)
        setClientId(dataResult === undefined ? '' : dataResult.clientId)
        setClientName(dataResult === undefined ? '' : dataResult.clientName)
        setClientCnpj(dataResult === undefined ? '' : dataResult.clientCnpj)
        setClientCpf(dataResult === undefined ? '' : dataResult.clientCpf)
        setClientEmail(dataResult === undefined ? '' : dataResult.clientEmail)
        setClientResponsible(dataResult === undefined ? '' : dataResult.clientResponsible)
        setTelephone(dataResult === undefined ? '' : dataResult.telephone)
        setZipcode(dataResult === undefined ? '' : dataResult.zipcode)
        setState(dataResult === undefined ? '' : dataResult.state)
        setCity(dataResult === undefined ? '' : dataResult.city)
        setDistrict(dataResult === undefined ? '' : dataResult.district)
        setStreet(dataResult === undefined ? '' : dataResult.street)
        setHomeNumber(dataResult === undefined ? '' : dataResult.homeNumber)

    }

    useEffect(() => {
        setClient()
    }, [])

    return (

        <>

            <ClientFormMain >
            {!update && <TitleFont>Cadastrar Cliente</TitleFont>}
            {update && <TitleFont>Atualizar Cliente</TitleFont>}


                <form action="" onSubmit={onSubmit}>

                    <ClientRows >

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={3}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={company}
                                            onChange={() => setCompany(!company)}
                                            name="company"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    }
                                    label="Empresa"
                                />
                            </Grid>
                        </Grid>
                    </ClientRows>

                    <ClientRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Nome do Cliente"
                                    variant="outlined"
                                    value={clientName}
                                    onChange={(event) => setClientName(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem',

                                        }
                                    }}
                                />
                            </Grid>


                            {company &&
                                <Grid item xs={12} md={3}>
                                    <CNPJTextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="CNPJ"
                                        variant="outlined"
                                        value={clientCnpj}
                                        onChange={setClientCnpj}
                                        InputProps={{
                                            style: {
                                                textAlign: 'center',
                                                fontSize: '1.2rem',

                                            }
                                        }}
                                    />
                                </Grid>
                            }


                            {!company &&
                                <Grid item xs={12} md={3}>
                                    <CPFTextMask
                                        fullWidth
                                        id="outlined-basic"
                                        label="CPF"
                                        variant="outlined"
                                        value={clientCpf}
                                        onChange={setClientCpf}
                                        inputProps={{
                                            style: {
                                                textAlign: 'center',
                                                fontSize: '1.2rem',

                                            }
                                        }}
                                    />
                                </Grid>}

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="E-mail do cliente"
                                    variant="outlined"
                                    value={clientEmail}
                                    onChange={(event) => setClientEmail(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </ClientRows>



                    <ClientRows>

                        <Grid container spacing={4}>


                            <Grid item xs={12} md={5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Nome do Responsável"
                                    variant="outlined"
                                    value={clientResponsible}
                                    onChange={(event) => setClientResponsible(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <CEPTextFieldMask
                                    fullWidth
                                    id="outlined-basic"
                                    label="CEP"
                                    variant="outlined"
                                    value={zipcode}
                                    onChange={setZipcode}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Estado"
                                    variant="outlined"
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </ClientRows>

                    <ClientRows>

                        <Grid container spacing={4}>


                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Cidade"
                                    variant="outlined"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Bairro"
                                    variant="outlined"
                                    value={district}
                                    onChange={(event) => setDistrict(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Rua"
                                    variant="outlined"
                                    value={street}
                                    onChange={(event) => setStreet(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </ClientRows>

                    <ClientRows>

                        <Grid container spacing={4}>


                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Número"
                                    variant="outlined"
                                    value={homeNumber}
                                    onChange={(event) => setHomeNumber(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputRef={homeNumberRef}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <PhoneTextFieldMask
                                    fullWidth
                                    id="outlined-basic"
                                    label="Telefone"
                                    variant="outlined"
                                    value={telephone}
                                    onChange={setTelephone}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>



                        </Grid>

                    </ClientRows>

                    <ClientRows>

                        {update && <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px',
                                background: 'grey'
                            }}
                            disabled={!allFieldsFilled()}
                            onClick={updateClient}
                        >
                            Salvar
                        </Button>}

                        {!update && <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px'
                            }}
                            disabled={!allFieldsFilled()}
                            onClick={saveClient}
                        >
                            Salvar
                        </Button>}

                    </ClientRows>


                </form>

            </ClientFormMain>


        </>

    )
}

