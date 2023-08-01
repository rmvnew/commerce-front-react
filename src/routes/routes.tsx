import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import Sidebar from "../components/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { RequireAuth } from "../auth/RequireAuth"
import Login from "../pages/login/Login"
import { ClientList } from "../pages/client/list"
import { ClientRegister } from "../pages/client/register"
import { Products } from "../pages/product/list"
import { RegisterProducts } from "../pages/product/register"
import { PageNotFound } from "../pages/pagenotfound/NotFound"
import { InvoiceList } from "../pages/invoice/list"


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

                            
                                <ClientList />
                            

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            <Route path="/client/register" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>

                           
                                <ClientRegister />
                            

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />

            <Route path="/products" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>

                            
                                <Products />
                           

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />

            <Route path="/products/register" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>

                            
                                <RegisterProducts />
                            

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            
            <Route path="/invoice" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>

                            
                                <InvoiceList />
                            

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />
            
             <Route path="*" element={
                <RequireAuth>
                    <Footer>
                        <Sidebar>

                            
                                <PageNotFound />
                            

                        </Sidebar>
                    </Footer>
                </RequireAuth>
            } />

        </Routes>
    )
}