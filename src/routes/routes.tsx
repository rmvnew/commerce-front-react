import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Private } from "../pages/Private"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"
import Login from "../pages/login/Login"
import { ClientList } from "../pages/client/list"
import { ClientRegister } from "../pages/client/register"
import { Header } from "../components/header/Header"


export const AppRoutes = () => {
    return (
        <Routes>

            <Route path='/login' element={<Login />} />

            <Route path="/" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Header>
                                <Home />
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/client" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Header>
                                <ClientList />
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/client/register" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Header>
                                <ClientRegister />
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/private" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Private />
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
        </Routes>
    )
}