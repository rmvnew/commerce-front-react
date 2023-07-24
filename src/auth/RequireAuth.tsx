import { useContext } from "react"
import { AuthContext } from "./contexts/authContext"
import Login from "../pages/login/Login"


export const RequireAuth = ({children}: {children: JSX.Element}) =>{

    const auth = useContext(AuthContext)

    if(!auth.user){
        return <Login/>
    }

    return children
}