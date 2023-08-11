import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GiReceiveMoney, GiSellCard } from 'react-icons/gi';
import { MdOutlineMoneyOffCsred } from 'react-icons/md';
import { ModalDefault } from '../../components/Modal';
import { api } from '../../hooks/useApi';
import { BrCurrencyFormat } from '../../utils/currencyBrFormat';
import {
    SaleMain,
    SaleTop,
    SaleBody1,
    SaleBody2,
    SaleFooter,
    SaleTableTheadTr,
    SaleTableTBodyTr,
    SaleTableTBodyTd,
    SaleTable,
    SaleTableTheadTd,
    SaleCardTable,
    CardBody1,
    CardSellResult,
    ImputProductProcessSearch,
    CardBody2,
    ImputProductProcessLastNumber,
    ImputProductProcessLastName,
    CardBody2b,
    LabelTytleLastInput,
    CardButtonCommandServiceOrder,
    CardBody3,
    SaleTitle,
    SaleLogo,
    SaleTitleCard
} from './SaleStyled';
import { SearchProduct } from './search/sale.product.search';
import { Modal, Select } from 'antd';
import cart from '../../common/assets/cart.png'
import { RemoveItemModal } from '../../components/modal/SimpleModal';


interface SaleInterface {
    item: number,
    id: number,
    name: string,
    quantity: number,
    price: number,
    value: number
}


export const Sale = () => {


    const getProductByBarcode = async (page: number = 0, name: string = "") => {

        await api.get(`/product?productBarcode=${name}`)
            .then((res) => {

                const [product] = res.data.content

                setProduct(product)

                setTimeout(() => {
                    setDetectEnter(!detectEnter)
                }, 1000)


            });
    };

    const clear = () => {
        setSumPercent(false)
        setTotalValue(0)
        setItemQuantity(1)
        setChosenItem(null)
        setTotalValue(0)
        setDiscount(0)
        setSumPercent(false)
        setItemsInProcess([])
        localStorage.removeItem('currentSale')

    }

    const options = ['0', '2', '5', '7', '10', '12']

    const nameInputRef = useRef<HTMLInputElement>(null)

    const setFinalList = () => {

        let currentList: any = []

        for (let item of itemsInProcess) {
            for (let x = 1; x <= item.productQuantity; x++) {
                currentList.push(item)
            }
        }

        setFinalItemList(currentList)

    }

    const [product, setProduct] = useState<any>({})
    // const [prod, setProd] = useState<any>(null)
    const [search, setSearch] = useState("")
    const [itemsInProcess, setItemsInProcess] = useState<any[]>([])
    const [finalItemList, setFinalItemList] = useState<any[]>([])
    const [totalValue, setTotalValue] = useState(0)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [chosenItem, setChosenItem] = useState<any>(null!)
    const [showModalSearch, setShowModalSearch] = useState(false)
    const [detectEnter, setDetectEnter] = useState(false)
    const [finalTotalValue, setFinalTotalvalue] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountValue, setDiscountValue] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [sumPercent, setSumPercent] = useState(false)
    const [showPercent, setShowPercent] = useState(false)

    const [removeItemModalVisible, setRemoveItemModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false)
        setSumPercent(!sumPercent)
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };

    const exit = () => {
        setShowModalSearch(false)
    }

    const handleChange = (value: string) => {
        // console.log(`selected ${value}`);
        setDiscount(Number(value))
    };

    const onKeyChange = (event: any) => {

        let quantity = 0
        let barcode = ''

        if (event.key === 'Enter') {

            const index = search.indexOf('x')

            if (index !== -1) {

                quantity = Number(search.substring(0, index))
                barcode = search.substring(index + 1)
                getProductByBarcode(0, barcode)
                setItemQuantity(quantity)

            } else {

                quantity = 1
                barcode = search
                getProductByBarcode(0, search)
                setItemQuantity(1)

            }

        }

    }




    useEffect(() => {

        if (product.productName !== undefined) {

            setChooiceByBarcode(product)

        }

    }, [detectEnter])

    useEffect(() => {

        const currentPercent = discount / 100
        const discountValue = totalValue * currentPercent
        const result = totalValue - discountValue
        setDiscountValue(discountValue)
        setFinalTotalvalue(result)

        if (discount > 0) {
            setShowPercent(true)
        } else {
            setShowPercent(false)
        }

    }, [totalValue, sumPercent])

    const process = (prod: any) => {

        console.log('1 Itens: ', itemsInProcess);

        setSearch('')
        const currentItems = [...itemsInProcess, prod]

        localStorage.setItem('currentSale', JSON.stringify(currentItems))
        setItemsInProcess(currentItems)



    }

    useEffect(() => {
        setTimeout(() => {
            const rawData = localStorage.getItem('currentSale');

            if (rawData !== null) {
                try {
                    const currentSale = JSON.parse(rawData);

                    if (currentSale) {
                        setItemsInProcess(currentSale);
                        // itemsInProcess.forEach(prod => setProd(prod))
                    }
                } catch (error) {
                    console.error("Erro ao interpretar 'currentSale' como JSON:", error);
                }
            }
        }, 1000)
    }, []);


    useEffect(() => {

        setTimeout(() => {

            console.log('2 Itens: ', itemsInProcess);

            for (let item of itemsInProcess) {
                sumProducts()
                setItemQuantity(1)
                nameInputRef.current?.focus()
                setChosenItem(item)
                setShowModalSearch(false)

            }

        }, 1000)

    }, [itemsInProcess])

    const setChooiceByName = (prod: any, quantity: number = 1) => {

        prod.productQuantity = quantity

        process(prod)

    }

    const setChooiceByBarcode = (prod: any) => {

        // console.log('Prod',prod);

        prod.productQuantity = itemQuantity
        process(prod)

    }

    const sumProducts = async () => {


        let value = 0

        const result = await itemsInProcess.reduce((a: any, b: any) => a + (b.productUnitPrice * b.productQuantity), 0)

        value += result


        setTotalValue(value)



    }


    // console.log('Local: ',localStorage.getItem('currentSale'));


    const showItemSelected = (index: number) => {
        const item = itemsInProcess[index];
        setSelectedItem(item);
        setRemoveItemModalVisible(true);
    };

    const confirmRemoveItem = (item: any) => {
        // Filtrando os itens
        const filteredItems = itemsInProcess.filter(i => i.productId !== item.productId);
        
        // Atualizando o localStorage
        localStorage.setItem('currentSale', JSON.stringify(filteredItems));
        
        // Atualizando o estado
        setItemsInProcess(filteredItems);
        setRemoveItemModalVisible(false);
    };
    





    return (
        <>

            <RemoveItemModal
                visible={removeItemModalVisible}
                item={selectedItem}
                onClose={() => setRemoveItemModalVisible(false)}
                onConfirm={confirmRemoveItem}
            />

            <SaleMain>

                <SaleTop>

                    <SaleTitleCard>

                        <SaleLogo src={cart} />

                        <SaleTitle>Venda de produtos</SaleTitle>

                    </SaleTitleCard>

                </SaleTop>

                <SaleBody1>

                    <CardBody1 className="row">
                        <>


                            <div className="col-12">
                                <label>Busca</label>
                                <ImputProductProcessSearch type="text"
                                    ref={nameInputRef}
                                    className="form-control form-control"
                                    placeholder='Busca de produto'
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyDown={e => onKeyChange(e)}
                                />



                            </div>



                        </>


                    </CardBody1>

                    <CardBody2 className="row">


                        <LabelTytleLastInput>Ultimo Lancamento</LabelTytleLastInput>
                        <CardBody2b>
                            <div className="col-2">
                                <label>ID</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? chosenItem.productId : ''}
                                />
                            </div>

                            <div className="col-5">
                                <label>Nome</label>
                                <ImputProductProcessLastName type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? chosenItem.productName : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Qtde</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? chosenItem.productQuantity : ''}
                                />
                            </div>

                            <div className="col-2">
                                <label>Valor</label>
                                <ImputProductProcessLastNumber type="text"
                                    className="form-control form-control"
                                    defaultValue={chosenItem != null ? BrCurrencyFormat(chosenItem.productUnitPrice) : ''}
                                />
                            </div>
                        </CardBody2b>

                    </CardBody2>

                    <CardBody3>
                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning' onClick={() => setShowModalSearch(true)}><BsSearch /> Pesquisar Produto</button>
                            <button className='btn btn-warning' onClick={() => showModal()}><MdOutlineMoneyOffCsred /> Desconto</button>
                        </CardButtonCommandServiceOrder>

                        <CardButtonCommandServiceOrder className="row">
                            <button className='btn btn-warning' onClick={() => clear()} ><GiSellCard /> Nova Venda</button>
                            <button className='btn btn-warning' onClick={() => setFinalList()}><GiReceiveMoney /> Pagar</button>
                        </CardButtonCommandServiceOrder>
                    </CardBody3>


                </SaleBody1>

                <SaleBody2>



                    <SaleCardTable>
                        <SaleTable  >
                            <thead>
                                <SaleTableTheadTr>
                                    <SaleTableTheadTd>item</SaleTableTheadTd>
                                    <SaleTableTheadTd>Id</SaleTableTheadTd>
                                    <SaleTableTheadTd>Nome</SaleTableTheadTd>
                                    <SaleTableTheadTd>Qtde</SaleTableTheadTd>
                                    <SaleTableTheadTd>Preço</SaleTableTheadTd>
                                    <SaleTableTheadTd>Sub total</SaleTableTheadTd>
                                </SaleTableTheadTr>
                            </thead>
                            <tbody>
                                {itemsInProcess.map((prod, i) => (
                                    <SaleTableTBodyTr onClick={() => showItemSelected(i)} key={i}>
                                        <SaleTableTBodyTd >{i + 1}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.productId}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.productName}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{prod.productQuantity}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{BrCurrencyFormat(prod.productUnitPrice)}</SaleTableTBodyTd>
                                        <SaleTableTBodyTd >{BrCurrencyFormat(prod.productUnitPrice * prod.productQuantity)}</SaleTableTBodyTd>
                                    </SaleTableTBodyTr>
                                ))}
                            </tbody>
                        </SaleTable>

                    </SaleCardTable>


                </SaleBody2>

                <SaleFooter>


                    <CardSellResult>
                        <label>Sub-total</label>
                        <h2>{BrCurrencyFormat(totalValue)}</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>Desconto {showPercent && `${discount}%`}</label>
                        <h2>{BrCurrencyFormat(discountValue)}</h2>
                    </CardSellResult>

                    <CardSellResult>
                        <label>valor</label>
                        <h2>{BrCurrencyFormat(finalTotalValue)}</h2>
                    </CardSellResult>

                </SaleFooter>

            </SaleMain>
            <Modal
                title="Desconto em %"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>

                <Select
                    defaultValue={''}
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={options.map(op => ({ label: op, value: op }))}
                />
            </Modal>
            {showModalSearch && <ModalDefault body={<SearchProduct exit={exit} process={setChooiceByName} />} />}
        </>
    )
}