import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavbarComponent from '../../components/navbar/navbar';
import AddToCardBttnComponent from "../../components/addtocardbttn/addtocardbttn"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from "react-bootstrap";
import './productdetails.scss';
import { HOST_URL, API_URL } from "../../CONFIG";
import { ProductInterface } from "../category/category";

type StringDictionary = {
    [key: string]: string[];
}
interface ProductWithDescription extends ProductInterface{
    description: string
}
interface ProdDetailDiscount {
    ends: Date,
    discount_in_number: number,
    discount_in_percentage: number,
    product: number
}
interface FetchedDataInterface {
    product: ProductWithDescription,
    discount?: ProdDetailDiscount
}

const ProductDetails = () => {
    const params = useParams();

    const [fetchedData, setFetchedData] = useState<FetchedDataInterface>();
    const [productDetailsData, setproductDetailsData] = useState<ProductWithDescription>();
    const [oldPrice, setOldPrice] = useState<number>();


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
            const productDetails: ProductWithDescription = fetchedData.product
            setproductDetailsData(productDetails);
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
        if(newPrice){
            newPriceData.product.price = newPrice;
        };
        setproductDetailsData(newPriceData.product);
    },[fetchedData]);

    const getProductOptions = (options:StringDictionary) => {
        let content: JSX.Element[] = [];
        Object.entries(options)
            .forEach(([key, value], index) => content.push(
                <ul className='product-details-options' key={index}>{key}: {value}</ul>
                ));
        return content
    };



    return(productDetailsData ?
        (<div>
            <NavbarComponent></NavbarComponent>
            <div className="details-wrapper-grid">
                    <Card id="picture">
                        <Card.Img src={`${HOST_URL}${productDetailsData.picture}`} />
                    </Card>
                    <Card className="text-center">
                        <Card.Body className='d-flex flex-column justify-content-between' >
                            <Card.Title className='fs-1'>
                                {productDetailsData.brand} {productDetailsData.model}
                            </Card.Title>
                            {/* <Card.Text className='fs-3'>SELECT OPTIONS</Card.Text> */}
                            <div className='fs-4 pb-4'>
                                {getProductOptions(productDetailsData.options)}
                            </div>
                            <Row>
                                <Col>
                                    <div className='fs-3'>
                                        {fetchedData && fetchedData.discount ? (
                                            <div>
                                                <p className="old-price">{oldPrice} EUR</p>
                                                <p className="discount-price">{productDetailsData.price} EUR</p>
                                            </div>
                                        ): (<div>{productDetailsData.price} EUR</div>)}
                                    </div>
                                </Col>
                                <Col>
                                    <AddToCardBttnComponent
                                        id={productDetailsData.id}
                                        data={productDetailsData}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
            </div>
            <div className="flex-container">
                <Card className="product-description">
                    <Card.Title className="m-3">Description</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            {productDetailsData.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>) : (<div></div>)
    );
}

export default ProductDetails;