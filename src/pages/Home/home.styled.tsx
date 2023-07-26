import styled from "styled-components";






export const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 80vw;

 


    @media (max-width: 2560px) {
        
        width: 93vw;
        padding-right: 40px;

        img{
          height: 600px;
          width: 700px;
        }
     }

     // Para telas até 1920px (Full HD)
     @media (max-width: 1920px) {
        
        width: 90vw;
        padding-right: 40px;

        img{
          height: 500px;
          width: 600px;
        }
     }

     // Para telas até 1366px (HD)
     @media (max-width: 1366px) {
        height: 100vh; // Ajuste para o valor desejado
        width: 85vw;
        padding-right: 40px;

        img{
          height: 350px;
          width: 450px;
        }
     }

     // Para telas até 1024px (tablets, iPads)
     @media (max-width: 1024px) {
         height: 60px; // Ajuste para o valor desejado
     }

     // Para telas até 768px (tablets, iPads)
     @media (max-width: 768px) {
         height: 50px; // Ajuste para o valor desejado
     }

     // Para telas até 480px (mobile)
     @media (max-width: 480px) {
         height: 40px; // Ajuste para o valor desejado
     }
  
`;






