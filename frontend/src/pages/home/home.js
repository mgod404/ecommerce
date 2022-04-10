import { React, useContext } from "react";
import './home.scss';
import NavbarComponent from '../../components/navbar/navbar';
import { CartContext } from "../../contexts/CartContext";


const Home = () => {
    const cart = useContext(CartContext);

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <div><p>{ cart.cart }</p></div>
        </div>
    )
}

export default Home
