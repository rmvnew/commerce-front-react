import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from 'react';
import { BsCheck2All } from "react-icons/bs"
import { ImExit } from "react-icons/im"
import { BrCurrencyFormat } from "../../../utils/currencyBrFormat"
import { CardButtonCommand, CardSaleProductSearchInput, CardSaleProductSearchPagination, CardSaleProductTable, CardSaleProductTabletSelect, CardTitle } from "./sale.product.search.styled"
import { toast } from 'react-toastify';
import { api } from "../../../hooks/useApi";



export const SearchProduct = (props: any) => {

    const setResponse = (res: any) => {

        
        setProducts(res.data.content)
        setPages(res.data.totalPages)
    }

    const handleChange = (e: any, currentPage: any) => {

        setPage(currentPage)

    }


    const [products, setProducts] = useState<any[]>([])
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [showSelect, setShowSelect] = useState(false)
    const [selectValue, setSelectValue] = useState('productName')



    // const getProductByName = async (page: number = 1, name: string = "") => {


    //     await api.get(`/product?page=${page}&limit=8&sort=DESC&orderBy=ID&search=${name}`).then((response) => {
    //         setResponse(response)
    //     });
    // };


    const getProductByFilter = async (search: string, page: number = 0) => {


        const query = `/product?${selectValue}=${search}&page=${page}&size=8`

        console.log('Query: ',query);

        await api.get(query)
            .then(response => {
                console.log('Response: ',response);
                setResponse(response);
            });
    }

    const handleChangeSelect = (event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value as string);
    };

    useEffect(() => {
        if (search === "") {
            console.log('1');
            getProductByFilter(search,page)
        } else {
            console.log('2');
            setPage(0)
            getProductByFilter(search,page)
        }
    }, [search, page])


    const enableSelect = (id: number) => {


        setShowSelect(true)

        setTimeout(() => {

            let currentInput = document.getElementById(`${id}`)
            currentInput?.focus()

        }, 1000)


    }


    const process = (prod: any) => {

        let currentInput = document.getElementById(`${prod.productId}`) as HTMLInputElement
        if (currentInput.value === '') {
            props.process(prod, 1)
            toast.warn('Quantidade não identificada! Valor 1 adicionado a quantidade')
        } else {
            props.process(prod, currentInput.value)
        }


    }

    const setColorChooise = (index: number) => {


        const tr = document.getElementById(`${index}`) as HTMLTableRowElement
        tr.style.backgroundColor = '#ffc106ff'

    }

    return (
        <>
            <div>
                <CardTitle>
                    <h1>Pesquisar Produtos</h1>
                </CardTitle>
                <CardButtonCommand>
                    <button className="btn btn-danger" onClick={() => props.exit()}><ImExit /> Sair</button>
                </CardButtonCommand>


                <div>


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


                    <CardSaleProductSearchInput>
                        <input type="text"
                            placeholder="Pesquisar produto"
                            className="form-control form-control"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </CardSaleProductSearchInput>

                </div>

                <div>
                    <CardSaleProductTable>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Nome</td>
                                <td>Localização</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                {showSelect && <td>Selecionar</td>}
                            </tr>
                        </thead>
                        <tbody>

                            {products.map((prod, i) => (

                                <tr id={`${i}`} key={prod.productId} onClick={() => {
                                    enableSelect(prod.productId)
                                    setColorChooise(i)
                                }}>
                                    <td>{prod.productId}</td>
                                    <td>{prod.productName}</td>
                                    <td>{prod.productLocation}</td>
                                    <td>{prod.productQuantity}</td>
                                    <td>{BrCurrencyFormat(prod.productUnitPrice)}</td>
                                    {showSelect && <td>
                                        <CardSaleProductTabletSelect>
                                            <input type="text"
                                                id={prod.productId}
                                            />
                                            <button className="btn btn-primary" onClick={() => process(prod)}><BsCheck2All /></button>
                                        </CardSaleProductTabletSelect>
                                    </td>}

                                </tr>

                            ))}

                        </tbody>
                    </CardSaleProductTable>
                </div>



            </div>
            <CardSaleProductSearchPagination>
                <Pagination count={pages} color="primary" onChange={handleChange}></Pagination>
            </CardSaleProductSearchPagination>
        </>
    )

}