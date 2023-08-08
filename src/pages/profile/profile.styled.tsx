import styled from "styled-components";





export const ProfileContainer = styled.div`
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

     @media (max-width: 1366px) {
        width: 85vw;
        height: 95vh;
     }

     
`

export const ProfileTable = styled.table`
   width: 100%;
  display: block;

  thead {
    display: block;

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;

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
    display: block;
    max-height: 400px;
    overflow-y: auto;

    tr {
      display: table;
      width: 100%;
      table-layout: fixed;

      &:nth-of-type(odd) {
        background: #e6e6e6;
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