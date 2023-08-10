import { BoxInput, CardSearch, CardTableActions, DesactiveTableButton, TitleFont } from "../../common/global.styled"
import { ImageNotFound } from "../../common/imageNotFound/imageNotfound"
import { useEffect, useState } from "react"
import ConfirmationModal from "../../components/modal/ConfirmationModal"
import { Button, TextField } from "@mui/material"
import { RiDeleteBinFill } from "react-icons/ri"
import { api } from "../../hooks/useApi"
import { GiSave } from "react-icons/gi"
import { AiOutlineClear } from "react-icons/ai"
import { ProfileContainer, ProfileTable } from "./profile.styled"
import { useNavigate } from "react-router-dom"
import ReplyIcon from '@mui/icons-material/Reply';


interface ProfileInterface {
    profileId: number,
    profileName: string
}


export const Profile = () => {

    const navigate = useNavigate();

    const [profiles, setProfiles] = useState<any[]>([]);
    const [profileName, setProfileName] = useState('')
    const [haveData, setHaveData] = useState(false)

    const [search, setSearch] = useState("")
    const [isModalOpen, setModalOpen] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<number | null>(null); // New state
    const [proifle, setProfile] = useState({})
    const [update, setUpdate] = useState(false)
    const [proifleId, setProfileId] = useState(0)


    const back = () => {

        navigate('/user/register')


    }

    const clearProfile = () => {
        setUpdate(false)
        setProfileName('')
        setSearch('')
    }

    const setUpdateProfile = (profile: ProfileInterface) => {

        console.log(profile);
        setUpdate(true)
        setProfile(profile)
        setProfileName(profile.profileName)
        setProfileId(profile.profileId)

    }

    const setResponse = (res: any) => {

        setProfiles(res.data)

    }



    const openModal = (id: number) => {
        setProfileToDelete(id);
        setModalOpen(true);
    };

    const getProfiles = async () => {
        await api.get(`/profile/all?name=${search}`)
            .then(response => {
                setResponse(response);
            });
    }

    const deleteProfile = async (id: number) => {
        await api.delete(`/profile/${id}`)
            .then(res => {
                getProfiles()
            })
    }

    useEffect(() => {
        getProfiles()
    }, [search])

    useEffect(() => {

        if (profiles.length > 0) {
            setHaveData(true)
        } else {
            setHaveData(false)
        }

    }, [profiles]);


    const handleConfirm = async () => {
        if (profileToDelete) {
            await deleteProfile(profileToDelete);
        }
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };


    const saveProfile = async () => {

        await api.post(`/profile`, { profileName: profileName })
            .then(response => {

                getProfiles()
                setProfileName('')

            }).catch(error => {
                console.log('Error: ', error);
            })

    }


    const updateProfile = async () => {

        await api.put(`/profile/${proifleId}`, { profileName: profileName })
            .then(response => {

                getProfiles()
                setProfileName('')

            }).catch(error => {
                console.log('Error: ', error);
            })

    }

    return (
        <ProfileContainer>

            <TitleFont>Gerenciar Perfil</TitleFont>

            <CardSearch>
                <BoxInput style={{ display: 'flex', alignItems: 'center' }}>

                    <TextField

                        id="outlined-basic"
                        label="Cadastrar novo Perfil"
                        variant="outlined"
                        value={profileName}
                        onChange={(event) => setProfileName(event.target.value)}
                        inputProps={{
                            style: {
                                textAlign: 'center',
                                border: 'none',
                                height: '10px'

                            }
                        }}
                    />

                    {!update && <Button
                        variant="contained"
                        onClick={saveProfile}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            fontWeight: 'bold'
                        }}
                    >
                        <GiSave />
                        Salvar
                    </Button>}

                    {update && <Button
                        variant="contained"
                        onClick={updateProfile}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            background: 'grey',
                            fontWeight: 'bold'
                        }}
                    >
                        <GiSave />
                        Atualizar
                    </Button>}

                    <Button
                        variant="contained"
                        onClick={clearProfile}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            fontWeight: 'bold'
                        }}
                    >
                        <AiOutlineClear />  Limpar
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<ReplyIcon sx={{ fontSize: 40 }} />}
                        onClick={back}
                        style={{
                            marginLeft: '20px',
                            height: '40px',
                            width: '150px',
                            fontWeight: 'bold',
                            backgroundColor: 'orangered'
                        }}
                    >
                         Voltar
                    </Button>


                </BoxInput>


            </CardSearch>
            <br />


            {!haveData && <div>

                <ImageNotFound message="Nenhuma Categoria encontrada" />

            </div>}

            {haveData && <div>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    title="Confirmação de deleção"
                    message="Tem certeza de que deseja deletar a categoria?"
                />
                <CardSearch>


                    <BoxInput style={{ display: 'flex', alignItems: 'center' }}>





                        <TextField

                            id="outlined-basic"
                            label="Pesquisar"
                            variant="outlined"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            inputProps={{
                                style: {
                                    textAlign: 'center',
                                    border: 'none',
                                    height: '10px',

                                }
                            }}
                        />
                    </BoxInput>

                </CardSearch>
                <br />

                <ProfileTable >
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>

                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile) => (
                            <tr key={profile.profileId}
                                onClick={() => setUpdateProfile(profile)}>
                                <td>{profile.profileId}</td>
                                <td>{profile.profileName}</td>

                                <td>
                                    <CardTableActions>

                                        <DesactiveTableButton
                                            className="btn btn-danger"
                                            onClick={() => openModal(profile.profileId)}
                                        >
                                            <RiDeleteBinFill />
                                        </DesactiveTableButton>
                                    </CardTableActions>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </ProfileTable>

            </div>}


        </ProfileContainer>
    )
}