import styled from "styled-components";




export const ClientFormMain = styled.div`
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
         height: 70vh;
      }

`


export const ClientRows = styled.div`
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