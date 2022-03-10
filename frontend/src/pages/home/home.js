import { React, useState } from "react";
import './home.css';
import NavbarComponent from '../../components/navbar';
import Product from '../../components/product';


const Home = () => {

    const mediaQuery = window.matchMedia('(min-width: 600px)');
    console.log(mediaQuery);
    mediaQuery.onchange = (e) => {
        if(e.matches){
            setIsDesktopScreen(true);
        }else{
            setIsDesktopScreen(false);
        }
    }
    const [isDesktopScreen, setIsDesktopScreen] = useState(mediaQuery.matches);

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <div id='show-products'>
                <div className='wrapper-grid'>
                    <Product isDesktopScreen={isDesktopScreen}></Product>
                </div>
            </div>
        </div>
    )
}

export default Home
