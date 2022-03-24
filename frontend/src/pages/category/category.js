import { React, useState, useEffect } from "react";
import './category.css';
import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product';


const Category = (props) => {

    const [productData, setProductData] = useState(null);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/c/' + props.category + '/')
        .then(res => res.json())
        .then(data => setProductData(data.results));
    }, []);

    return (
        <div>
            <NavbarComponent></NavbarComponent>
                <div className='wrapper-grid'>
                    {productData && productData.map(
                        (productData,index) => 
                        (<Product
                            data={productData}
                            key={index}>
                        </Product>))}
                </div>
        </div>
    )
}

export default Category;
