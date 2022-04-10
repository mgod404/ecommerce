import {React} from "react"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Navbar, Container, Nav,} from "react-bootstrap"
import './navbar.scss'
import NavbarCartComponent from "../navbarcart/navbarcart"

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
                <NavbarCartComponent/>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent