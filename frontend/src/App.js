import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cart from './pages/Cart';
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  const toggleCart = () => {
    document.getElementById('cartSidebar').classList.toggle('cart_wrapper_show');
  }

  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        >
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
            <Container>
              <Navbar.Brand href="#home">Ice-Cream Shop</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#features">Brands</Nav.Link>
                  <Nav.Link href="#pricing">Categories</Nav.Link>
                  <NavDropdown title="Others" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Others</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href="#!" onClick={toggleCart}><i className="bi bi-cart4"></i></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Cart />
          <Home />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App;
