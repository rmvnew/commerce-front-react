import { Avatar, Stack } from "@mui/material"



type typeprops = {
    userInitials: string
}


export const MuiAvatar:React.FC<typeprops> = ({ userInitials }) => {

    return (
        <Stack spacing={4}>
            <Stack direction='row' spacing={1}>
                <Avatar sx={{
                    bgcolor: 'primary.light',
                    width:'50px',
                    height:'50px'
                }}>{userInitials}</Avatar>
            </Stack>

        </Stack>
    )
}