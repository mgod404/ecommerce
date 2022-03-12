import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container,Nav } from "react-bootstrap";

const NavbarComponent = () => {
    return(
        <Navbar bg="dark" variant="dark" >
        <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link >Features</Nav.Link>
                <Nav.Link >Pricing</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent