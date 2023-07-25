import { useEffect, useState } from "react"
import { AuthContext } from "./contexts/authContext"
import { User } from "../types/User"
import { useApi } from "../hooks/useApi"


export const AuthProvider = ({children}:{children:JSX.Element}) =>{

   
    const [user, setUser] = useState<User | null>(null)
    const api = useApi()
    const storageData = localStorage.getItem('authToken')

    useEffect(() => {
        const validateToken = async () => {
          if (storageData) {
            const data = await api.validateToken()
            console.log(data);
            if (data && data.data) {
              setUser(data.data)
            } else {
              setUser(null)
            }
          } else {
            setUser(null)
          }
        }
        validateToken()
      }, [])
      

      const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);


        console.log('Data: ',data.status);
    
        // Verificar se a chamada da API foi bem sucedida
        if (data && data.status === undefined) {

            setUser(data);
            setToken(data.token);
    
            return {
                message: 'pass',
                code: 200,
                status: true
            };
        }

        
        // Se a chamada da API não foi bem sucedida, retornar um objeto com a mensagem de erro,
        // código de status e status: false.
        let message = data && data.data ? data.data.message : 'Error: No message provided';
        let code = data ? data.code : 0;
        return {
            message: message,
            code: code,
            status: false
        };
    }
    

    // const signin = async (email: string, password: string) => {

    //     const data = await api.signin(email, password)

    //     if (data.status === 200) {

    //         if (data.name == "AxiosError") {

    //             return {
    //                 message: data.response.data.message,
    //                 code: data.response.data.statusCode,
    //                 status: false
    //             }
    //         } else {

    //             console.log(data);
               
    //             setUser(data)
    //             setToken(data.token)

    //             return {
    //                 message: 'pass',
    //                 code: 200,
    //                 status: true
    //             }
    //         }
    //     }
    //     return {
    //         message: 'fail',
    //         code: 0,
    //         status: false
    //     }
    // }

    const signout = async () => {
        await api.logout()
        setUser(null)
    }


    const setToken = (token: string) => {
       
        console.log(token);

        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}