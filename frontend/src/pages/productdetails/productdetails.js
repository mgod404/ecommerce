import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../components/navbar/navbar';
import AddToCardBttnComponent from "../../components/addtocardbttn/addtocardbttn"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from "react-bootstrap";
import './productdetails.css';

const ProductDetails = () => {
    const params = useParams();

    const [productDetailsData, setproductDetailsData] = useState(null);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/p/${params.productid}/`)
        .then(res => res.json())
        .then(data => setproductDetailsData(data));
    }, [params.productid]);

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
                        <Card.Img src={productDetailsData.picture} />
                    </Card>
                    <Card className="text-center">
                        <Card.Body className='d-flex flex-column'>
                            <Card.Title className='fs-1'>{productDetailsData.brand} {productDetailsData.model}</Card.Title>
                            <Card.Text className='fs-3'>SELECT OPTIONS</Card.Text>
                            <div className='fs-4 pb-4'>
                                {getProductOptions(productDetailsData.options)}
                            </div>
                            <Row>
                                <Col>
                                    <Card.Text className='fs-3'>{productDetailsData.price} EUR</Card.Text>
                                </Col>
                                <Col>
                                    <AddToCardBttnComponent
                                        id={productDetailsData.id}
                                        data={productDetailsData}>
                                    </AddToCardBttnComponent>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
            </div>
            <div className="flex-container">
                <Card className="product-description"><Card.Body><Card.Text>{productDetailsData.description}</Card.Text></Card.Body></Card>
            </div>
        </div>)
    );
}

export default ProductDetails;