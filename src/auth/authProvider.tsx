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


        if (data && data.status === undefined) {

            setUser(data);
            setToken(data.token);
    
            return {
                message: 'pass',
                code: 200,
                status: true
            };
        }

       
        
        
        let message = data && data.message ? data.message : 'Error: No message provided';
        let code = data ? data.code : 0;
        return {
            message: message,
            code: code,
            status: false
        };
    }
    


    const signout = async () => {
        await api.logout()
        setUser(null)
    }


    const setToken = (token: string) => {
       
        

        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}