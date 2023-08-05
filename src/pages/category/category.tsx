import { NavLink } from "react-router-dom"
import { BoxInput, CardSearch, CardTableActions, DefaultTable, DesactiveTableButton, PaginationCard, TableButtonNavLink, TitleFont } from "../../common/global.styled"
import { CategoryContainer, CategoryTable } from "./category.styled"
import { ImageNotFound } from "../../common/imageNotFound/imageNotfound"
import { useEffect, useState } from "react"
import ConfirmationModal from "../../components/modal/ConfirmationModal"
import { Box, Button, TextField } from "@mui/material"
import { RiDeleteBinFill } from "react-icons/ri"
import { ImPencil2 } from "react-icons/im"
import { api } from "../../hooks/useApi"
import { GiSave } from "react-icons/gi"
import { AiOutlineClear } from "react-icons/ai"


interface CategoryInterface {
    categoryId: number,
    categoryName: string
}


export const Category = () => {


    const [categories, setCategories] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState('')
    const [haveData, setHaveData] = useState(false)

    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null); // New state
    const [category, setCategory] = useState({})
    const [update, setUpdate] = useState(false)
    const [categoryId,setCategoryId] = useState(0)


    const clearCategory = () => {
        setUpdate(false)
        setCategoryName('')
        setSearch('')
    }

    const setUpdateCategory = (category: CategoryInterface) => {

        console.log(category);
        setUpdate(true)
        setCategory(category)
        setCategoryName(category.categoryName)
        setCategoryId(category.categoryId)

    }

    const setResponse = (res: any) => {

        // console.log('Res: ', res);
        // console.log('Res: ', res.data);


        setCategories(res.data)
        // setPages(res.data.totalPages)
    }



    const openModal = (id: number) => {
        setCategoryToDelete(id);
        setModalOpen(true);
    };

    const getCategories = async () => {
        await api.get(`/category/all?name=${search}`)
            .then(response => {
                setResponse(response);
            });
    }

    const deleteCategory = async (id: number) => {
        await api.delete(`/category/${id}`)
            .then(res => {
                getCategories()
            })
    }

    useEffect(() => {
        getCategories()
    }, [search])

    useEffect(() => {

        if (categories.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }

    }, [categories]);


    const handleConfirm = async () => {
        if (categoryToDelete) {
            await deleteCategory(categoryToDelete);
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
                setCategoryName('')

            }).catch(error => {
                console.log('Error: ', error);
            })

    }


    const updateCategory = async () => {

        await api.put(`/category/${categoryId}`, { categoryName: categoryName })
            .then(response => {

                getCategories()
                setCategoryName('')

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

                    {!update && <Button
                        variant="contained"
                        onClick={saveCategory}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            fontWeight:'bold'
                        }}
                    >
                        <GiSave />
                        Salvar
                    </Button>}

                    {update && <Button
                        variant="contained"
                        onClick={updateCategory}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            background: 'grey',
                            fontWeight:'bold'
                        }}
                    >
                        <GiSave />
                        Atualizar
                    </Button>}

                    <Button
                        variant="contained"
                        onClick={clearCategory}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            fontWeight:'bold'
                        }}
                    >
                        <AiOutlineClear />  Limpar
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
                    message="Tem certeza de que deseja deletar a categoria?"
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

                <CategoryTable >
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
                            <tr key={category.categoryId}
                                onClick={() => setUpdateCategory(category)}>
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
                </CategoryTable>

                {/* <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard> */}


            </div>}


        </CategoryContainer>
    )
}