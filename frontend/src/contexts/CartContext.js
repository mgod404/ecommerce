import {createContext, useEffect, useState} from 'react'

export const CartContext = createContext();

const CartContextProvider = (props) =>{
    const [cart, setCart] = useState(()=>
        localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    );
    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]);

    const addToCart = (product, quantity=1) => {
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
        newCart[productInCartId].quantity = parseInt(newCart[productInCartId].quantity) + quantity;
        setCart(newCart);
    }

    const setProductQuantity = (productId, quantity=1) => {
        let newCart = [...cart];
        let productInCartId = newCart.findIndex(product => product.id === productId);
        newCart[productInCartId].quantity = quantity;
        setCart(newCart);
    }

    const removeProductFromCart = (productId) => {
        setCart(cart.filter(product => product.id !== productId));
    }

    return(
        <CartContext.Provider value={{cart, addToCart, setProductQuantity, removeProductFromCart}}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartContextProvider;