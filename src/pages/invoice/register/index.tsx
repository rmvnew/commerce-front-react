import { useEffect, useState } from "react"
import { InvoiceRows, InvoiceRegisterMain, TitleFont } from "./invoice.register.styled"
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { api } from "../../../hooks/useApi"
import BasicDatePicker from "../../../components/datepicker/datepicker"
import { useLocation, useNavigate } from "react-router-dom"
import { InvoiceInterface } from "../../../interfaces/invoiceInterface"
import { InvoiceType } from "../../../common/enums"
import { toast } from "react-toastify"
import { inputMoneyChange } from "../../../common/utils"
import { CardDatePicker } from "../../../components/datepicker/datepicker.styled"



type Client = {
    id: number
    name: string
}


export const InvoiceRegister = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate()

    const [invoiceId, setInvoiceId] = useState(0)
    const [update, setUpdate] = useState(false)
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [invoiceSerie, setInvoiceSerie] = useState('')
    const [invoiceNote, setInvoiceNote] = useState('')

    const [invoiceDate, setInvoiceDate] = useState<Date | null>(null)
    const [invoiceType, setInvoiceType] = useState('')
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalAmountInput, setTotalAmountInput] = useState('')
    const [paid, setPaid] = useState(false)
    const [paidInput, setPaidInput] = useState('')
    const [paymentDate, setPaymentDate] = useState<Date | null>(null)

    const [saleCode, setSaleCode] = useState('')

    const [listClients, setListClients] = useState<any[]>([]);
    const [selectClient, setSelectClient] = useState<Client | null>(null)
    const [client, setClient] = useState(null)

    const [supplier, setSupplier] = useState(null)


    function setInvoice() {


        setUpdate(dataResult === undefined ? false : true)

        if (update) {
            setInvoiceId(dataResult.invoiceId)
            setInvoiceNumber(dataResult.invoiceNumber)
            setInvoiceDate(dataResult.invoiceDate)
            setInvoiceType(dataResult.invoiceType)
            setDueDate(dataResult.dueDate)
            setTotalAmount(dataResult.totalAmount)

            setSupplier(dataResult.supplier)

            setSelectClient(dataResult.client)
            setPaid(dataResult.paid)
            setPaymentDate(dataResult.paymentDate)
            setSaleCode(dataResult.saleCode)
        }


    }

    useEffect(() => {
        setInvoice()
    }, [])


    function createInvoice() {


        const invoice: InvoiceInterface = {

            invoiceNumber: invoiceNumber,
            invoiceSerie: invoiceSerie,
            invoiceNote: invoiceNote,
            invoiceDate: invoiceDate !== null ? new Date(invoiceDate) : new Date(),
            invoiceType: invoiceType === 'Entrada' ? InvoiceType.INPUT : InvoiceType.OUTPUT,
            dueDate: dueDate !== null ? new Date(dueDate) : new Date(),
            totalAmount: totalAmount,
            supplier: supplier,
            client: client,
            paid: paid,
            paymentDate: paymentDate !== null ? new Date(paymentDate) : new Date(),
            saleCode: saleCode

        }

        return invoice

    }


    function saveInvoice() {


        const invoice = createInvoice()


        api.post("/invoice", invoice)
            .then((response) => {
                navigate("/invoice")
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


    function updateInvoice() {


        const invoice = createInvoice()


        api.put(`/invoice/${invoiceId}`, invoice)
            .then((response) => {
                navigate("/invoice")
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




    const onSubmit = (event: any) => {
        event.preventDefault()
    }

    const handleChangeSelectInvoiceType = (event: SelectChangeEvent<string>) => {
        setInvoiceType(event.target.value as string);
    };


    const handleChangeSelectInvoicePaid = (event: SelectChangeEvent<string>) => {

        const res = event.target.value as string

        setPaid(res === 'Concluido' ? true : false)
        setPaidInput(res)

    };


    function getAllClients(search: string = '') {
        api.get(`/client/all?name=${search}`)
            .then((result) => {
                setListClients(result.data)
            })
    }



    useEffect(() => {
        getAllClients()
    }, []);


    useEffect(() => {

        const res = listClients.find(data => data.clientName === selectClient)
        setClient(res)

    }, [selectClient]);



    const allFieldsFilled = () => {
        return (

            invoiceDate !== null &&
            invoiceType !== ""
        );
    }

    function handleButtonClick() {

        navigate("/invoice")

    }

    // console.log('Client: ', client);

  

    return (


        <>
        

            <InvoiceRegisterMain >
                {!update && <TitleFont>Cadastrar Nota</TitleFont>}
                {update && <TitleFont>Atualizar Nota</TitleFont>}


                <form action="" onSubmit={onSubmit}>



                    <InvoiceRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={2}>
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


                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Serie da nota"
                                    variant="outlined"
                                    value={invoiceSerie}
                                    onChange={(event) => setInvoiceSerie(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',


                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>

                                <CardDatePicker>
                                    <BasicDatePicker
                                        label="Data da nota"
                                        value={invoiceDate}
                                        onChange={setInvoiceDate}

                                    />
                                </CardDatePicker>

                            </Grid>

                            <Grid item xs={12} md={2}>

                                <FormControl variant="outlined" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Tipo de nota</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={invoiceType}
                                        onChange={handleChangeSelectInvoiceType}
                                        label="Tipo de nota"
                                        style={{

                                            height: '100%'

                                        }}
                                    >
                                        <MenuItem value="Entrada">
                                            <em>Entrada</em>
                                        </MenuItem>
                                        <MenuItem value={'Saída'}>Saída</MenuItem>

                                    </Select>

                                </FormControl>

                            </Grid>

                            <Grid item xs={12} md={3}>
                                <CardDatePicker>
                                    <BasicDatePicker
                                        label="Data de vencimento"
                                        value={dueDate}
                                        onChange={setDueDate}

                                    />
                                </CardDatePicker>
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
                                    value={totalAmountInput}
                                    onChange={(event) => inputMoneyChange(event,setTotalAmount,setTotalAmountInput)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>

                                <Autocomplete
                                    id="free-solo-demo"
                                    freeSolo
                                    value={selectClient}
                                    onChange={(event: any, newValue: Client | null) => setSelectClient(newValue)}
                                    options={listClients.map((option) => option.clientName)}
                                    renderInput={(params) => <TextField {...params} label="Clientes" />}
                                />

                            </Grid>


                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Fornecedor"
                                    variant="outlined"
                                    value={supplier}
                                    // onChange={(event) => setSupplier(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>


                                <FormControl variant="outlined" style={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Status de pagamento</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={paidInput}
                                        onChange={handleChangeSelectInvoicePaid}
                                        label="Status de pagamento"
                                        style={{

                                            height: '100%'

                                        }}
                                    >
                                        <MenuItem value="Concluido">
                                            <em>Concluido</em>
                                        </MenuItem>
                                        <MenuItem value={'Pendente'}>Pendente</MenuItem>

                                    </Select>

                                </FormControl>

                            </Grid>


                            <Grid item xs={12} md={3}>


                                <CardDatePicker>
                                    <BasicDatePicker
                                        label="Data do pagamento"
                                        value={paymentDate}
                                        onChange={setPaymentDate}

                                    />
                                </CardDatePicker>

                            </Grid>


                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Código da venda"
                                    variant="outlined"
                                    value={saleCode}
                                    onChange={(event) => setSaleCode(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Observações"
                                    variant="outlined"
                                    value={invoiceNote}
                                    onChange={(event) => setInvoiceNote(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                        }
                                    }}
                                />
                            </Grid>


                        </Grid>

                    </InvoiceRows>



                    <InvoiceRows>

                        {update && <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px',
                                background: 'grey',
                                fontFamily: 'Black Han Sans'
                            }}
                            disabled={!allFieldsFilled()}
                            onClick={updateInvoice}
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
                            onClick={saveInvoice}
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
                        </Button>

                    </InvoiceRows>


                </form>

            </InvoiceRegisterMain>


        </>


    )
}