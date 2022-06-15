import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CartContext } from "../../contexts/CartContext"

import "bootstrap-icons/font/bootstrap-icons.css"
import {NavDropdown,Button, Image, FormControl, InputGroup, DropdownButton } from "react-bootstrap"
import './navbarcart.scss'

import { ProductInterface } from "../../contexts/CartContext"
import { HOST_URL } from "../../CONFIG"

const NavbarCartComponent = () => {
    const {cart, removeProductFromCart, setProductQuantity} = useContext(CartContext);
    const navigate = useNavigate();

    const countTotal = () => {
        let sum = 0;
        if(!cart) return;
        cart.forEach((element:ProductInterface) =>  element.quantity && element.price ? 
                                                    sum = sum + (element.quantity * element.price): sum);
        return sum
    };

    const navDropdownTitle = (<i className="bi bi-cart-plus"></i>);

    return(
        cart && cart.length !== 0 ? (
            <DropdownButton align='end' title={navDropdownTitle} className='dropdown-menu-end ms-2' style={{color:'yellow'}}>
                {cart.map((product:ProductInterface,index:number) => (
                <NavDropdown.Item className='d-flex flex-row justify-content-center align-items-center' key={index}>
                    <div className='d-flex'>
                        <Image 
                            onClick={() => navigate(`/p/${product.id}`)}
                            src={`${HOST_URL}${product.picture}`} 
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
                            placeholder={product.quantity as unknown as string}
                            onClick={(e:React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                if(!product.id || !setProductQuantity) return;
                                setProductQuantity(product.id, e.target.value as unknown as number);
                                e.target.value = '';
                            }}
                            min="1"
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
                            onClick={(e:React.MouseEvent<HTMLButtonElement>) =>{
                                e.stopPropagation();
                                if(!removeProductFromCart || !product.id) return;
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
                    <Button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        navigate(`/finalizeorder/`)
                        }}>Place an Order</Button>
                </NavDropdown.ItemText>
            </DropdownButton>)
                : 
                (<DropdownButton align='end' title={navDropdownTitle} className='dropdown-menu-end ms-2'>
                    <NavDropdown.Item disabled>Cart is empty.</NavDropdown.Item>
                </DropdownButton>
            ))
} 

export default NavbarCartComponent