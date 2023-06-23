import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import React from 'react'
import FullLayout from '../layout/FullLayout'
import Checkout from '../pages/Checkout'
import Menu from '../pages/Menu'
import Register from '../pages/Register'
import Login from '../pages/Login'
import MyOrders from '../pages/MyOrders'
import MyOrderDetails from '../pages/MyOrderDetails'
import ProtectedRoutes from '../components/ProtectedRoutes'
import Brands from '../pages/Brands'
import useRoleCheck from '../hooks/useRoleCheck'
import AdminDashboard from '../pages/admin/AdminDashboard'
import OrderTable from '../pages/admin/OrderTable'
import BrandTable from '../pages/admin/BrandTable'
import IceCreamTable from '../pages/admin/IceCreamTable'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import IceCreamByBrand from '../pages/IceCreamsByBrand'
import Home from '../pages/Home'
import Unauthorized from '../pages/Unauthorized'
import NotFound from '../pages/NotFound'
import AddressForm from '../pages/AddressForm'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import IceCreamDetails from '../pages/IceCreamDetails'
import PaymentFailure from '../pages/PaymentFailure'
import PaymentSuccess from '../pages/PaymentSuccess'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import LoginSuccessPage from '../pages/LoginSuccessPage'
import SearchResult from '../pages/SearchResult'
import ReviewForm from '../pages/ReviewForm'
import MessagesTable from '../pages/admin/MessagesTable'
import Customers from '../pages/admin/Customers'
import ReviewsTable from '../pages/admin/ReviewsTable'
import CustomerOrders from '../pages/admin/CustomerOrders'
import StaffTable from '../pages/admin/StaffTable'
import StaffForm from '../pages/admin/StaffForm'
import StaffEditForm from '../pages/admin/StaffEditForm'
const Profile = React.lazy(() => import('../pages/Profile'))
function Router() {
    const { isAdmin, isStaff } = useRoleCheck();
    return (
        <Routes>
            <Route path="*" exact element={<NotFound />} />
            <Route path="/unauthorized" exact element={<Unauthorized />} />
            <Route element={<FullLayout />}>
                <Route path="/" element={!(isAdmin || isStaff) ? <Home /> : <AdminDashboard />} />
                <Route element={!(isAdmin || isStaff) ? <Outlet /> : <Navigate to="/" />}>
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/reset-password/:token" exact element={<ResetPassword />} />
                    <Route path="/forgot-password" exact element={<ForgotPassword />} />
                    <Route path="/menu" exact element={<Menu />} />
                    <Route path="/about" exact element={<About />} />
                    <Route path="/contact" exact element={<Contact />} />
                    <Route path="/icecream-details/:id" element={<IceCreamDetails />} />
                    <Route path="/brands" exact element={<Brands />} />
                    <Route path="/brands/:name" exact element={<IceCreamByBrand />} />
                    <Route path="/login-success" exact element={<LoginSuccessPage />} />
                    <Route path="/search-results" exact element={<SearchResult />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={!(isAdmin || isStaff) ? <Outlet /> : <Navigate to='/unauthorized' />}>
                        <Route path="/profile" exact element={<Profile />} />
                        <Route path="/address/add" exact element={<AddressForm />} />
                        <Route path="/address/edit/:id" exact element={<AddressForm />} />
                        <Route path="/payment-failure/:id" exact element={<PaymentFailure />} />
                        <Route path="/payment-success/:id" exact element={<PaymentSuccess />} />
                        <Route path="/checkout" exact element={<Checkout />} />
                        <Route path="/my-orders" exact element={<MyOrders />} />
                        <Route path="/my-orders/:id" exact element={<MyOrderDetails />} />
                        <Route path="/review" element={<ReviewForm />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Route>
                    <Route element={(isAdmin || isStaff) ? <Outlet /> : <Navigate to='/unauthorized' />}>
                        <Route path="/orders-table" exact element={<OrderTable />} />
                        <Route path="/brands-table" exact element={<BrandTable />} />
                        <Route path="/ice-creams-table" exact element={<IceCreamTable />} />
                        <Route path="/messages" exact element={<MessagesTable />} />
                    </Route>
                    <Route element={isAdmin ? <Outlet /> : <Navigate to='/unauthorized' />}>
                        <Route path="/customers" exact element={<Customers />} />
                        <Route path="/reviews" exact element={<ReviewsTable />} />
                        <Route path="/customer-orders/:cid" exact element={<CustomerOrders />} />
                        <Route path='/staff' element={<StaffTable />} />
                        <Route path='/staff/add' element={<StaffForm />} />
                        <Route path='/staff/edit/:id' element={<StaffEditForm />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default Router
