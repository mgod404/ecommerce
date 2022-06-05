import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../components/navbar/navbar';
import AddToCardBttnComponent from "../../components/addtocardbttn/addtocardbttn"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from "react-bootstrap";
import './productdetails.scss';
import { API_URL } from "../../CONFIG";

const ProductDetails = () => {
    const params = useParams();

    const [fetchedData, setFetchedData] = useState(null);
    const [productDetailsData, setproductDetailsData] = useState(null);
    const [oldPrice, setOldPrice] = useState(null);


    useEffect(() => {
        fetch(`${API_URL}/p/${params.productid}/`)
        .then(res => res.json())
        .then(data => setFetchedData(data))
        .catch(e => console.log(e));
    }, [params.productid]);

    useEffect(() => {
        if(!fetchedData){
            return
        }
        if(!fetchedData.discount){
            setproductDetailsData(fetchedData);
            return
        }

        const getDiscountedPrice = () => {
            if(!fetchedData.discount){
                return fetchedData.product.price
            };
            const discountNumber = fetchedData.discount.discount_in_number;
            const discountPercentage = fetchedData.discount.discount_in_percentage / 100;
            if(discountNumber > 0){
                return fetchedData.product.price - discountNumber;
            };
            if(discountPercentage > 0){
                return fetchedData.product.price * (1 - discountPercentage);
            };
        }


        let newPriceData = {...fetchedData};
        const newPrice = getDiscountedPrice();
        setOldPrice(fetchedData.product.price);
        newPriceData.product.price = newPrice;
        setproductDetailsData(newPriceData);
    },[fetchedData]);

    const getProductOptions = (options) => {
        let content = [];
        Object.entries(options)
            .forEach(([key, value], index) => content.push(
                <ul className='product-details-options' key={index}>{key}: {value}</ul>
                ));
        return content
    };



    return(productDetailsData && 
        (<div>
            <NavbarComponent></NavbarComponent>
            <div className="details-wrapper-grid">
                    <Card id="picture">
                        <Card.Img src={productDetailsData.product.picture} />
                    </Card>
                    <Card className="text-center">
                        <Card.Body className='d-flex flex-column'>
                            <Card.Title className='fs-1'>
                                {productDetailsData.product.brand} {productDetailsData.product.model}
                            </Card.Title>
                            {/* <Card.Text className='fs-3'>SELECT OPTIONS</Card.Text> */}
                            <div className='fs-4 pb-4'>
                                {getProductOptions(productDetailsData.product.options)}
                            </div>
                            <Row>
                                <Col>
                                    <div className='fs-3'>
                                        {fetchedData.discount ? (
                                            <div>
                                                <p className="old-price">{oldPrice} EUR</p>
                                                <p className="discount-price">{productDetailsData.product.price} EUR</p>
                                            </div>
                                        ): (<div>{productDetailsData.product.price} EUR</div>)}
                                    </div>
                                </Col>
                                <Col>
                                    <AddToCardBttnComponent
                                        id={productDetailsData.product.id}
                                        data={productDetailsData.product}>
                                    </AddToCardBttnComponent>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
            </div>
            <div className="flex-container">
                <Card className="product-description">
                    <Card.Body>
                        <Card.Text>
                            {productDetailsData.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>)
    );
}

export default ProductDetails;