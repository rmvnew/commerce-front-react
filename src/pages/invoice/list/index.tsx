import { NavLink } from "react-router-dom"
import { BoxInput, InvoiceMain, TitleFont } from "./invoice.list.styled"
import { Fab, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { ImageNotFound } from "../../../common/imageNotFound/imageNotfound";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";
import { TableClient } from "../../client/list/client.list.styled";
import { CardTableActions, DesactiveTableButton, PaginationCard, TableButtonNavLink } from "../../../common/global.styled";
import { ImPencil2 } from "react-icons/im";
import { RiDeleteBinFill } from "react-icons/ri";





export const InvoiceList = () => {

    const [haveData, setHaveData] = useState(false)
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
                            <td>Nome</td>
                            <td>CNPJ</td>
                            <td>CPF</td>
                            <td>E-mail</td>

                            <td>Data Cadastro</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((client) => (
                            // <tr key={client.clientId} className={classes.tableRow}>
                            <tr key={client.clientId} >
                                <td>{client.clientId}</td>
                                <td>{client.clientName}</td>
                                <td>{client.clientEmail}</td>

                                
                                <td>
                                    <CardTableActions>
                                        <TableButtonNavLink to={"/client/register"} state={{
                                            data: {
                                                clientId: client.clientId,
                                                clientName: client.clientName,
                                                clientCnpj: client.clientCnpj,
                                                clientCpf: client.clientCpf,
                                                clientEmail: client.clientEmail,
                                                clientResponsible: client.clientResponsible,
                                                telephone: client.telephone,
                                                company: client.company,
                                                zipcode: client.address.zipcode,
                                                state: client.address.state,
                                                city: client.address.city,
                                                district: client.address.district,
                                                street: client.address.street,
                                                homeNumber: client.address.homeNumber
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