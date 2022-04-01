import {React, useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row, InputGroup, FormControl } from "react-bootstrap";
import './order.css';

const OrderComponent = () => {
    const {cart, setProductQuantity, removeProductFromCart} = useContext(CartContext);

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    return(
        <Container>
            <Col>
                <Card>
                    {cart !== 0 ? (cart.map((product, index) => (
                        <Card key={index}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Img 
                                            src={product.picture} 
                                            style={{width: '4rem', height:'4rem'}}/>
                                    </Col>
                                    <Col>
                                        <Card.Text 
                                            className='fs-2'>
                                                {product.brand} {product.model}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            style={{width:'1rem'}}
                                            placeholder={product.quantity}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) =>{
                                                setProductQuantity(product.id, e.target.value);
                                            }}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Card.Text className='fs-2'>{product.price}</Card.Text>
                                    </Col>
                                    <Col>
                                    <i 
                                        className='bi bi-trash align-self-end'
                                        style={{width:'10rem'}}
                                        onClick={() =>{ 
                                            removeProductFromCart(product.id)}}>
                                    </i>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        ))): (<Card>EMPTY CART</Card>)}
                        <Card>
                            TOTAL: {countTotal()}
                        </Card>
                </Card>
                <Card>
                    Second Card, address details
                </Card>
            </Col>
        </Container>
    )
}

export default OrderComponent