import {React, useContext } from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import {NavDropdown,Button, Image, FormControl, InputGroup } from "react-bootstrap"
import { CartContext } from "../../contexts/CartContext"

const NavbarCartComponent = () => {
    const {cart, removeProductFromCart, setProductQuantity} = useContext(CartContext);
    const navigate = useNavigate();

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    return(
        cart.length !== 0 ? (
            <NavDropdown align='end' title="Cart" className='dropdown-menu-end'>
                {cart.map((product,index) => (
                <NavDropdown.Item className='d-flex flex-row justify-content-center align-items-center' key={index}>
                    <div className='d-flex'>
                        <Image 
                            onClick={() => navigate(`/p/${product.id}`)}
                            src={product.picture} 
                            width='30rem' 
                            height='30rem'/>
                    </div>
                    <div 
                        onClick={() => navigate(`/p/${product.id}`)}
                        className='overflow-hidden flex-fill ps-3'
                        style={{width:'10rem'}}>
                        {product.brand} {product.model}
                    </div>
                    <div className='px-3'>
                        <InputGroup>
                            <FormControl
                            style={{width:'3rem'}}
                            placeholder={product.quantity}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>{
                                setProductQuantity(product.id, e.target.value);
                                e.target.value = '';
                            }}
                            />
                        </InputGroup>
                    </div>
                    <div 
                        className="pe-3">
                        {product.price}
                    </div>
                    <div>
                        <Button 
                            className='bi bi-trash align-self-end'
                            style={{width:'3rem'}}
                            onClick={(e) =>{
                                e.stopPropagation();
                                removeProductFromCart(product.id)}}>
                        </Button>
                    </div>
                </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.ItemText className='d-flex flex-row justify-content-between'>
                    <div className='flex-fill'>
                        <div className='text-center'>Total:</div>
                        <div className='text-center'>{countTotal()} EUR</div>
                    </div>
                    <Button onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/finalizeorder/`)
                        }}>Place an Order</Button>
                </NavDropdown.ItemText>
            </NavDropdown>)
                : 
                (<NavDropdown align='end' title="Cart" className='dropdown-menu-end'>
                    <NavDropdown.Item disabled>Cart is empty.</NavDropdown.Item>
                </NavDropdown>
            ))
} 

export default NavbarCartComponent