import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const MainContent = styled.main`
    // Isso deve ser a mesma altura do seu Header
    

    @media (max-width: 2560px) {
        margin-top: 6.5vh;
        
     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        margin-top: 9vh;
       
     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        margin-top: 12vh;
     }

     // Para telas até 1024px (tablets, iPads)
     @media (max-width: 1024px) {
        
     }

     // Para telas até 768px (tablets, iPads)
     @media (max-width: 768px) {
        
     }

     // Para telas até 480px (mobile)
     @media (max-width: 480px) {
        
     }

`;



export const CardTableActions = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px 20px;


    @media (max-width: 2560px) {
        margin: 5px 20px;
    }

    @media (max-width: 1920px) {
        margin: 5px 20px;
    }

    @media (max-width: 1366px) {
        margin: 0 20px;
    }
    
`

export const TableButtonNavLink = styled(NavLink)`
 margin: 5px 5px;
 
 border: 1px solid #000;

 &:hover{
  border: 1px solid #000;
  box-shadow: #000 0px 2px 5px;
 }
`

export const DesactiveTableButton = styled.button`
 margin-top: 5px;
 margin-bottom: 5px;margin: 5px 5px;
 
 border: 1px solid #000;

 &:hover{
  border: 1px solid #000;
  box-shadow: #000 0px 2px 5px;
 }
`


export const PaginationCard = styled.div`
    display: flex;
    justify-content: center;


`