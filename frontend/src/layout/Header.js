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
import Swal from 'sweetalert2';

export default function Header() {
    const toggleCart = () => {
        document.getElementById('cartSidebar').classList.toggle('cart_wrapper_show');
    }
    const navigate = useNavigate()
    const items = useSelector(selectCart);
    const { user, logout } = useContext(UserContext);
    const { isAdmin, isStaff } = useRoleCheck();
    const logoutHandler = () => {
        Swal.fire({
            title: 'Are you sure to logout?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
            }
        })
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top' style={{
            background: '#6a11cb',
            background: '-webkit-linear-gradient(to right, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9))',
            background: ' linear-gradient(to right, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9))',
        }}>
            <Container fluid>
                <Navbar.Brand href="/">Ice-Cream Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/menu')} >Menu</Nav.Link>
                        <Nav.Link onClick={() => navigate('/brands')} >Brands</Nav.Link>
                        <Nav.Link onClick={() => navigate('/about')} >About</Nav.Link>
                        <Nav.Link onClick={() => navigate('/contact')} >Contact</Nav.Link>
                        {!user?.isLoggedIn ? <Link to="/login" className='nav-link'>Sign in</Link> :
                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate('/my-orders')}>Orders</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler} >
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


