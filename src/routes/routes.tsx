import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Private } from "../pages/Private"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"
import Login from "../pages/login/Login"
import { Client } from "../pages/client"


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
            <Route path="/client" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Client/>
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