import { Avatar, Stack } from "@mui/material"

type typeprops = {
    userInitials: string,
    onClick?: () => void,  // Adicione a propriedade onClick aqui
}

export const MuiAvatar:React.FC<typeprops> = ({ userInitials, onClick }) => {
    return (
        <Stack spacing={4}>
            <Stack direction='row' spacing={1}>
                <Avatar 
                    sx={{
                        bgcolor: 'primary.light',
                        width:'50px',
                        height:'50px'
                    }}
                    onClick={onClick} // E adicione o evento onClick aqui
                >
                    {userInitials}
                </Avatar>
            </Stack>
        </Stack>
    )
}
