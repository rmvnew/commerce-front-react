import { NavLink } from "react-router-dom"
import { BoxInput,  ProductContainer, TableProduct } from "./product.list.styled"
import { TitleFont } from "../register/product.register.styled"
import ConfirmationModal from "../../../components/modal/ConfirmationModal"
import { Fab, FormControl,  InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material"
import { RiDeleteBinFill } from "react-icons/ri"
import { ImPencil2 } from "react-icons/im"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react"
import { api } from "../../../hooks/useApi"
import { format, parseISO } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { ImageNotFound } from "../../../common/imageNotFound/imageNotfound"
import { CardTableActions, DesactiveTableButton, PaginationCard, TableButtonNavLink } from "../../../common/global.styled"






export const Products = () => {



    const [products, setProducts] = useState<any[]>([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [clientIdToChangeStatus, setClientIdToChangeStatus] = useState<number | null>(null); // New state
    const [selectValue, setSelectValue] = useState('productName')
    const [haveData, setHaveData] = useState(false)

    const setResponse = (res: any) => {


        console.log('Res: ',res.data.content);

        setProducts(res.data.content)
        setPages(res.data.totalPages)
    }

    const handleChange = (e: any, currentPage: any) => {
        const numberPage = currentPage - 1
        setPage(numberPage)
    }

    const getProduct = async (page: number = 0) => {
        await api.get(`/product?page=${page}&size=8`)
            .then(response => {
                setResponse(response);
            });
    }

    // const getClientByFilter = async (search: string, page: number = 0) => {


    //     const query = `/client?${selectValue}=${search}&page=${page}&size=8`

    //     console.log('Query: ',query);

    //     await api.get(query)
    //         .then(response => {
    //             setResponse(response);
    //         });
    // }

    const changeStatus = async (id: number) => {
        await api.patch(`/product/${id}`)
            .then(res => {
                getProduct()
            })
    }

    useEffect(() => {
        getProduct(page)
    }, [page]);

    useEffect(()=>{

        if(products.length > 0){
            setHaveData(true)
        }else{
            setHaveData(false)
        }
    },[products])


    // useEffect(() => {
    //     getClientByFilter(search)
    // }, [search]);

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



    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value as string);
    };

    return (

        <ProductContainer>


            <TitleFont>Lista de Produtos</TitleFont>

            <NavLink to={'/products/register'}>
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
                            width:'70px',
                            height:'70px'
                        }}>
                        <AddIcon />
                    </Fab>

                </Tooltip>
            </NavLink>

            {!haveData && <div>
                <ImageNotFound message="Nenhum produto encontrado"/>
                
            </div>}

            {haveData && <div>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirmação de deleção"
                    message="Tem certeza de que deseja desativar este cliente?"
                />
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
                                <MenuItem value="productName">
                                    <em>Nome</em>
                                </MenuItem>
                                <MenuItem value={'productBarcode'}>Código de barras</MenuItem>
                                <MenuItem value={'productCode'}>Código do produto</MenuItem>
                                <MenuItem value={'productNcm'}>Código ncm</MenuItem>


                            </Select>
                        </FormControl>
                       



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

                <TableProduct >
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Código de barras</td>
                            <td>Quantidade</td>
                            <td>Data Cadastro</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId} >
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productBarcode}</td>
                                <td>{product.productQuantity}</td>

                                <td>{formatDate(product.createAt)}</td>
                                <td>
                                    <CardTableActions>
                                        <TableButtonNavLink to={"/products/register"} state={{
                                
                                            data: {
                                                productId: product.productId,
                                                productName: product.productName,
                                                productBarcode: product.productBarcode,
                                                productCode: product.productCode,
                                                productNcm: product.productNcm,
                                                productCfop: product.productCfop,
                                                productUnitOfMeasurement: product.productUnitOfMeasurement,
                                                productQuantity: product.productQuantity,
                                                productMinimumStock: product.productMinimumStock,
                                                productUnitCost: product.productUnitCost,
                                                productUnitPrice: product.productUnitPrice,
                                                categoryId: product.category.categoryId,

                                            }
                                        }} className="btn btn-warning"><ImPencil2 /></TableButtonNavLink>
                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                            onClick={() => openModal(product.productId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </TableProduct>

                <PaginationCard>
                    <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
                </PaginationCard>
            </div>}

        </ProductContainer>

    )
}