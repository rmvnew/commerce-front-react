import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductFormMain, ProductRows, TitleFont } from "./product.register.styled";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { api } from "../../../hooks/useApi";
import { ProductInterface } from "../../../interfaces/Product.interface";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"





export const RegisterProducts = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate();


    function setClient() {


        setUpdate(dataResult === undefined ? false : true)
        setProductId(dataResult === undefined ? '' : dataResult.productId)
        setProductName(dataResult === undefined ? '' : dataResult.productName)
        setProductBarcode(dataResult === undefined ? '' : dataResult.productBarcode)
        setProductCode(dataResult === undefined ? '' : dataResult.productCode)
        setProductNcm(dataResult === undefined ? '' : dataResult.productNcm)
        setProductCfop(dataResult === undefined ? '' : dataResult.productCfop)
        setProductUnitOfMeasurement(dataResult === undefined ? '' : dataResult.productUnitOfMeasurement)
        setProductQuantity(dataResult === undefined ? '' : dataResult.productQuantity)
        setProductMinimumStock(dataResult === undefined ? '' : dataResult.productMinimumStock)
        setProductUnitCost(dataResult === undefined ? '' : dataResult.productUnitCost)
        setProductUnitPrice(dataResult === undefined ? '' : dataResult.productUnitPrice)


    }

    useEffect(() => {
        setClient()
    }, [])



    function createProduct() {


        const product: ProductInterface = {
            productName: productName,
            productBarcode: productBarcode,
            productLocation: productLocation,
            productCode: productCode,
            productNcm: productNcm,
            productCfop: productCfop,
            productUnitOfMeasurement: productUnitOfMeasurement,
            productQuantity: productQuantity,
            productMinimumStock: productMinimumStock,
            productUnitCost: productUnitCost,
            productUnitPrice: productUnitPrice,
            categoryId: categoryId
        }

        return product

    }

    const onSubmit = (event: any) => {
        event.preventDefault()

    }


    const [productId, setProductId] = useState(0)
    const [categories, setCategories] = useState<any[]>([]);
    const [productName, setProductName] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [productLocation, setProductLocation] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productNcm, setProductNcm] = useState("");
    const [productCfop, setProductCfop] = useState("");
    const [productUnitOfMeasurement, setProductUnitOfMeasurement] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productMinimumStock, setProductMinimumStock] = useState(0);
    const [productUnitCost, setProductUnitCost] = useState(0.0);
    const [productUnitPrice, setProductUnitPrice] = useState(0.0);
    const [categoryId, setCategoryId] = useState(0);
    const [update, setUpdate] = useState(false)


    const handleButtonClick = () => {
        navigate("/products");  // altere "/pagina-desejada" para o caminho desejado
    };

    const allFieldsFilled = () => {
        return (

            productName !== "" &&
            productBarcode !== "" &&
            productCode !== "" &&
            productUnitOfMeasurement !== "" &&
            productQuantity !== 0 &&
            productMinimumStock !== 0 &&
            productUnitPrice !== 0

        );
    }


    function saveProduct() {

        const product = createProduct()

        console.log('Product: ', product);

        api.post("/product", product)
            .then((res) => {
                navigate('/products')
            }).catch(error => {
                console.log('Create product error: ', error);
                // console.log(error.response);
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

    function updateProduct() {

    }


    function getCategories() {


        api.get('/category')
            .then(res => {
                console.log('Res: ', res.data.content);
                setCategories(res.data.content)
            }).catch(error => {
                console.log(error);
            })


    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleChangeSelect = (event: SelectChangeEvent<any>) => {
        setCategoryId(event.target.value);
    };




    return (
        <>

            <ProductFormMain >
                {!update && <TitleFont>Cadastrar Produto</TitleFont>}
                {update && <TitleFont>Atualizar Produto</TitleFont>}

                <form action="" onSubmit={onSubmit}>


                    <ProductRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Nome do Produto"
                                    variant="outlined"
                                    value={productName}
                                    onChange={(event) => setProductName(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem',
                                            

                                        }
                                    }}
                                />
                                    
                            </Grid>




                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Código de barras"
                                    variant="outlined"
                                    value={productBarcode}
                                    onChange={(event) => setProductBarcode(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Localização"
                                    variant="outlined"
                                    value={productLocation}
                                    onChange={(event) => setProductLocation(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </ProductRows>




                    <ProductRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Código"
                                    variant="outlined"
                                    value={productCode}
                                    onChange={(event) => setProductCode(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Código Ncm"
                                    variant="outlined"
                                    value={productNcm}
                                    onChange={(event) => setProductNcm(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>



                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Código Cfop"
                                    variant="outlined"
                                    value={productCfop}
                                    onChange={(event) => setProductCfop(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Unidade"
                                    variant="outlined"
                                    value={productUnitOfMeasurement}
                                    onChange={(event) => setProductUnitOfMeasurement(event.target.value)}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Quantidade"
                                    variant="outlined"
                                    value={productQuantity}
                                    onChange={(event) => setProductQuantity(Number(event.target.value))}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                        </Grid>

                    </ProductRows>



                    <ProductRows>

                        <Grid container spacing={4}>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Quantidade minima"
                                    variant="outlined"
                                    value={productMinimumStock}
                                    onChange={(event) => setProductMinimumStock(Number(event.target.value))}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="preço de compra"
                                    variant="outlined"
                                    value={productUnitCost}
                                    onChange={(event) => setProductUnitCost(Number(event.target.value))}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="preço de venda"
                                    variant="outlined"
                                    value={productUnitPrice}
                                    onChange={(event) => setProductUnitPrice(Number(event.target.value))}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>

                                <FormControl variant="outlined" style={{ width: '100%', height: '100%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={categoryId}
                                        onChange={handleChangeSelect}
                                        label="Categoria"
                                        style={{
                                            height: '100%',

                                        }}
                                    >

                                        {categories.map(category => (
                                            <MenuItem value={category.categoryId}>{category.categoryName}</MenuItem>
                                        ))}



                                    </Select>
                                </FormControl>

                            </Grid>

                        </Grid>

                    </ProductRows>

                    <ProductRows>

                        {update && <Button
                            variant="contained"
                            style={{
                                fontSize: '1.2rem',
                                width: '300px',
                                background: 'grey',
                                fontFamily: 'Black Han Sans'

                            }}
                            disabled={!allFieldsFilled()}
                            onClick={updateProduct}
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
                            onClick={saveProduct}
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

                    </ProductRows>




                </form>

            </ProductFormMain>


        </>
    )
}
