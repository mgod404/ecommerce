import {React, useContext } from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import {NavDropdown,Button, Image, FormSelect } from "react-bootstrap"
import { CartContext } from "../../contexts/CartContext"

const NavbarCartComponent = () => {
    const {cart, removeProductFromCart, setProductQuantity} = useContext(CartContext);
    const navigate = useNavigate();

    const generateOptions = (quantity) => {
        let content = [];
        for(let i = 1; i <= 10; i++){
            if(i === quantity){
                continue;
            }
            content.push(<option value={i} key={i}>{i}</option>);
        }
        return content;
    }

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum= sum + (element.quantity * element.price));
        return sum
    }

    return(
        cart.length !== 0 ? (
            <NavDropdown align='end' title="Cart" className='dropdown-menu-end'>
                {cart.map((product,index) => (
                <NavDropdown.Item className='d-flex flex-row' key={index}>
                    <div>
                        <Image 
                            onClick={() => navigate(`/p/${product.id}`)}
                            src={product.picture} 
                            width='25rem' 
                            height='30rem'/>
                    </div>
                    <div 
                        onClick={() => navigate(`/p/${product.id}`)}
                        className='overflow-hidden flex-fill ps-3 text-center'
                        style={{width:'10rem'}}>
                        {product.brand} {product.model}
                    </div>
                    <div 
                        className='px-3'>
                        <FormSelect 
                            style={{width:'5rem'}}
                            defaultValue={product.quantity} 
                            onClick={(e)=> e.stopPropagation()}
                            onChange={(e) =>{
                                setProductQuantity(product.id, e.target.value);
                            }}>
                                {generateOptions(product.quantity)}
                        </FormSelect>
                    </div>
                    <div 
                        className="pe-3">
                        {product.price}
                    </div>
                    <div>
                        <i 
                            className='bi bi-trash align-self-end'
                            style={{width:'2rem'}}
                            onClick={() =>{ 
                                removeProductFromCart(product.id)}}>
                        </i>
                    </div>
                </NavDropdown.Item>
                ))}
                <NavDropdown.Divider />
                <NavDropdown.Item className='d-flex flex-row justify-content-between'>
                    <div className='flex-fill'>
                        <div className='text-center'>Total:</div>
                        <div className='text-center'>{countTotal()} EUR</div>
                    </div>
                    <Button>Place an Order</Button>
                </NavDropdown.Item>
            </NavDropdown>)
                : 
                (<NavDropdown align='end' title="Cart" className='dropdown-menu-end'>
                    <NavDropdown.Item>Cart is empty.</NavDropdown.Item>
                </NavDropdown>
            ))
} 

export default NavbarCartComponent