import { GlobalFormMain, GlobalRows } from "../../../common/global.styled"
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CircularProgress, Fab, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import { api } from "../../../hooks/useApi";
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { TitleFont } from "../../../common/global.styled";
import AddIcon from '@mui/icons-material/Add';
import { UserInterface } from "../../../interfaces/user.interface";
import { ErrorLabel, InputTextField } from "./user.list.styled";
import { CommerceRegex } from "../../../common/regex";
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ProfileDisplayName } from "../../../common/enums";
import { TiArrowBackOutline } from "react-icons/ti";
import ReplyIcon from '@mui/icons-material/Reply';


export const UserRegister = () => {

    const location = useLocation()

    const dataResult = location.state?.data

    const navigate = useNavigate();



    const [userId, setUserId] = useState(0)
    const [profiles, setProfiles] = useState<any[]>([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userSecondPassword, setUserSecondPassword] = useState("");
    const [userEnrollment, setUserEnrollment] = useState("");
    const [profileId, setProfileId] = useState(0);
    const [profileIdEdit, setProfileIdEdit] = useState(0)
    const [weakPassword, setWeakPassword] = useState(false)
    const [weakPasswordText, setWeakPasswordText] = useState('Deve ter 2 letras Maiusculas 2 Números e um caracter especial')
    const [secondPasswordsMatch, setSecondPasswordMatch] = useState(false)
    const [secondPasswordText, setSeconsPasswordText] = useState('Repita a senha')
    const [showPassword, setShowPassword] = useState(false);
    const [isAction, setIsAction] = useState(false)

    const [update, setUpdate] = useState(false)


    function setProduct() {

        if (dataResult) {

            console.log('DataResult: ', dataResult.profile.profileId);

            setUpdate(true)

            setUserId(dataResult.userId)
            setUserName(dataResult.userCompleteName)
            setUserEnrollment(dataResult.userEnrollment)
            setUserEmail(dataResult.userEmail)
            setProfileIdEdit(dataResult.profile.profileId)



        } else {
            setUpdate(false)
        }

    }



    useEffect(() => {
        setProduct()
    }, [])



    function createUser() {


        const user: UserInterface = {
            userCompleteName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userEnrollment: userEnrollment,
            profileId: profileId
        }

        return user

    }

    const onSubmit = (event: any) => {
        event.preventDefault()

    }





    const handleButtonClick = () => {
        navigate("/user");
    };

    const allFieldsFilled = () => {

    
        return (

            userName !== "" &&
            userEmail !== "" &&
            (update || userPassword !== "")&&
            userEnrollment !== ""


        );
    }

    useEffect(() => {
        setIsAction(allFieldsFilled())
    }, [userName, userEmail, update, userPassword, userEnrollment])

    useEffect(() => {

        if (userPassword.length > 0) {

            if (CommerceRegex.checkPasswordComplexity().test(userPassword)) {
                setWeakPassword(false)

            } else {
                setWeakPassword(true)

            }


        } else {
            setWeakPassword(false)

        }



    }, [userPassword])

    useEffect(() => {

        if (userPassword.length > 0) {
            if (userSecondPassword.length > 0) {

                if (userPassword === userSecondPassword) {

                    setSecondPasswordMatch(false)
                    setSeconsPasswordText('Repita a senha')

                } else {

                    setSecondPasswordMatch(true)
                    setSeconsPasswordText('Senhas não correspondem')

                }

            }
        } else {
            setUserSecondPassword('')
            setSecondPasswordMatch(false)
            setSeconsPasswordText('Repita a senha')
        }



    }, [userPassword, userSecondPassword])

    function saveUser() {

        const user = createUser()

        // console.log('User: ', user);

        api.post("/users", user)
            .then((res) => {
                navigate('/user')
            }).catch(error => {
                console.log('Create user error: ', error);

                toast.error(
                    error.response.data.message,
                    {

                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
            })

    }

    function updateUser() {

        const user = createUser()

        // console.log('User: ', user);

        api.put(`/users/${userId}`, user)
            .then((res) => {
                navigate('/user')
            }).catch(error => {
                console.log('Update user error: ', error);

                toast.error(
                    error.response.data.message,
                    {

                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
            })
    }


    function getProfiles() {


        api.get('/profile/all')
            .then(res => {

                setProfiles(res.data)

            }).catch(error => {
                console.log(error);
            })


    }

    useEffect(() => {
        getProfiles()
    }, [])


    useEffect(() => {
        if (profiles.find(data => data.profileId === profileIdEdit)) {
            setProfileId(profileIdEdit);
        }
    }, [profileIdEdit, profiles]);


    useEffect(() => {
        if (profiles.length > 0 && profileId === 0) {
            setProfileId(profiles[0].profileId);
        }
    }, [profiles]);

    const handleChangeSelect = (event: SelectChangeEvent<any>) => {
        setProfileId(event.target.value);
    };


    return (



        <GlobalFormMain>

            {!update && <TitleFont>Cadastrar Usuario</TitleFont>}
            {update && <TitleFont>Atualizar Usuario</TitleFont>}


            <NavLink to={'/profile'}>
                <label style={{
                    position: 'absolute',
                    top: '75px',
                    right: '34px',
                    fontWeight: 'bold',
                    color: 'green'

                }}>Perfil</label>
                <Tooltip
                    title="Adicionar Perfil"
                    placement='left'

                >

                    <Fab
                        color="success"
                        aria-label="add"
                        style={{
                            position: 'absolute',
                            top: '100px',
                            right: '16px',
                            marginBottom: '25px',
                            width: '70px',
                            height: '70px'
                        }}>
                        <AddIcon />
                    </Fab>

                </Tooltip>
            </NavLink>


            <form action="" onSubmit={onSubmit}>


                <GlobalRows>

                    <Grid container spacing={4}>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Nome do usuário"
                                variant="outlined"
                                value={userName}
                                onChange={(event) => setUserName(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',

                                    }
                                }}
                            />

                        </Grid>




                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="E-mail"
                                variant="outlined"
                                type="email"
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',

                                    },

                                }}

                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                error={weakPassword}
                                fullWidth
                                id="outlined-basic"
                                label='Senha'
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                disabled={update}
                                value={userPassword}
                                onChange={(event) => setUserPassword(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                    }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {weakPassword && <FormHelperText error={weakPassword}>
                                {weakPasswordText}
                            </FormHelperText>}
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <InputTextField
                                error={secondPasswordsMatch}
                                fullWidth
                                id="outlined-basic"
                                label='Repita a senha'
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                disabled={update}
                                value={userSecondPassword}
                                onChange={(event) => setUserSecondPassword(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',

                                    }
                                }}
                            />
                            {secondPasswordsMatch && <FormHelperText error={secondPasswordsMatch}>
                                {secondPasswordText}
                            </FormHelperText>}
                        </Grid>

                    </Grid>

                </GlobalRows>




                <GlobalRows>

                    <Grid container spacing={4}>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Matricula"
                                variant="outlined"
                                value={userEnrollment}
                                onChange={(event) => setUserEnrollment(event.target.value)}
                                inputProps={{
                                    style: {
                                        textAlign: 'center',
                                    }
                                }}
                            />
                        </Grid>


                        <Grid item xs={12} md={3}>
                            <FormControl variant="outlined" style={{ width: '100%', height: '100%' }}>
                                <InputLabel id="demo-simple-select-outlined-label">Perfil</InputLabel>
                                {profiles.length > 0 ? (
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={profileId}
                                        onChange={handleChangeSelect}
                                        label="Perfil"
                                        style={{ height: '100%' }}
                                    >
                                        {profiles.map((profile) => (
                                            <MenuItem key={profile.profileId} value={profile.profileId}>
                                                {ProfileDisplayName[profile.profileName as keyof typeof ProfileDisplayName]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    <CircularProgress />
                                )}
                            </FormControl>
                        </Grid>





                    </Grid>

                </GlobalRows>





                <GlobalRows>

                    {update && <Button
                        variant="contained"
                        style={{
                            fontSize: '1.2rem',
                            width: '300px',
                            background: 'grey',
                            fontFamily: 'Black Han Sans'

                        }}
                        disabled={!isAction}
                        onClick={updateUser}
                    >
                        Salvar u
                    </Button>}

                    {!update && <Button
                        variant="contained"
                        style={{
                            fontSize: '1.2rem',
                            width: '300px',
                            fontFamily: 'Black Han Sans'

                        }}
                        disabled={!isAction}
                        onClick={saveUser}
                    >
                        Salvar s
                    </Button>}

                    <Button
                        variant="contained"
                        // startIcon={<ReplyIcon sx={{fontSize:60}} />}
                        style={{
                            fontSize: '1.2rem',
                            width: '300px',
                            backgroundColor: 'orangered',
                            marginLeft: '20px',
                            fontFamily: 'Black Han Sans'
                        }}

                        onClick={handleButtonClick}
                    >
                       <ReplyIcon sx={{fontSize:40 }} /> Voltar
                    </Button>

                </GlobalRows>




            </form>


        </GlobalFormMain >


    )
}