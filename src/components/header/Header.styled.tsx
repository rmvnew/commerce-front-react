import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const HeaderBody = styled.div`
    display: flex;
    width: 93vw;
    height: 10vh;
    top: 0;
    position: fixed;
    background-color: rgb(74, 99, 131);
    justify-content: flex-end;

    @media (max-width: 2560px) {
        height: 90px; // Ajuste para o valor desejado
        width: 93vw;
        padding-right: 40px;
     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        height: 90px; // Ajuste para o valor desejado
        width: 90vw;
        padding-right: 40px;
     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        height: 90px; 
        width: 85vw;
        padding-right: 40px;
     }

     // Para telas até 1024px (tablets, iPads)
     @media (max-width: 1024px) {
         height: 60px; 
     }

     // Para telas até 768px (tablets, iPads)
     @media (max-width: 768px) {
         height: 50px; 
     }

     // Para telas até 480px (mobile)
     @media (max-width: 480px) {
         height: 40px; 
     }
`;


export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;

    h3 {
        background-color: #ccc; 
        border-radius: 50%; 
        width: 50px; 
        height: 50px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }

   
`;


export const ExitNavLink = styled(NavLink)`
    
    align-items: center;
    margin-left: 20px;  
    color: #9baebf;
    margin-bottom: 10px;

    .icon {
        font-size: 1.5em;  
    }

    :hover{
        color: white;
    }
`;


