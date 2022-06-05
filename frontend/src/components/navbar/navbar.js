import { React, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import "bootstrap-icons/font/bootstrap-icons.css"
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap"
import './navbar.scss';
import NavbarCartComponent from "../navbarcart/navbarcart"
import FilterComponent from "../filter/filter"

import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext"

const NavbarComponent = (props) => {
    const navigate = useNavigate();
    const [filterTrigger, setFilterTrigger] = useState(false);
    const {isDesktopScreen} = useContext(IsDesktopScreenContext);

    return(
        <Navbar bg="dark" variant="dark" >
        <Container>
            <Navbar.Brand onClick={() => navigate(`/`)}>Home</Navbar.Brand>
            {isDesktopScreen ? (
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate(`/smartphones/`)}>Smartphones</Nav.Link>
                    <Nav.Link onClick={() => navigate(`/laptops/`)}>Laptops</Nav.Link>
                </Nav>) : (
                    <NavDropdown title={"Categories"} id="nav-dropdown-title">
                        <NavDropdown.ItemText onClick={() => navigate(`/smartphones/`)}>Smartphones</NavDropdown.ItemText>
                        <NavDropdown.ItemText onClick={() => navigate(`/laptops/`)}>Laptops</NavDropdown.ItemText>
                    </NavDropdown>
                )}
            <Nav className='justify-content-end'>
                {props.category ? 
                    <div>
                        <Button variant="outline-secondary" onClick={() => setFilterTrigger(true)}>Filter</Button>
                        <FilterComponent 
                            category={props.category}
                            filterTrigger={filterTrigger} 
                            setFilterTrigger={setFilterTrigger}
                            setProductFilters={props.setProductFilters}
                            productFilters={props.productFilters}
                            fetchProducts={props.fetchProducts}
                            searchParams={props.searchParams}
                            setSearchParams={props.setSearchParams}
                        />
                    </div> : ''}
                <NavbarCartComponent/>
            </Nav>
        </Container>
        </Navbar>
    )
}

export default NavbarComponent