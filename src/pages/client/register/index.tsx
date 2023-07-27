import { useEffect, useState } from "react"
import { ClientFormMain, ClientRegisterContainer, CardContainer, UserFormLabel } from "./client.register.styled"
import { Button, FormControlLabel, Grid, InputAdornment, Switch, TextField } from "@mui/material"
import CNPJTextField from "../../../components/mask/cnpj.inputMask"
import CpfTextField from "../../../components/mask/cpf.inputMask"
import { Col, Row } from "react-bootstrap"
import './registerClient.css'



export const ClientRegister = () => {


    const onSubmit = (event: any) => {
        event.preventDefault()
        console.log('testeeeeee');
    }



    const [clientName, setClientName] = useState("")
    const [clientCnpj, setClientCnpj] = useState("")
    const [clientCpf, setClientCpf] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientResponsible, setClientResponsible] = useState("")
    const [company, setCompany] = useState(false)

    const [zipcode, setZipcode] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [district, setDistrict] = useState("")
    const [street, setStreet] = useState("")
    const [homeNumber, setHomeNumber] = useState("")
    const [telephone, setTelephone] = useState("")

    useEffect(() => {
        console.log(company);
    }, [company])


    return (


        <div className="registerMain">


            <form action="" onSubmit={onSubmit}>

                <div className="rows">

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
                </div>

                <div className="rows">

                    <Grid container spacing={4}>

                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Nome do Cliente"
                                variant="outlined"
                                onChange={(event) => setClientName(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                        {company && <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="CNPJ"
                                variant="outlined"
                                onChange={(event) => setClientCnpj(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>}

                        {!company && <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="CPF"
                                variant="outlined"
                                onChange={(event) => setClientCpf(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
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
                                onChange={(event) => setClientEmail(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                    </Grid>

                </div>



                <div className="rows">

                    <Grid container spacing={4}>


                        <Grid item xs={12} md={5}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Nome do Responsável"
                                variant="outlined"
                                onChange={(event) => setClientResponsible(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="CEP"
                                variant="outlined"
                                onChange={(event) => setZipcode(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
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
                                onChange={(event) => setState(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                    </Grid>

                </div>

                <div className="rows">

                    <Grid container spacing={4}>


                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Cidade"
                                variant="outlined"
                                onChange={(event) => setCity(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
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
                                onChange={(event) => setDistrict(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
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
                                onChange={(event) => setStreet(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                    </Grid>

                </div>

                <div className="rows">

                    <Grid container spacing={4}>


                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Número"
                                variant="outlined"
                                onChange={(event) => setHomeNumber(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Telefone"
                                variant="outlined"
                                onChange={(event) => setTelephone(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                        fontSize:'1.2rem'
                                    }
                                }}
                            />
                        </Grid>



                    </Grid>

                </div>


                <Button
                    variant="contained"
                    style={{
                        fontSize: '1.2rem',
                        width:'300px'
                    }}
                >
                    Salvar
                </Button>
            </form>

        </div>



    )
}



//     const [homeNumber, setHomeNumber] = useState("")
//     const [telephone, setTelephone] = useState("")