import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"

const NavbarComponent = () => {
    return(
        <Navbar bg="dark" variant="dark" >
        <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/smartphones/">Smartphones</Nav.Link>
                <Nav.Link href="/laptops/">Laptops</Nav.Link>
            </Nav>
            <Nav className='justify-content-end'>
                <NavDropdown align='end' title="Cart" NameClass='dropdown-menu-end'>
                    <NavDropdown.Item className='d-flex flex-row'>
                        <p>fguirghruigtrhuigtrhgutrhuixxxx</p>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent