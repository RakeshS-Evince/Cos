import React from 'react'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import CartSidebar from './CartSidebar'
import Headers from './Header'


function FullLayout() {
    return (
        <>
            <header>
                <Headers />
            </header>
            <main>
                <div id="main">
                    <Container style={{ paddingTop: "70px", paddingBottom: "50px" }} >
                        <Outlet />
                    </Container>
                </div>
                <CartSidebar />
            </main>
        </>
    )
}

export default FullLayout
