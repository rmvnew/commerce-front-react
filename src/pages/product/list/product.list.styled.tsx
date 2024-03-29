import { NavLink } from "react-router-dom";
import styled from "styled-components";




export const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    

    @media (max-width: 2560px) {
        width: 93vw;
        height: 100vh;

        input{
        
        width: 400px;
        height: 30px;
        border-radius: 5px;
        border: solid 0.5px black;
        margin-bottom: 5px;
    }

        
     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        
        width: 90vw;
        height: 100vh;

        input{
        width: 400px;
        height: 30px;
        border-radius: 5px;
        border: solid 0.5px black;
        margin-bottom: 5px;
    }

     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        width: 85vw;
        height: 95vh;
     }

     // Para telas até 1024px (tablets, iPads)
    


`


export const BoxInput = styled.div`
    display: flex;
    

    
    @media (max-width: 2560px) {
        
        width: 83vw;
        
        
    }
    
    // Para telas até 1920px (Full HD)
    @media (max-width: 1920px) {
        
        width: 80vw;
        
        
    }
    
    // Para telas até 1366px (HD)
    @media (max-width: 1366px) {
        
        
        width: 75vw;

     }

`


export const TableProduct = styled.table`
    margin-bottom: 20px;
    

    thead {
        tr {
            td {
                border: solid 1px black;
                text-align: center;
                padding: 5px 20px;
                background-color: #49627b;
                color: white;
            }
        }
    }

    tbody {
        tr {
            &:nth-of-type(odd) {
                background: #e6e6e6; // adjust color as needed
            }

            &:hover{
                background: #627384;
                color: white;
            }

            td{
                border: solid 1px black;
                margin-left: 5px;
                margin-right: 5px;
            }
        }
    }

    @media (max-width: 2560px) {
        width: 83vw;
    }

    @media (max-width: 1920px) {
        width: 80vw;
    }

    @media (max-width: 1366px) {
        width: 75vw;
    }
`



export const ImageListProductNotFound = styled.img`
        
        

    @media (max-width: 2560px) {

        width: 700px;

    }

    @media (max-width: 1920px) {
        width: 650px;
    }

    @media (max-width: 1366px) {
        width: 450px;
    }
    
`