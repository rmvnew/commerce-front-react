import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';





export const RegisterProducts = () => {

    const onSubmit = (event: any) => {
        event.preventDefault()
       
    }

    const [productName, setProductName] = useState("");
    const [productBarcode, setProductBarcode] = useState("");
    const [productCode, setProductCode] = useState("");
    const [productNcm, setProductNcm] = useState("");
    const [productCfop, setProductCfop] = useState("");
    const [productUnitOfMeasurement, setProductUnitOfMeasurement] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productMinimumStock, setProductMinimumStock] = useState(0);
    const [productUnitCost, setProductUnitCost] = useState(0.0);
    const [productUnitPrice, setProductUnitPrice] = useState(0.0);
    const [categoryId, setCategoryId] = useState(null);

    return (
        <div className="">

            <form action="" onSubmit={onSubmit}>

                <div>
                    <input type="text" name="productName" placeholder="Product Name" />
                    <input type="text" name="productBarcode" placeholder="Product Barcode" />
                    <input type="text" name="productCode" placeholder="Product Code" />
                    <input type="text" name="productNcm" placeholder="Product Ncm" />
                </div>

                <div>
                    <input type="text" name="productCfop" placeholder="Product Cfop" />
                    <input type="text" name="productUnitOfMeasurement" placeholder="Product Unit Of Measurement" />
                    <input type="number" name="productQuantity" placeholder="Product Quantity" />
                    <input type="number" name="productMinimumStock" placeholder="Product Minimum Stock" />
                </div>

                <div>
                    <input type="number" name="productUnitCost" placeholder="Product Unit Cost" />
                    <input type="number" name="productUnitPrice" placeholder="Product Unit Price" />
                    <select name="categoryId">
                        <option value="1">Alimentos</option>
                        <option value="2">Eletrodomésticos</option>
                        <option value="3">Eletrônicos</option>
                    </select>
                </div>

                <button>teste</button>
            </form>

        </div>
    )
}
