import {React, useContext } from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Navbar, Container, Nav, NavDropdown,Button, Image } from "react-bootstrap"
import { CartContext } from "../../contexts/CartContext"

const NavbarComponent = () => {
    const {cart, removeProductFromCart} = useContext(CartContext);
    const navigate = useNavigate();

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
                    <NavDropdown.Item className='d-flex flex-row' key={index} onClick={() => navigate(`/p/${product.id}`)}>
                        <div>
                            <Image src={product.picture} width='25rem' height='30rem'/>
                        </div>
                        <div className='overflow-hidden flex-fill px-1'>
                            {product.brand} {product.model}
                        </div>
                        <div className='px-1'>
                            {product.quantity}
                        </div>
                        <div>
                            {product.price}
                        </div>
                        <div className='px-1'>
                            <i className='bi bi-trash align-self-end' onClick={() => removeProductFromCart(product.id)}></i>
                        </div>
                    </NavDropdown.Item>
                    ))}
                    <NavDropdown.Divider />
                    <NavDropdown.Item><Button>Place an Order</Button></NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent