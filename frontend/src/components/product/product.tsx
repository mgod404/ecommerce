import { useNavigate } from "react-router-dom"
import AddToCardBttnComponent from "../addtocardbttn/addtocardbttn"

import { Card, Row, Col } from "react-bootstrap"
import './product.scss'

import { ProductInterface } from '../../pages/category/category'

type StringDictionary = {
    [key: string]: string[]
}
interface DiscountData {
    discount_in_number: number,
    discount_in_percentage: number,
}
interface Props {
    data: ProductInterface,
    isDesktopScreen: boolean,
    discount: DiscountData | null | undefined
}
const Product = (props: Props) => {

    const getProductOptions = (options:StringDictionary) => {
        let index = 0;
        let content:JSX.Element[] = [];
        for (let [key, value] of Object.entries(options)) {
            if(index > 2){break;}
            if(props.isDesktopScreen){
                content.push(<ul key={index} className="options"> {key}: {value} </ul>);
            }else {
                content.push(<span key={index} className='product-details-options'> {key}: {value} |</span>);
            }
            index++;
        }
        return content;
    }

    const navigate = useNavigate();

    const discountedPrice = () => {
        if(!props.discount){
            return
        };
        const normalPrice =  props.data.price
        const discountNumber = props.discount.discount_in_number;
        const discountPercentage = props.discount.discount_in_percentage / 100;
        if(discountNumber > 0){
            return (normalPrice - discountNumber).toFixed(2);
        };
        if(discountPercentage > 0){
            return (normalPrice * (1 - discountPercentage)).toFixed(2);
        }
    }

    return props.isDesktopScreen ? (
            <Card onClick={() => navigate(`/p/${props.data.id}`)} className='on-hover-desktop max-height-desktop'>
                <Card.Img src={props.data.picture}/>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='product-card-body overflow-hidden'>{props.data.brand} {props.data.model}</Card.Title>
                        <div className='product-card-body pb-2'>{getProductOptions(props.data.options)}</div>
                    <Row>
                        <Col className='row justify-content-center align-content-center'>
                            {props.discount ? (
                                <div>
                                    <div className='old-price'>
                                        {props.data.price} EUR
                                    </div>
                                    <div className='discount-price'>
                                        {discountedPrice()} EUR
                                    </div>
                                </div>
                            ) : (
                                <div>{props.data.price} EUR</div>
                            )}
                        </Col>
                        <Col className='d-flex justify-content-end align-self-start'>
                            <AddToCardBttnComponent
                                id={props.data.id}
                                data={props.data}
                                discountedPrice={discountedPrice()}
                                />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
    ) : (
        <Card 
            onClick={() => navigate(`/p/${props.data.id}`)}
            className='d-flex flex-row on-hover-mobile'>
                    <Card.Img 
                        src={props.data.picture}  
                        style={{height:'10rem', width:'12rem'}}
                        />
                    <Card.Body>
                        <Card.Title>
                            {props.data.brand} {props.data.model}
                        </Card.Title>
                        <Card.Text>
                            {getProductOptions(props.data.options)}
                        </Card.Text>
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='d-flex align-items-center'>
                                {props.discount ? (
                                    <div>
                                        <div className='old-price'>
                                            {props.data.price} EUR
                                        </div>
                                        <div className='discount-price'>
                                            {discountedPrice()} EUR
                                        </div>
                                    </div>
                                ) : (
                                    <div>{props.data.price} EUR</div>
                                )}
                            </div>
                            <div className='me-3'>
                                <AddToCardBttnComponent 
                                    id={props.data.id}
                                    data={props.data}
                                    discountedPrice={discountedPrice()}
                                />
                            </div>
                        </div>
                    </Card.Body>
        </Card>
    )
}

export default Product