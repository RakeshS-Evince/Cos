import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context/UserContextProvider';
function AdminHeader() {
    const { user, logout } = useContext(UserContext);
    const toggleSidebar = () => {
        document.getElementById('sidebar').classList.toggle('sidebar_wrapper_show');
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top' >
                <Container>
                    <i className="bi bi-list"onClick={()=>toggleSidebar()} style={{ color: "grey", fontSize: "1.5rem"}}></i>
                    <Navbar.Brand href="/">Ice-Cream Shop</Navbar.Brand>
                    <Nav>
                        <NavDropdown id="collasible-nav-dropdown" title={<><span className='text-white'>{user?.username}</span><i className="bi bi-person-fill ms-2" style={{ color: "grey", fontSize: "1.5rem" }}></i></>}>
                            <NavDropdown.Item onClick={() => logout()} >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default AdminHeader
