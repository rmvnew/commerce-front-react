import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Private } from "../pages/Private"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"
import Login from "../pages/login/Login"
import { ClientList } from "../pages/client/list"
import { ClientRegister } from "../pages/client/register"


export const AppRoutes = () => {
    return (
        <Routes>

            <Route path='/login' element={<Login />} />

            <Route path="/" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Home />
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/client/list" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <ClientList/>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/client/register" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <ClientRegister/>
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