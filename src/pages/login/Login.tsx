import { useState, useContext } from 'react';
import { AuthContext } from '../../auth/contexts/authContext';
import '../../common/css/bootstrap.min.css'
import { ModalLogin } from '../../components/Modal.login';
import { RecoverForm } from '../../components/recover-password/recover-password';
import { LoginCard, LoginInputs, LoginTitle, MotionImgLogo } from './LoginStyled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';








const Login = () => {


    const msgToast = (msg: string, timer: number, type: boolean) => {

        
        if (type) {
            toast.success(msg, {
                position: "top-right",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            toast.error(msg, {
                // position: "bottom-center",
                autoClose: timer,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    }


    const auth = useContext(AuthContext)


    const [login, setLogin] = useState('rmvnew@gmail.com')
    const [password, setPassword] = useState('k0975rp')
   

    const handleLogin = async () => {

        if (login && password) {

            const isLogged = await auth.signin(login, password)

            if (isLogged.status) {

                console.log('logou');
                msgToast('Bem vindo!!', 2000,true)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            } else {
                console.log('não logou');
                console.log(isLogged.code);
                if (isLogged.message === 'Incorrect password') {
                    msgToast('Senha inválida', 4000,false)
                } else if (isLogged.message === 'Authentication failed') {
                    msgToast('Usuário inválido', 4000,false)
                }else if(isLogged.message === 'Network Error'){
                    msgToast('Falha ao conectar!', 4000,false)
                }
            }
        }



    }




    return (
        <>
            <LoginCard>
                    
                <LoginInputs>
                    
                    <MotionImgLogo src={require('../../common/assets/logo.png')}></MotionImgLogo>

                    <input
                        className='form-control form-control-lg'
                        type="text"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <input
                        className='form-control form-control-lg'
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />

                    <ModalLogin body={<RecoverForm />} />

                    <button className='btn btn-primary' onClick={handleLogin}>Logar</button>
                </LoginInputs>
            </LoginCard>
            <script src="./smoke.js"></script>
            
        </>
    )

}

export default Login