import { ImageListNotFound } from "./imageNotfound.styled"



interface ImageNotFoundProps{
    message: string
}


export const ImageNotFound = ({message}:ImageNotFoundProps) => {

    

    return (
        <>
            <ImageListNotFound src={require("../../common/assets/await.png")} alt="" />
            <h3>{message}</h3>
        </>
    )
}