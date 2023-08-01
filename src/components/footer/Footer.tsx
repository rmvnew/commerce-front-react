import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../contexts/auth/AuthContext';
import { FooterArea, FooterText, FooterName } from './FooterStyled';
import { AuthContext } from '../../auth/contexts/authContext';
import { api } from '../../hooks/useApi';
import { Tooltip } from 'react-bootstrap';



const Footer = ({ children }: any) => {
    const email = localStorage.getItem('userLogin')

    const [user, setUser] = useState<any>(null)

    function getUser() {
        api.get(`/users/email?email=${email}`)
            .then((res) => {
                setUser(res.data)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    const userName = user?.userCompleteName || ''
    const userProfile = user?.profiles?.[0]?.profileName || ''
    // Cria um array de nomes de perfil
    const profileNames = user?.profiles?.map((profile: any) => profile.profileName) || []


    // Converte o array de nomes de perfil para uma string, com cada nome de perfil separado por uma vírgula e um espaço
    const profileNamesString = profileNames.join(', ')

    return (
        <>
            {children}

            <FooterArea className=" d-flex justify-content-around">
                <FooterText className='name-left'>USUÁRIO: <FooterName className='name'>{userName}</FooterName></FooterText>
                {/* <Tooltip title="Delete"> */}
                    <FooterText className='name-right'>PERFIL: <FooterName className='name'>{userProfile}</FooterName></FooterText>
                {/* </Tooltip> */}
            </FooterArea>
        </>
    )
}

export default Footer
