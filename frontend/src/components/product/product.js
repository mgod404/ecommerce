import {useState, React} from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from "react-bootstrap";
import './product.css'


const Product = (props) => {

    const mediaQuery = window.matchMedia('(min-width: 600px)');
    const [isDesktopScreen, setIsDesktopScreen] = useState(mediaQuery.matches);
    mediaQuery.onchange = (e) => {
        if(e.matches){
            setIsDesktopScreen(true);
        }else{
            setIsDesktopScreen(false);
        }
    }

    const getProductOptions = (options) => {
        let index = 0;
        let content = [];
        for (let [key, value] of Object.entries(options)) {
            if(index > 2){break;}
            if(isDesktopScreen){
                content.push(<ul key={index} className="options"> {key}: {value} </ul>);
            }else {
                content.push(<span key={index} className='product-details-options'> {key}: {value} |</span>);
            }
            index++;
        }
        return content;
    }

    const navigate = useNavigate();

    const addToCart = (productToAddToCart, productAmount=1) =>{
        let cart = localStorage.getItem('cart');
        if(cart){
            cart = JSON.parse(cart);
            const idIndex = cart.findIndex(product => product.id === productToAddToCart.id);
            console.log(`idIndex is ${idIndex}`);
            if(idIndex !== -1){
                cart[idIndex].amount = cart[idIndex].amount + productAmount;
                console.log('Old cart, Product found');
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                let passedData = {
                    id: productToAddToCart.id,
                    brand: productToAddToCart.brand,
                    model: productToAddToCart.model,
                    picture: productToAddToCart.picture,
                    price: productToAddToCart.price,
                    amount: productAmount
                }
                cart.push(passedData);
                console.log('Old Cart, product not found');
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        } else {
            let newCart = [];
            let passedData = {
                id: productToAddToCart.id,
                brand: productToAddToCart.brand,
                model: productToAddToCart.model,
                picture: productToAddToCart.picture,
                price: productToAddToCart.price,
                amount: productAmount
            }
            newCart.push(passedData);
            console.log('New Cart made and data pushed');
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
    }


    if(isDesktopScreen){
        return (
                <Card onClick={() => navigate(`/p/${props.data.id}`)}>
                    <Card.Img src={props.data.picture}/>
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title className='product-card-body'>{props.data.brand} {props.data.model}</Card.Title>
                            <div className='product-card-body'>{getProductOptions(props.data.options)}</div>
                        <Row>
                            <Col className='row justify-content-center align-content-center'>{props.data.price} EUR</Col>
                            <Col>
                                <Button id={props.data.id}
                                        variant="primary" 
                                        className='mt-auto' 
                                        onClick={(event) =>{
                                            event.stopPropagation();
                                            addToCart(props.data);
                                        }}>Add To Cart
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
        )
    } 
    else {
        return(
            <Card style={{ margin: '0.1rem'}} onClick={() => navigate(`/p/${props.data.id}`)}>
                <Row>
                    <Col>
                        <Card.Img src={props.data.picture} />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{props.data.brand} {props.data.model}</Card.Title>
                            <Card.Text>
                                {getProductOptions(props.data.options)}
                            </Card.Text>
                            <Button id={props.data.id}
                                        variant="primary" 
                                        className='mt-auto' 
                                        onClick={(event) =>{
                                            event.stopPropagation();
                                            addToCart(props.data);
                                        }}>Add To Cart
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default Product