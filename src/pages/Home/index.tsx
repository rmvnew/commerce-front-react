import { Homemain, MyContainer } from "./home.styled"


export const Home = () => {


    return (
        <MyContainer>
            {/* <Homemain>Home</Homemain> */}
            <img src={require('../../common/assets/main2.png')} width={700} height={600} alt="" />
        </MyContainer>
    )
}