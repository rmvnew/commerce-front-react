import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductFormMain, ProductRows } from "./product.register.styled";
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { api } from "../../../hooks/useApi";
import { ProductInterface } from "../../../interfaces/Product.interface";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { inputMoneyChange } from "../../../common/utils";
import { TitleFont } from "../../../common/global.styled";





export const RegisterProducts = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate();


    function setProduct() {

        if (dataResult) {

            const invoice = getLastInvoice(dataResult.invoiceLines)

            setUpdate(true)
            setProductId(dataResult.productId)
            setProductName(dataResult.productName)
            setProductBarcode(dataResult.productBarcode)
            setProductCode(dataResult.productCode)
            setProductNcm(dataResult.productNcm)
            setProductCfop(dataResult.productCfop)
            setProductUnitOfMeasurement(dataResult.productUnitOfMeasurement)

            setProductQuantity(dataResult.productQuantity)
            setProductQuantityInput(`${dataResult.productQuantity}`.replace('.', ','))

            setProductMinimumStock(dataResult.productMinimumStock)
            setProductMinimumStockInput(`${dataResult.productMinimumStock}`.replace('.', ','))

            setProductUnitCost(dataResult.productUnitCost)
            setProductUnitCostInput(`${dataResult.productUnitCost}`.replace('.', ','))

            setProductUnitPrice(dataResult.productUnitPrice)
            setProductUnitPriceInput(`${dataResult.productUnitPrice}`.replace('.', ','))

            setCategoryId(dataResult.categoryId)

            setInvoiceNumber(invoice.invoice.invoiceNumber)

        } else {
            setUpdate(false)
        }

    }


    function getLastInvoice(invoiceLines: any) {
        let invoices: any[] = invoiceLines

        invoices.sort((a, b) => a.invoiceLineId - b.invoiceLineId)
        return invoices[invoices.length - 1]
    }

    useEffect(() => {
        setProduct()
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
            categoryId: Number(categoryId),
            invoiceNumber: invoiceNumber
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
    const [productQuantityInput, setProductQuantityInput] = useState('0');
    const [productMinimumStock, setProductMinimumStock] = useState(0);
    const [productMinimumStockInput, setProductMinimumStockInput] = useState('0');
    const [productUnitCost, setProductUnitCost] = useState(0.0);
    const [productUnitCostInput, setProductUnitCostInput] = useState('0.0');
    const [productUnitPrice, setProductUnitPrice] = useState(0.0);
    const [productUnitPriceInput, setProductUnitPriceInput] = useState('0.0');
    const [categoryId, setCategoryId] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [update, setUpdate] = useState(false)


    const handleButtonClick = () => {
        navigate("/products");
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

        const product = createProduct()

        console.log('Product: ', product);

        api.put(`/product/${productId}`, product)
            .then((res) => {
                navigate('/products')
            }).catch(error => {
                console.log('Update product error: ', error);

                toast.error(
                    error.response.data.message,
                    {

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


    function getCategories() {


        api.get('/category')
            .then(res => {

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


    useEffect(() => {
        if (categories.length > 0) {
            setCategoryId(categories[0].categoryId);
        }
    }, [categories]);



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
                                    value={productQuantityInput}
                                    onChange={(event) => inputMoneyChange(event, setProductQuantity, setProductQuantityInput)}
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
                                    label="Quantidade minima"
                                    variant="outlined"
                                    value={productMinimumStockInput}
                                    onChange={(event) => inputMoneyChange(event, setProductMinimumStock, setProductMinimumStockInput)}
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
                                    label="preço de compra"
                                    variant="outlined"
                                    value={productUnitCostInput}
                                    onChange={(event) => inputMoneyChange(event, setProductUnitCost, setProductUnitCostInput)}
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
                                    value={productUnitPriceInput}
                                    onChange={(event) => inputMoneyChange(event, setProductUnitPrice, setProductUnitPriceInput)}
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
                                    {categories.length > 0 ? (
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={categoryId}
                                            onChange={handleChangeSelect}
                                            label="Categoria"
                                            style={{ height: '100%' }}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                                    {category.categoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </FormControl>

                            </Grid>

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
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                />
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


