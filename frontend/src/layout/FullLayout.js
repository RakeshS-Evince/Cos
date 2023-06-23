import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import CartSidebar from './CartSidebar'
import Headers from './Header'
import Sidebar from './Sidebar'
import useRoleCheck from '../hooks/useRoleCheck'
import AdminHeader from './AdminHeader'
import ScrollToTop from '../components/ScrollToTop'
import SearchBar from './SearchBar'
import Footer from './Footer'

function FullLayout() {
    const { isAdmin, isStaff } = useRoleCheck();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        });
        return () => {
            window.removeEventListener('resize', () => { })
        }
    });
    if (windowWidth <= 590) {
        document.getElementById('sidebar')?.classList.remove('sidebar_wrapper_show')
    } else {
        document.getElementById('sidebar')?.classList.add('sidebar_wrapper_show')
    }
    if (windowWidth <= 1000) {
        document.querySelectorAll("#layout,#header-1,#header-2")?.forEach(ele => {
            ele.classList.remove("container");
            ele.classList.add("container-fluid");
        });
    } else {
        document.querySelectorAll("#layout,#header-1,#header-2")?.forEach(ele => {
            ele.classList.remove("container-fluid");
            ele.classList.add("container");
        });
    }

    return (
        <>
            <header>
                {!(isAdmin || isStaff) ?
                    <><Headers /><SearchBar /></> : <AdminHeader />}
            </header>
            <main>
                <div id="main" style={{ minHeight: "calc(52vh + 4px)" }}>
                    <Container id='layout' style={{ marginTop: (isAdmin || isStaff) ? "70px" : "20px", marginBottom: '20px' }} >
                        <Outlet />
                    </Container>
                </div>
                {(isAdmin || isStaff) && <Sidebar />}
                <CartSidebar />
            </main>
            {!(isAdmin || isStaff) && <Footer />}
            <ScrollToTop />
        </>
    )
}

export default FullLayout
