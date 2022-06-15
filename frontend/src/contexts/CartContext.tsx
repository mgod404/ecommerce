import {createContext, useEffect, useState} from 'react'

export interface ProductInterface {
    id?: number,
    picture?: string,
    brand?: string,
    model?: string,
    price?: number,
    quantity?: number
}
interface CartContextInterface {
    cart?: ProductInterface[],
    addToCart?: (product: ProductInterface, quantity?: number) => void,
    setProductQuantity?: (productId: number, quantity?: number) => void,
    removeProductFromCart?: (productId: number) => void,
    clearCart?: () => void
}
export const CartContext = createContext<CartContextInterface>({});

interface Props {
    children: React.ReactNode
}
const CartContextProvider = (props:Props) =>{

    const [cart, setCart] = useState((): ProductInterface[]=> {
        const cartInLocalStorage = localStorage.getItem('cart');
        return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
    });
    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]);

    const addToCart = (product:ProductInterface, quantity=1) => {
        //In order to make components rerender 
        //Each time the cart value changes
        //A new array must be created
        //Otherwise the change won't trigger rerender
        let newCart = [...cart];
        let productInCartId = newCart.findIndex((productInCart) => productInCart.id === product.id);
        if(productInCartId === -1){
            newCart.push({
                id: product.id, 
                picture: product.picture,
                brand: product.brand, 
                model: product.model, 
                price: product.price, 
                quantity: quantity
            });
            setCart(newCart);
            return
        }
        const currentProductQuantity = newCart[productInCartId].quantity; 
        if(currentProductQuantity){
            newCart[productInCartId].quantity = currentProductQuantity + quantity;
        } else {
            newCart[productInCartId].quantity = quantity;
        };
        setCart(newCart);
    }

    const setProductQuantity = (productId:number, quantity=1) => {
        let newCart = [...cart];
        let productInCartId = newCart.findIndex(product => product.id === productId);
        newCart[productInCartId].quantity = quantity;
        setCart(newCart);
    }

    const removeProductFromCart = (productId:number) => {
        setCart(cart.filter((product:ProductInterface) => product.id !== productId));
    }

    const clearCart = () => setCart([]);

    return(
        <CartContext.Provider value={{cart, addToCart, setProductQuantity, removeProductFromCart, clearCart}}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;