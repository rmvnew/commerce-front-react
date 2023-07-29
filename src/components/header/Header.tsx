import { ExitNavLink, HeaderBody, UserContainer } from "./Header.styled"
import { SlLogout } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/contexts/authContext";
import { MuiAvatar } from "../MuiAvatar";
import { api } from "../../hooks/useApi";





interface UserState {
    data?: {
        userId?: number
        active?: boolean
        profiles?: {}
        userCompleteName?: string
        userEmail?: string
        userEnrollment?: string
    }

}


export const Header = ({ children }: any) => {

    let suffix = ''

    const userLogin = localStorage.getItem('userLogin')

    const [user, setUser] = useState<UserState>({})

    const [userSuffix, setUserSiffix] = useState('')

    const [tooltipName, setTooltipName] = useState('')

    const auth = useContext(AuthContext)

    function logout() {

        auth.signout()

    }


    useEffect(() => {
        api.get(`/users/email?email=${userLogin}`)
            .then(res => {
                setUser(res)
            })
    }, [])

    useEffect(() => {

        const name = user.data?.userCompleteName
        const profile = user.data?.profiles

        setTooltipName(name !== undefined ? name : '')

        if (name) {

            const nameParts = name.split(' ')
            console.log(nameParts[0].charAt(0));

            if (nameParts.length > 1) {
                console.log(1);
                suffix = nameParts[0].charAt(0) + nameParts[1].charAt(0)

            } else {
                console.log(2);

                suffix = nameParts[0].charAt(0)

            }

            setUserSiffix(suffix.toUpperCase())

        }

    }, [user])


    return (
        <>
            <HeaderBody>
                <UserContainer>


                    <MuiAvatar userInitials={userSuffix} />

                    <ExitNavLink

                        to={'/login'} key={'Sair'} onClick={() => logout()}>
                        <div className="icon">{<SlLogout size={25} />}</div>

                    </ExitNavLink>

                </UserContainer>
            </HeaderBody>
            <main>
                {children}
            </main>
        </>
    )
}