import { NavLink } from "react-router-dom"
import { BoxInput, CardSearch, CardTableActions, DefaultTable, DesactiveTableButton, PaginationCard, TableButtonNavLink, TitleFont } from "../../common/global.styled"
import { CategoryContainer } from "./category.styled"
import { ImageNotFound } from "../../common/imageNotFound/imageNotfound"
import { useEffect, useState } from "react"
import ConfirmationModal from "../../components/modal/ConfirmationModal"
import { Box, Button, TextField } from "@mui/material"
import { RiDeleteBinFill } from "react-icons/ri"
import { ImPencil2 } from "react-icons/im"
import { api } from "../../hooks/useApi"




export const Category = () => {


    const [categories, setCategories] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState('')
    const [haveData, setHaveData] = useState(false)
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [clientIdToChangeStatus, setClientIdToChangeStatus] = useState<number | null>(null); // New state

    const setResponse = (res: any) => {

        // console.log('Res: ', res);
        // console.log('Res: ', res.data);


        setCategories(res.data)
        // setPages(res.data.totalPages)
    }

    const handleChange = (e: any, currentPage: any) => {
        const numberPage = currentPage - 1
        setPage(numberPage)
    }

    const openModal = (id: number) => {
        setClientIdToChangeStatus(id);
        setModalOpen(true);
    };

    const getCategories = async () => {
        await api.get(`/category/all`)
            .then(response => {
                setResponse(response);
            });
    }

    const changeStatus = async (id: number) => {
        // await api.patch(`/client/${id}`)
        //     .then(res => {
        //         getClient()
        //     })
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {

        if (categories.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }

    }, [categories]);


    const handleConfirm = async () => {
        if (clientIdToChangeStatus) {
            await changeStatus(clientIdToChangeStatus);
        }
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };


    const saveCategory = async () => {

        await api.post(`/category`, { categoryName: categoryName })
            .then(response => {

                getCategories()

            }).catch(error => {
                console.log('Error: ', error);
            })

    }

    return (
        <CategoryContainer>

            <TitleFont>Gerenciar Categorias</TitleFont>

            <CardSearch>
                <BoxInput style={{ display: 'flex', alignItems: 'center' }}>

                    <TextField

                        id="outlined-basic"
                        label="Cadastrar nova Categoria"
                        variant="outlined"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'center',
                                border: 'none',
                                height: '10px'

                            }
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={saveCategory}
                        style={{
                            marginLeft: '20px',
                            height: '40px'
                        }}
                    >
                        Salvar
                    </Button>
                </BoxInput>


            </CardSearch>
            <br />


            {!haveData && <div>

                <ImageNotFound message="Nenhuma Categoria encontrada" />

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
                                    height: '10px',

                                }
                            }}
                        />
                    </BoxInput>

                </CardSearch>
                <br />

                <DefaultTable >
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>

                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            // <tr key={client.clientId} className={classes.tableRow}>
                            <tr key={category.categoryId} >
                                <td>{category.categoryId}</td>
                                <td>{category.categoryName}</td>




                                <td>
                                    <CardTableActions>

                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                            onClick={() => openModal(category.categoryId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DefaultTable>

                {/* <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard> */}


            </div>}


        </CategoryContainer>
    )
}