import { HeaderBody, UserContainer } from "./Header.styled"



export const Header = ({ children }: any) => {
    return (
        <>
            <HeaderBody>
                <UserContainer>
                    <h3>RM</h3>
                    <button>sair</button>
                </UserContainer>
            </HeaderBody>
            <main>
                {children}
            </main>
        </>
    )
}