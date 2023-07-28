import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"
import Login from "../pages/login/Login"
import { ClientList } from "../pages/client/list"
import { ClientRegister } from "../pages/client/register"
import { Header } from "../components/header/Header"
import { MainContent } from "../common/global.styled"
import { Products } from "../pages/product/list"
import { RegisterProducts } from "../pages/product/register"


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
                                <MainContent>
                                    <ClientList />
                                </MainContent>
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
                                <MainContent>
                                    <ClientRegister />
                                </MainContent>
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />

            <Route path="/products" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Header>
                                <MainContent>
                                    <Products/>
                                </MainContent>
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            
            <Route path="/products/register" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>
                            <Header>
                                <MainContent>
                                    <RegisterProducts/>
                                </MainContent>
                            </Header>
                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />

        </Routes>
    )
}