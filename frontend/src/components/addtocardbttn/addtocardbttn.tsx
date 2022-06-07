import { useContext } from "react"

import { CartContext } from "../../contexts/CartContext"
import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext"

import { Button } from "react-bootstrap"
import './addtocardbttn.scss'

type StringDictionary = {
    [key: string]: string[];
}
interface data{
    id: number,
    category?: string,
    model: string,
    options: StringDictionary,
    price: number,
    picture: string,
}
interface Props {
    discountedPrice?: string,
    data: data,
    id: any,
}

const AddToCardBttnComponent: React.FC<Props> = (props) => {
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
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
                    event.stopPropagation();
                    addToCart(addToCartData());
                }}>Add To Cart
        </Button>
        ) : (
        <Button variant="primary" 
                className='mt-auto' 
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
                    event.stopPropagation();
                    addToCart(addToCartData());
                }}><i className="bi bi-cart-plus"></i>
        </Button>
        )
    )
}

export default AddToCardBttnComponent;