import styled from "styled-components";



export const InvoiceRegisterMain = styled.div`
    
    display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      

      @media (max-width: 2560px) {
         margin-top: 100px;
         width: 93vw;
         height: 87vh;
      }

      @media (max-width: 1930px) {
         margin-top: 100px;
         width: 90vw;
         height: 85vh;
      }

      @media (max-width: 1376px) {
         margin-top: 100px;
         width: 85vw;
         height: 77vh;
      }
    

`

export const TitleFont = styled.h1`
    
    /* font-family: 'Black Ops One', cursive; */
    font-family: 'Black Han Sans', sans-serif;
    margin-top: 5px;
    margin-bottom: 30px;
`;


export const InvoiceRows = styled.div`
      margin-bottom: 30px;

      @media (max-width: 2560px) {
         
         width: 90vw;
         
      }

      @media (max-width: 1930px) {
         width: 85vw;
      }

      @media (max-width: 1376px) {
         width: 80vw;
      }
`


