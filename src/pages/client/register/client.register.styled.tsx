import styled from "styled-components";

export const ClientRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    height: 100vh;
    
`

export const UserFormLabel = styled.label`
    margin-right: 10px; /* Ajuste a margem conforme necessário */
    font-size: 1.5rem;
    margin-bottom: 5px;
    margin-left: 15px;
`

export const CardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    margin-left: 20px;
`;


export const ClientFormMain = styled.div`
    display: flex;
    width: 80vw;
    /* height: 80vh; */
    justify-content: center;
    align-items: center;
    margin-left: 20px;


    @media (max-width: 1400px) {
        
        align-items: flex-start;
        width: 90vw;
       
       
    }
  
    @media (max-height: 700px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
        
        
    }


`