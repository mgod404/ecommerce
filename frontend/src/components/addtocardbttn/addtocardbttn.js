import {React, useContext} from "react";
import { Button } from "react-bootstrap";
import './addtocardbttn.scss';
import { CartContext } from "../../contexts/CartContext";
import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext";

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
                }}>Add To Cart
        </Button>
        )
    )
}

export default AddToCardBttnComponent;