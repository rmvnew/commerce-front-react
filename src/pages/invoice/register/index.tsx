import { useState } from "react"
import { InvoiceRows, InvoiceRegisterMain, TitleFont } from "./invoice.register.styled"
import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"




export const InvoiceRegister = () => {


    const [update, setUpdate] = useState(false)
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [invoiceDate, setInvoiceDate] = useState('')
    const [invoiceType, setInvoiceType] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [supplier, setSupplier] = useState('')
    const [paid, setPaid] = useState('')
    const [paymentDate, setPaymentDate] = useState('')
    const [invoiceLines, setInvoiceLines] = useState('')
    const [sale, setSale] = useState('')


    const onSubmit = (event: any) => {
        event.preventDefault()
    }

    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setInvoiceType(event.target.value as string);
    };


    return (


        <>

            <InvoiceRegisterMain >
                {!update && <TitleFont>Cadastrar Nota</TitleFont>}
                {update && <TitleFont>Atualizar Nota</TitleFont>}


                <form action="" onSubmit={onSubmit}>



                    <InvoiceRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Número da nota"
                                    variant="outlined"
                                    value={invoiceNumber}
                                    onChange={(event) => setInvoiceNumber(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem',

                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Data da nota"
                                    variant="outlined"
                                    value={invoiceDate}
                                    onChange={(event) => setInvoiceDate(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl variant="outlined" style={{ width: '240px', height: '40px' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Tipo de nota</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={invoiceType}
                                        onChange={handleChangeSelect}
                                        label="Tipo de pesquisa"
                                        style={{


                                        }}
                                    >
                                        <MenuItem value="clientName">
                                            <em>Entrada</em>
                                        </MenuItem>
                                        <MenuItem value={'clientCnpj'}>Saída</MenuItem>


                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Data de vencimento"
                                    variant="outlined"
                                    value={dueDate}
                                    onChange={(event) => setDueDate(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </InvoiceRows>



                    <InvoiceRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Montante total"
                                    variant="outlined"
                                    value={totalAmount}
                                    onChange={(event) => setTotalAmount(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>


                        </Grid>

                    </InvoiceRows>

                    <InvoiceRows>

                        <Grid container spacing={4}>




                        </Grid>

                    </InvoiceRows>

                    <InvoiceRows>

                        <Grid container spacing={4}>





                        </Grid>

                    </InvoiceRows>

                    <InvoiceRows>

                        {/* {update && <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px',
                                background: 'grey',
                                fontFamily: 'Black Han Sans'
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
                                width: '300px',
                                fontFamily: 'Black Han Sans'
                            }}
                            disabled={!allFieldsFilled()}
                            onClick={saveClient}
                        >
                            Salvar
                        </Button>}

                        <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px',
                                backgroundColor: 'orangered',
                                marginLeft: '20px',
                                fontFamily: 'Black Han Sans'
                            }}

                            onClick={handleButtonClick}
                        >
                            Voltar
                        </Button> */}

                    </InvoiceRows>


                </form>

            </InvoiceRegisterMain>


        </>


    )
}