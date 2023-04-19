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
const Profile = React.lazy(() => import('../pages/Profile'))
function Router() {
    return (
        <Routes>
            <Route element={<FullLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/login" exact element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/checkout" exact element={<Checkout />} />
                    <Route path="/my-orders" exact element={<Orders />} />
                    <Route path="/order-details/:id" exact element={<OrderDetails />} />
                </Route>
                <Route path="/categories" exact element={<Categories />} />
            </Route>
        </Routes>
    )
}

export default Router
