import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Private } from "../pages/Private"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Footer>
                    <Sidebar>
                        <Home />
                    </Sidebar>
                </Footer>
            } />
            <Route path="/private" element={
                <Footer>
                    <Sidebar>
                        <RequireAuth>
                            <Private />
                        </RequireAuth>
                    </Sidebar>
                </Footer>
            } />
        </Routes>
    )
}