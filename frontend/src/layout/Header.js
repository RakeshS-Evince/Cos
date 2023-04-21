import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { selectCart } from '../feature/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
import useRoleCheck from '../hooks/useRoleCheck';

export default function Header() {
    const toggleCart = () => {
        document.getElementById('cartSidebar').classList.toggle('cart_wrapper_show');
    }
    const navigate = useNavigate()
    const items = useSelector(selectCart);
    const { user, logout } = useContext(UserContext);
    const { isAdmin, isStaff } = useRoleCheck()
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand href="/">Ice-Cream Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/brands')} >Brands</Nav.Link>
                        <Nav.Link   >About</Nav.Link>
                        <Nav.Link   >Contact</Nav.Link>
                        {!user?.isLoggedIn ? <Link to="/login" className='nav-link'>Sign in</Link> :
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/my-orders')}>Orders</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => logout()} >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>}
                    </Nav>
                    <Nav>
                        {!(isAdmin || isStaff) && <Nav.Link onClick={() => toggleCart()}>
                            <div className='d-flex'>
                                <i className="fa-sharp fa-solid fa-cart-shopping fa-lg mt-3" style={{ color: "grey" }}></i>
                                <span className="badge rounded-pill badge-notification bg-danger sm">{items.length}</span>
                            </div>
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


