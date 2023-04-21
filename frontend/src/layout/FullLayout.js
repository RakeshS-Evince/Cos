import React from 'react'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import CartSidebar from './CartSidebar'
import Headers from './Header'
import Sidebar from './Sidebar'
import useRoleCheck from '../hooks/useRoleCheck'
import AdminHeader from './AdminHeader'




function FullLayout() {
    const { isAdmin, isStaff } = useRoleCheck()
    return (
        <>
            <header>
                {!(isAdmin || isStaff) ?
                    <Headers /> : <AdminHeader />}
            </header>
            <main>
                <div id="main">
                    <Container style={{ paddingTop: "70px", paddingBottom: "50px" }} >
                        <Outlet />
                    </Container>
                </div>
                {(isAdmin || isStaff) && <Sidebar />}
                <CartSidebar />
            </main>
        </>
    )
}

export default FullLayout
