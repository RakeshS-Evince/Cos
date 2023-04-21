import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
function AdminHeader() {
    const navigate = useNavigate()
    const { user, logout } = useContext(UserContext);
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top' >
                <Container>
                    <Navbar.Brand href="/">Ice-Cream Shop</Navbar.Brand>
                    <Nav>
                        <NavDropdown id="collasible-nav-dropdown" title={<i className="bi bi-person-fill" style={{ color: "grey", fontSize: "1.5rem" }}></i>}>
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
