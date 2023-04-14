import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import { selectCart } from '../feature/cartSlice';

export default function Header() {
    const toggleCart = () => {
        document.getElementById('cartSidebar').classList.toggle('cart_wrapper_show');
    }
    const items = useSelector(selectCart)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
            <Container>
                <Navbar.Brand href="/">Ice-Cream Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link   >Brands</Nav.Link>
                        <Nav.Link   >Categories</Nav.Link>
                        <NavDropdown title="Others" id="collasible-nav-dropdown">
                            <NavDropdown.Item   >Others</NavDropdown.Item>
                            <NavDropdown.Item   >
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item   >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item   >
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => toggleCart()}>
                            <div className='d-flex'>
                                <i className="fa-sharp fa-solid fa-cart-shopping fa-lg mt-3" style={{ color: "grey" }}></i>
                                <span className="badge rounded-pill badge-notification bg-danger sm">{items.length}</span>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


