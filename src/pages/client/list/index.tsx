import {
    BoxInput, ClientContainer,


} from "./client.list.styled";
import { api } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import { ImPencil2 } from 'react-icons/im';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Fab, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ConfirmationModal from "../../../components/modal/ConfirmationModal";
import { NavLink, useNavigate } from "react-router-dom";
import { parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import { ImageNotFound } from "../../../common/imageNotFound/imageNotfound";
import { CardSearch, CardTableActions, DefaultTable, DesactiveTableButton, PaginationCard, TableButtonNavLink, TitleFont } from "../../../common/global.styled";
import { toast } from "react-toastify";




export const ClientList = () => {

    const navigate = useNavigate()

    const [clients, setClients] = useState<any[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [clientIdToChangeStatus, setClientIdToChangeStatus] = useState<number | null>(null); // New state
    const [selectValue, setSelectValue] = useState('clientName')
    const [haveData, setHaveData] = useState(true)

    const setResponse = (res: any) => {

        // console.log('Res: ',res);


        setClients(res.data.content)
        setPages(res.data.totalPages)


    }

    const handleChange = (e: any, currentPage: any) => {
        const numberPage = currentPage - 1
        setPage(numberPage)
    }

    // const getClient = async (page: number = 0) => {
    //     await api.get(`/client?page=${page}&size=8`)
    //         .then(response => {
    //             setResponse(response);
    //         });
    // }

    const getClientByFilter = async (search: string = '', page: number = 0) => {

        try {

            const query = `/client?${selectValue}=${search}&page=${page}&size=8`

            await api.get(query)
                .then(response => {
                    setResponse(response);
                });

        } catch (error: any) {

            toast.error(`Error: ${error.message}`, {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            navigate('/login')

        }
    }

    const changeStatus = async (id: number) => {
        try {
            await api.patch(`/client/${id}`)
                .then(res => {
                    getClientByFilter()
                })
        } catch (error: any) {

            toast.error(`Error: ${error.message}`, {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

            navigate('/login')

        }
    }

    // useEffect(() => {
    //     getClient(page)
    // }, [page]);

    useEffect(() => {

        if (clients.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }

    }, [clients]);


    useEffect(() => {
        getClientByFilter(search)
    }, [search]);

    const openModal = (id: number) => {
        setClientIdToChangeStatus(id);
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (clientIdToChangeStatus) {
            await changeStatus(clientIdToChangeStatus);
        }
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };


    function formatDate(dateString: string) {
        const date = parseISO(dateString);


        const timeZone = 'America/Manaus';
        const zonedDate = utcToZonedTime(date, timeZone);

        return format(zonedDate, 'dd/MM/yyyy HH:mm:ss'); // Formata a data
    }

    function formatCpf(value: string) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    function formatCnpj(value: string) {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value as string);
    };


    return (
        <ClientContainer>
            <TitleFont>Lista de Clientes</TitleFont>

            <NavLink to={'/client/register'}>
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

                <ImageNotFound message="Nenhum Cliente encontrado" />

            </div>}

            {haveData && <div>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirmação de deleção"
                    message="Tem certeza de que deseja desativar este cliente?"
                />
                <CardSearch>


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

                            id="outlined-basic"
                            label="Pesquisar"
                            variant="outlined"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                    border: 'none',
                                    height: '10px'

                                }
                            }}
                        />
                    </BoxInput>

                </CardSearch>

                <DefaultTable >
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
                        {clients.map((client) => (
                            // <tr key={client.clientId} className={classes.tableRow}>
                            <tr key={client.clientId} >
                                <td>{client.clientId}</td>
                                <td>{client.clientName}</td>
                                <td>{client.company ? formatCnpj(client.clientCnpj ? client.clientCnpj : '00000000000000') : ''}</td>
                                <td>{client.company ? '' : formatCpf(client.clientCpf ? client.clientCpf : '00000000000')}</td>
                                <td>{client.clientEmail}</td>

                                <td>{formatDate(client.createAt)}</td>
                                <td>
                                    {client.clientId !== 1 && <CardTableActions>
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
                                                zipcode: client.address && client.address.zipcode ? client.address.zipcode : '',
                                                state: client.address && client.address.state ? client.address.state : '',
                                                city: client.address && client.address.city ? client.address.city : '',
                                                district: client.address && client.address.district ? client.address.district : '',
                                                street: client.address && client.address.street ? client.address.street : '',
                                                homeNumber: client.address && client.address.homeNumber ? client.address.homeNumber : ''
                                            }
                                        }} className="btn btn-warning"><ImPencil2 /></TableButtonNavLink>
                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                            onClick={() => openModal(client.clientId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DefaultTable>

                <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard>


            </div>}


        </ClientContainer>
    );
}
