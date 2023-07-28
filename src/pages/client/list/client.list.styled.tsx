import { NavLink } from 'react-router-dom';
import styled from 'styled-components';




export const ClientContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* justify-content: center; */
    width: 100vw;
    height: 100vh;
    background-color: #d1dddd;


    @media (max-width: 2560px) {
        width: 93vw;
        height: 91vh;
        
     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        
        width: 90vw;
        height: 90vh;
     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        width: 85vw;
        height: 83vh;
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



`

export const ClientTitle = styled.h1`
    
    color: blue;

`

export const ClientTableButtonNavLink = styled(NavLink)`
 margin-top: 5px;
 margin-bottom: 5px;
 border: 1px solid #000;

 &:hover{
  border: 1px solid #000;
  box-shadow: #000 0px 2px 5px;
 }
`


export const PaginationCardUser = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    justify-content: center;
    /* margin-top: 20px; */


`

export const CardLink = styled.div`
   
      margin-top: 20px;
      margin-bottom: 5px;
      height: 35px;
      

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


export const LinkNewClient = styled(NavLink)`

    


`