import {React, useContext} from "react";

import { CartContext } from "../../contexts/CartContext";
import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext";

import "bootstrap-icons/font/bootstrap-icons.css"
import { Button } from "react-bootstrap";
import './addtocardbttn.scss';

const AddToCardBttnComponent = (props) => {
    const { addToCart } = useContext(CartContext); 
    const {isDesktopScreen} = useContext(IsDesktopScreenContext);

    return(
        isDesktopScreen? (
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event) =>{
                    event.stopPropagation();
                    addToCart(props.data);
                }}>Add To Cart
        </Button>
        ) : (
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event) =>{
                    event.stopPropagation();
                    addToCart(props.data);
                }}><i class="bi bi-cart-plus"></i>
        </Button>
        )
    )
}

export default AddToCardBttnComponent;