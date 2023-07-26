import styled from "styled-components";

export const ClientRegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    height: 100vh;
   

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


// export const ClientFormMain = styled.div`
//     display: flex;
//     width: 80vw;
//     /* height: 80vh; */
//     justify-content: center;
//     align-items: center;
//     margin-left: 20px;


//     @media (max-width: 1400px) {
        
//         align-items: flex-start;
//         width: 90vw;
       
       
//     }
  
//     @media (max-height: 700px) {
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
        
        
//     }


// `

export const ClientFormMain = styled.div`
    display: flex;
    width: 80vw;
    /* height: 80vh; */
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-top: 25px;


    @media (max-width: 2560px) {
       
        align-items: flex-start;
        width: 90vw;

     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        
        align-items: flex-start;
        width: 85vw;
     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        align-items: flex-start;
        width: 80vw;
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