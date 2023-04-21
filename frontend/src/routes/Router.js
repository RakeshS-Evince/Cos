import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FullLayout from '../layout/FullLayout'
import Checkout from '../pages/Checkout'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
// import Profile from '../pages/Profile'
import Orders from '../pages/Orders'
import OrderDetails from '../pages/OrderDetails'
import Categories from '../pages/Categories'
import ProtectedRoutes from '../components/ProtectedRoutes'
import Brands from '../pages/Brands'
import useRoleCheck from '../hooks/useRoleCheck'
import AdminDashboard from '../pages/AdminDashboard'
import OrderTable from '../pages/OrderTable'
import BrandTable from '../pages/BrandTable'
import IceCreamTable from '../pages/IceCreamTable'
const Profile = React.lazy(() => import('../pages/Profile'))
function Router() {
    const { isAdmin, isStaff } = useRoleCheck();
    return (
        <Routes>
            <Route element={<FullLayout />}>
                <Route path="/" element={!(isAdmin || isStaff) ? <Home /> : <AdminDashboard />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" exact element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                    <Route path="/my-orders" exact element={<Orders />} />
                    <Route path="/my-orders/:id" exact element={<OrderDetails />} />
                    <Route path="/orders-table" exact element={<OrderTable />} />
                    <Route path="/brands-table" exact element={<BrandTable />} />
                    <Route path="/ice-creams-table" exact element={<IceCreamTable />} />
                </Route>
                <Route path="/brands" exact element={<Brands />} />
                <Route path="/categories" exact element={<Categories />} />
            </Route>
        </Routes>
    )
}

export default Router
