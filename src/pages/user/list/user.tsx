import { useEffect, useState } from "react";
import { api } from "../../../hooks/useApi";
import { Fab, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import { BoxInput, CardSearch, CardTableActions, DefaultTable, DesactiveTableButton, GlobalContainer, PaginationCard, TableButtonNavLink, TitleFont } from "../../../common/global.styled";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { ImageNotFound } from "../../../common/imageNotFound/imageNotfound";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { ImPencil2 } from "react-icons/im";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";







export const User = () => {


    const navigate = useNavigate();


    const [users, setUsers] = useState<any[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [userIdToChangeStatus, setUserIdToChangeStatus] = useState<number | null>(null); // New state
    const [selectValue, setSelectValue] = useState('userCompleteName')
    const [haveData, setHaveData] = useState(true)
    const [size, setSize] = useState(window.innerWidth < 1920 ? 6 : 8);

    const setResponse = (res: any) => {

        setUsers(res.data.content)
        setPages(res.data.totalPages)
    }

    const handleChange = (e: any, currentPage: any) => {
        const numberPage = currentPage - 1
        setPage(numberPage)
    }

    const getProduct = async (page: number = 0) => {
        await api.get(`/users/all?page=${page}&size=${size}`)
            .then(response => {
                setResponse(response);
            }).catch(error => {
                if (error.response.status === 403) {
                    toast.error('Você não tem permissão para acessar usuários!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    navigate('/error')
                }
            })
    }

    const getClientByFilter = async (search: string, page: number = 0) => {


        const query = `/users/all?${selectValue}=${search}&page=${page}&size=${size}`

        await api.get(query)
            .then(response => {
                setResponse(response);
            }).catch(error => {
                if (error.response.status === 403) {
                    toast.error('Você não tem permissão para acessar usuários!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    navigate('/error')
                }
            })
    }

    const changeStatus = async (id: number) => {
        await api.patch(`/users/change-status/${id}`)
            .then(res => {
                getProduct()
            }).catch(error => {
                console.log('Error',error);
            })
    }

    useEffect(() => {
        getProduct(page)
    }, [page]);

    useEffect(() => {

        if (users.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }
    }, [users])


    useEffect(() => {
        getClientByFilter(search)
    }, [search]);

    const openModal = (id: number) => {
        setUserIdToChangeStatus(id);
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        
        if (userIdToChangeStatus) {
            await changeStatus(userIdToChangeStatus);
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

        return format(zonedDate, 'dd/MM/yyyy HH:mm:ss');
    }




    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value as string);
    };


    return (

        <GlobalContainer>


            <TitleFont>Lista de Usuarios</TitleFont>

            <NavLink to={'/user/register'}>
                <Tooltip
                    title="Adicionar produto"
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
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirmação de deleção"
                    message="Tem certeza de que deseja desativar este produto?"
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
                                <MenuItem value="userCompleteName">
                                    <em>Nome</em>
                                </MenuItem>
                                

                            </Select>
                        </FormControl>




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
                            <td>Email</td>
                            <td>Data Cadastro</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId} >
                                <td>{user.userId}</td>
                                <td>{user.userCompleteName}</td>
                                <td>{user.userEmail}</td>
                                <td>{formatDate(user.createAt)}</td>
                                <td>
                                    <CardTableActions>
                                        <TableButtonNavLink to={"/user/register"} state={{

                                            data: {
                                                userId: user.userId,
                                                userCompleteName: user.userCompleteName,
                                                userEnrollment: user.userEnrollment,
                                                userEmail: user.userEmail,
                                                createAt: user.createAt,
                                                profile: user.profile,
                                                active: user.active,

                                            }
                                        }} className="btn btn-warning"><ImPencil2 /></TableButtonNavLink>
                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                            onClick={() => openModal(user.userId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DefaultTable>

                <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard>
            </div>}

        </GlobalContainer>
    )
}