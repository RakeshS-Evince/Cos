import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import FullLayout from '../layout/FullLayout'
import Checkout from '../pages/Checkout'
import Menu from '../pages/Menu'
import Register from '../pages/Register'
import Login from '../pages/Login'
// import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import OrderDetails from '../pages/OrderDetails'
import ProtectedRoutes from '../components/ProtectedRoutes'
import Brands from '../pages/Brands'
import useRoleCheck from '../hooks/useRoleCheck'
import AdminDashboard from '../pages/AdminDashboard'
import OrderTable from '../pages/OrderTable'
import BrandTable from '../pages/BrandTable'
import IceCreamTable from '../pages/IceCreamTable'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import IceCreamByBrand from '../pages/IceCreamsByBrand'
import Home from '../pages/Home'
import Unauthorized from '../pages/Unauthorized'
import NotFound from '../pages/NotFound'
import AddressForm from '../pages/AddressForm'
import About from '../pages/About'
import Contact from '../pages/Contact'
const Profile = React.lazy(() => import('../pages/Profile'))
function Router() {
    const { isAdmin, isStaff } = useRoleCheck();
    return (
        <Routes>
            <Route path="*" exact element={<NotFound />} />
                <Route path="/unauthorized" exact element={<Unauthorized />} />
            <Route element={<FullLayout />}>
                <Route path="/" element={!(isAdmin || isStaff) ? <Home /> : <AdminDashboard />} />
                <Route path="/menu" exact element={<Menu />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/forgot-password" exact element={<ForgotPassword />} />
                <Route path="/reset-password/:token" exact element={<ResetPassword />} />
                <Route element={<ProtectedRoutes />}>
                    <Route element={!(isAdmin || isStaff) ? <Outlet /> : <Navigate to='/unauthorized' />}>
                        <Route path="/profile" exact element={<Profile />} />
                        <Route path="/address/add" exact element={<AddressForm />} />
                        <Route path="/address/edit/:id" exact element={<AddressForm />} />
                        <Route path="/checkout" exact element={<Checkout />} />
                        <Route path="/my-orders" exact element={<Orders />} />
                        <Route path="/my-orders/:id" exact element={<OrderDetails />} />
                    </Route>
                    <Route element={(isAdmin || isStaff) ? <Outlet /> : <Navigate to='/unauthorized' />}>
                        <Route path="/orders-table" exact element={<OrderTable />} />
                        <Route path="/brands-table" exact element={<BrandTable />} />
                        <Route path="/ice-creams-table" exact element={<IceCreamTable />} />
                    </Route>
                </Route>
                <Route path="/brands" exact element={<Brands />} />
                <Route path="/brands/:name" exact element={<IceCreamByBrand />} />
            </Route>
        </Routes>
    )
}

export default Router
