import {React} from "react"
import { useNavigate } from "react-router-dom"

import "bootstrap-icons/font/bootstrap-icons.css"
import { Navbar, Container, Nav,} from "react-bootstrap"
import './navbar.scss';
import NavbarCartComponent from "../navbarcart/navbarcart"

const NavbarComponent = () => {
    const navigate = useNavigate();

    return(
        <Navbar bg="dark" variant="dark" >
        <Container>
            <Navbar.Brand onClick={() => navigate(`/`)}>Home</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => navigate(`/smartphones/`)}>Smartphones</Nav.Link>
                <Nav.Link onClick={() => navigate(`/laptops/`)}>Laptops</Nav.Link>
            </Nav>
            <Nav className='justify-content-end'>
                <NavbarCartComponent/>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent