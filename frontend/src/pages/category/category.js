import { React, useState, useEffect } from "react";

import './category.scss';

import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product';
import { Form } from "react-bootstrap";

const Category = (props) => {
    const [productData, setProductData] = useState(null);
    const [productFilters, setProductFilters] = useState({
        'brand__in': [],
        'price_max': '',
        'price_min': '',
        'ordering':''
    });
    const [searchParams, setSearchParams] = useState([]);

    const fetchProducts = async (searchParams = []) => {
        let params = '';
        Object.entries(searchParams).forEach( ([index, filter]) => {
            console.log(filter);
            params = params + `${filter.name}=${filter.value}&`;
        });
        let fetchURL = new URL(`http://127.0.0.1:8000/api/c/${props.category}/?${params}`);
        console.log(`fn worked here is url ${fetchURL}`);
        const response = await fetch(fetchURL);
        const data = await response.json();
        setProductData(data.result);
        console.log(data);
    }


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <NavbarComponent 
                category={props.category}
                productFilters={productFilters}
                setProductFilters={setProductFilters}
                fetchProducts={fetchProducts}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
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
                                'order_by':e.target.value
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
