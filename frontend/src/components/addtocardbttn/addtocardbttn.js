import {React, useContext} from "react"

import { CartContext } from "../../contexts/CartContext"
import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext"

import "bootstrap-icons/font/bootstrap-icons.css"
import { Button } from "react-bootstrap"
import './addtocardbttn.scss'

const AddToCardBttnComponent = (props) => {
    const { addToCart } = useContext(CartContext); 
    const {isDesktopScreen} = useContext(IsDesktopScreenContext);

    const addToCartData = () => {
        if(!props.discountedPrice){
            return props.data
        } else {
            return {...props.data, price: props.discountedPrice}
        }
    }

    return(
        isDesktopScreen? (
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event) =>{
                    event.stopPropagation();
                    addToCart(addToCartData());
                }}>Add To Cart
        </Button>
        ) : (
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event) =>{
                    event.stopPropagation();
                    addToCart(addToCartData());
                }}><i className="bi bi-cart-plus"></i>
        </Button>
        )
    )
}

export default AddToCardBttnComponent;