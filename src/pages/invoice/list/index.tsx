import { NavLink } from "react-router-dom"
import { BoxInput, InvoiceMain, TitleFont } from "./invoice.list.styled"
import { Fab, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { ImageNotFound } from "../../../common/imageNotFound/imageNotfound";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";
import { TableClient } from "../../client/list/client.list.styled";
import { CardTableActions, DesactiveTableButton, PaginationCard, TableButtonNavLink } from "../../../common/global.styled";
import { ImPencil2 } from "react-icons/im";
import { RiDeleteBinFill } from "react-icons/ri";
import { api } from "../../../hooks/useApi";





export const InvoiceList = () => {

    const [haveData, setHaveData] = useState(true)
    const [isModalOpen, setModalOpen] = useState(false);
    const [invoiceIdToChangeStatus, setInvoiceIdToChangeStatus] = useState<number | null>(null);
    const [selectValue, setSelectValue] = useState('')
    const [search, setSearch] = useState("")
    const [invoices, setInvoices] = useState<any[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);



    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value as string);
    };


    const handleChange = (e: any, currentPage: any) => {
        const numberPage = currentPage - 1
        setPage(numberPage)
    }

    const setResponse = (res: any) => {
        setInvoices(res.data.content)
        setPages(res.data.totalPages)
    }

    const getInvoice = async (page: number = 0) => {
        await api.get(`/invoice?page=${page}&size=8`)
            .then(response => {
                setResponse(response)
            })
        }
        
       
    useEffect(()=>{
        getInvoice()
    },[])

    useEffect(() => {

        if (invoices.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }

    }, [invoices]);

    // const handleConfirm = async () => {
    //     if (invoiceIdToChangeStatus) {
    //         await changeStatus(clientIdToChangeStatus);
    //     }
    //     setModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setModalOpen(false);
    // };




    return (
        <InvoiceMain>


            <TitleFont>Lista de Notas</TitleFont>

            <NavLink to={'/invoice/register'}>
                <Tooltip
                    title="Adicionar"
                    placement='left'
                >
                    <Fab
                        color="primary"
                        aria-label="add"
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            marginBottom: '25px',
                            width: '70px',
                            height: '70px'
                        }}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </NavLink>


            {!haveData && <div>

                <ImageNotFound message="Nenhum produto encontrado" />

            </div>}

            {haveData && <div>

                {/* <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirmação de deleção"
                    message="Tem certeza de que deseja desativar este cliente?"
                /> */}

                <div>


                    <BoxInput style={{ display: 'flex', alignItems: 'center' }}>

                        <FormControl variant="outlined" style={{ width: '240px', height: '40px' }}>
                            <InputLabel id="demo-simple-select-outlined-label">Tipo de pesquisa</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={selectValue}
                                onChange={handleChangeSelect}
                                label="Tipo de pesquisa"
                                style={{
                                    height: '40px',
                                    marginRight: '15px',
                                    marginBottom: '25px'
                                }}
                            >
                                <MenuItem value="clientName">
                                    <em>Nome</em>
                                </MenuItem>
                                <MenuItem value={'clientCnpj'}>CNPJ</MenuItem>
                                <MenuItem value={'clientCpf'}>CPF</MenuItem>
                                <MenuItem value={'clientEmail'}>E-mail</MenuItem>
                                <MenuItem value={'clientResponsible'}>Responsável</MenuItem>

                            </Select>
                        </FormControl>
                        {/*...outros elementos*/}



                        <TextField
                            id="standard-basic"
                            label="Busca"
                            variant="standard"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    left: '25px',

                                }
                            }}
                            inputProps={{
                                style: {
                                    paddingLeft: '10px',
                                    marginBottom: '15px'
                                }
                            }}
                        />
                    </BoxInput>

                </div>

                <TableClient >
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Número</td>
                            <td>Série</td>
                            <td>Data nota</td>
                            <td>Valor</td>
                            <td>Tipo</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                                <tr key={invoice.invoiceId} >
                                <td>{invoice.invoiceId}</td>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.invoiceSerie}</td>
                                <td>{invoice.invoiceDate}</td>
                                <td>{invoice.totalAmount}</td>
                                <td>{invoice.invoiceType}</td>

                                <td>
                                    <CardTableActions>
                                        <TableButtonNavLink to={"/invoice/register"} state={{
                                            data: {
                                                invoiceId: invoice.invoiceId,
                                                invoiceNumber: invoice.invoiceNumber,
                                                invoiceSerie: invoice.invoiceSerie,
                                                invoiceDate: invoice.invoiceDate,
                                                invoiceType: invoice.invoiceType,
                                                dueDate: invoice.dueDate,
                                                totalAmount: invoice.totalAmount,
                                                supplier: invoice.supplier,
                                                client: invoice.client,
                                                paid: invoice.paid,
                                                paymentDate: invoice.paymentDate,
                                                invoiceNote: invoice.invoiceNote,
                                                invoiceLines: invoice.invoiceLines,
                                                sale: invoice.sale

                                            }
                                        }} className="btn btn-warning"><ImPencil2 /></TableButtonNavLink>
                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                        // onClick={() => openModal(client.clientId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </TableClient>

                <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard>


            </div>}


        </InvoiceMain>
    )
}