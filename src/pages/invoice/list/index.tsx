import { NavLink } from "react-router-dom"
import { InvoiceMain, TitleFont } from "./invoice.list.styled"
import { Fab, Tooltip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';





export const InvoiceList = () =>{


    return(
        <InvoiceMain>
            
            
            <TitleFont>Lista de Clientesss</TitleFont>

            <NavLink to={'/invoice/register'}>
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



        </InvoiceMain>
    )
}