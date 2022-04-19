import { React, useState, useEffect } from "react";

import './category.scss';

import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product';
import { Form } from "react-bootstrap";

const Category = (props) => {
    const [productData, setProductData] = useState(null);
    const [productFilters, setProductFilters] = useState({
        'brand': [],
        'price_max': '',
        'price_min': '',
        'ordering':''
    });


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/search/?brand=${productFilters.brand}&category=${props.category}&ordering=${productFilters.ordering}&price_max=${productFilters.price_max}&price_min=${productFilters.price_min}`)
        .then(res => res.json())
        .then(data => setProductData(data.results));
        console.log(productFilters);
    }, [ props, productFilters ]);

    return (
        <div>
            <NavbarComponent 
                category={props.category}
                productFilters={productFilters}
                setProductFilters={setProductFilters}
                />
                <div className='d-flex flex-row justify-content-center'>
                    <div className="fs-5 text-center d-flex align-items-center">Sort by</div>
                    <Form.Select 
                        aria-label='--' 
                        className='m-2 sort-by-width' 
                        defaultValue=''
                        onChange={(e) => {
                            setProductFilters({
                                ...productFilters,
                                'ordering':e.target.value
                            });
                        }}
                        >
                        <option value=''></option>
                        <option value='price'>Price - Ascending</option>
                        <option value='-price'>Price - Descending</option>
                    </Form.Select>
                </div>
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
