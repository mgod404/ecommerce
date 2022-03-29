import {React, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from "react-bootstrap"
import { CartContext } from "../../contexts/CartContext";

const AddToCardBttnComponent = (props) => {
    const { addToCart } = useContext(CartContext); 

    return(
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event) =>{
                    event.stopPropagation();
                    addToCart(props.data);
                }}>Add To Cart
        </Button>
    )
}

export default AddToCardBttnComponent;