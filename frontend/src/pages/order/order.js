import {React, useContext } from "react"
import { CartContext } from "../../contexts/CartContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, InputGroup, FormControl, Form, Button } from "react-bootstrap";
import './order.css';

const OrderComponent = () => {
    const {cart, setProductQuantity, removeProductFromCart} = useContext(CartContext);

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    return(
        <div style={{maxWidth:'50rem'}}>
            <Col>
                <Card className='m-2'>
                    {cart !== 0 ? (cart.map((product, index) => (
                        <Card key={index} className='m-1'>
                            <Card.Body className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-fill align-content-center justify-content-center flex-wrap'>
                                        <Card.Img 
                                            src={product.picture} 
                                            style={{width: '3rem', height:'3rem'}}/>
                                    </div>
                                    <div className='d-flex flex-fill align-content-center justify-content-center flex-wrap'>
                                        <Card.Text 
                                            className='fs-5'>
                                                {product.brand} {product.model}
                                        </Card.Text>
                                    </div>
                                    <div style={{width:'3rem'}} className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <InputGroup className="d-flex align-content-center flex-wrap">
                                            <FormControl
                                            placeholder={product.quantity}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) =>{
                                                setProductQuantity(product.id, e.target.value);
                                            }}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <Card.Text style={{width:'5rem'}}className='fs-5 justify-content-around'>{product.price}</Card.Text>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <Card.Text style={{width:'3rem'}}className='fs-5'>EUR</Card.Text>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center'>
                                    <Button 
                                        className='bi bi-trash'
                                        onClick={() =>{ 
                                            removeProductFromCart(product.id)}}>
                                    </Button>
                                    </div>
                            </Card.Body>
                        </Card>
                        ))): (<Card>EMPTY CART</Card>)}
                </Card>
                <Card className='m-2'>
                    <Card.Body>
                        <div className='fs-2'>TOTAL: {countTotal()}</div>
                    </Card.Body>
                </Card>
                <Card className='m-2'>
                    <Card.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" placeholder="Surname" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="I accept terms and conditions" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default OrderComponent