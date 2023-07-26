import { NavLink } from "react-router-dom";
import { ExitNavLink, HeaderBody, UserContainer } from "./Header.styled"
import { SlLogout } from "react-icons/sl";
import { useContext } from "react";
import { AuthContext } from "../../auth/contexts/authContext";


export const Header = ({ children }: any) => {


    const auth = useContext(AuthContext)

    function logout() {

        auth.signout()

    }

    return (
        <>
            <HeaderBody>
                <UserContainer>
                    <h3>RM</h3>

                    <ExitNavLink

                            to={'/login'} key={'Sair'} onClick={() => logout()}>
                            <div className="icon">{<SlLogout size={30} />}</div>
                            
                        </ExitNavLink>
                        
                </UserContainer>
            </HeaderBody>
            <main>
                {children}
            </main>
        </>
    )
}