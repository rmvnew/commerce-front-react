import { useEffect, useState } from 'react';
import { FooterArea, FooterText, FooterName } from './FooterStyled';
import { api } from '../../hooks/useApi';
import { ProfileDisplayName } from '../../common/enums';



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

    const userProfile = ProfileDisplayName[user?.profile?.profileName as keyof typeof ProfileDisplayName] || '';


    localStorage.setItem('currentProfile', user?.profile?.profileName)
    localStorage.setItem('currentUserId', user?.userId)
    

    return (
        <>
            {children}

            <FooterArea className=" d-flex justify-content-around">
                <FooterText className='name-left'>USUÁRIO: <FooterName className='name'>{userName}</FooterName></FooterText>

                <FooterText className='name-right'>PERFIL: <FooterName className='name'>{userProfile}</FooterName></FooterText>

            </FooterArea>
        </>
    )
}

export default Footer
