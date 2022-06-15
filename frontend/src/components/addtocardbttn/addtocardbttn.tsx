import { useContext } from "react"

import { CartContext } from "../../contexts/CartContext"
import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext"
import { ProductInterface } from "../../contexts/CartContext"

import { Button } from "react-bootstrap"
import './addtocardbttn.scss'

interface Props {
    discountedPrice?: string,
    data: ProductInterface,
    id: any,
}

const AddToCardBttnComponent: React.FC<Props> = (props) => {
    const { addToCart } = useContext(CartContext); 
    const isDesktopScreen = useContext(IsDesktopScreenContext);

    const addToCartData = (): ProductInterface => {
        if(!props.discountedPrice){
            return {
                id: props.data.id,
                picture: props.data.picture,
                brand: props.data.brand,
                model: props.data.model,
                price: props.data.price,
            }
        } else {
            return {
                id: props.data.id,
                picture: props.data.picture,
                brand: props.data.brand,
                model: props.data.model,
                price: props.discountedPrice as unknown as number
            }
        }
    }

    return(
        isDesktopScreen? (
        <Button 
                data-testid="addtocardbttndesk"
                variant="primary" 
                className='mt-auto' 
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
                    event.stopPropagation();
                    if(addToCart){
                        addToCart(addToCartData());
                    }
                }}>Add To Cart
        </Button>
        ) : (
        <Button 
                data-testid="addtocardbttnmob"
                variant="primary" 
                className='mt-auto' 
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
                    event.stopPropagation();
                    if(addToCart){
                        addToCart(addToCartData());
                    }
                }}><i className="bi bi-cart-plus"></i>
        </Button>
        )
    )
}

export default AddToCardBttnComponent;