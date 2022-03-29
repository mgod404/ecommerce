import {React, useContext, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Navbar, Container, Nav, NavDropdown, Col } from "react-bootstrap"
import { CartContext } from "../../contexts/CartContext"

const NavbarComponent = () => {
    const {cart, removeProductFromCart} = useContext(CartContext);

    useEffect(()=> console.log('Navbar here, cart is ' + JSON.stringify(cart)), [cart]);

    return(
        <Navbar bg="dark" variant="dark" >
        <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/smartphones/">Smartphones</Nav.Link>
                <Nav.Link href="/laptops/">Laptops</Nav.Link>
            </Nav>
            <Nav className='justify-content-end'>
                <NavDropdown align='end' title="Cart" className='dropdown-menu-end'>
                    {cart && cart.map((product,index) => (
                    <NavDropdown.Item className='d-flex flex-row' key={index}>
                        <Col>
                        </Col>
                        <Col className='overflow-hidden flex-fill px-1'>
                            {product.brand} {product.model}
                        </Col>
                        <Col className='px-1'>
                            {product.quantity}
                        </Col>
                        <Col>
                            {product.price}
                        </Col>
                        <Col>
                            <i className='bi bi-trash align-self-end' onClick={() => removeProductFromCart(product.id)}></i>
                        </Col>
                    </NavDropdown.Item>
                    ))}
                </NavDropdown>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent