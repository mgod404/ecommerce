import { React, useState, useEffect } from "react";
import './home.css';
import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product';


const Home = () => {

    const [productData, setProductData] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/mostpopular/')
        .then(res => res.json())
        .then(data => setProductData(data.results));
    }, []);

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <div id='show-products'>
                <div className='wrapper-grid'>
                    {productData && productData.map(
                        productData => 
                        (<Product
                            brand={productData.brand}
                            model={productData.model}
                            picture={productData.picture}></Product>))}
                </div>
            </div>
        </div>
    )
}

export default Home
