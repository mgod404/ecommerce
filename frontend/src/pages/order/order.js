import {React, useContext, useEffect, useState } from "react"
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

    const [form, setForm] = useState({
        cart: cart,
        email: '',
        name: '',
        surname: '',
        Address: '',
        City: '',
        State: '',
        Zip: '',
        acceptedTerms: false,
    });

    const handleChange = (e) =>{
        setForm({[e.target.name]:e.target.value});
    }

    useEffect(()=>console.log(form),[form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/api/neworder/`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cart)
        })
        .then(()=> console.log('New Order Added'));
    }

    return(
        <div className='d-flex flex-row justify-content-center'>
            <Col style={{maxWidth:'50rem'}}>
                <Card>
                    {cart !== 0 ? (cart.map((product, index) => (
                        <Card key={index}>
                            <Card.Body className='d-flex flex-row justify-content-between'>
                                    <div className='d-flex flex-fill align-content-center justify-content-center flex-wrap'>
                                        <Card.Img 
                                            src={product.picture} 
                                            style={{width: '3rem', height:'3rem'}}/>
                                    </div>
                                    <div className='d-flex flex-fill align-content-center justify-content-center flex-wrap'>
                                        <Card.Text 
                                            className='order-fontsize'>
                                                {product.brand} {product.model}
                                        </Card.Text>
                                    </div>
                                    <div style={{width:'3rem'}} className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <InputGroup className="d-flex align-content-center flex-wrap">
                                            <FormControl
                                            style={{bordercolor:'pink'}}
                                            placeholder={product.quantity}
                                            onChange={(e) =>{
                                                if(e.target.value === ''){
                                                    e.stopPropagation();
                                                    document.getElementById(index).innerText = '';
                                                    return
                                                }
                                                if(e.target.value > 0){
                                                    setProductQuantity(product.id, e.target.value);
                                                    document.getElementById(index).innerText = '';
                                                    return
                                                }
                                                e.stopPropagation();
                                                document.getElementById(index).innerText = 'Quantity must be higher than 0';
                                            }}
                                            /> 
                                        </InputGroup>
                                        <div style={{color:'red', fontSize:'0.8rem'}} id={index}></div>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center flex-wrap'>
                                        <Card.Text className='order-fontsize order-price-width'>
                                            {product.price}
                                        </Card.Text>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <Card.Text className='order-fontsize order-currency-width'>EUR</Card.Text>
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
                <Card>
                    <Card.Body>
                        <div className='fs-3'>TOTAL: {countTotal()} EUR</div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name='email' 
                                    placeholder="Enter email" 
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name='name' 
                                    placeholder="Name" 
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name='surname'
                                    placeholder="Surname" 
                                    onChange={handleChange}/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='address'
                                    placeholder="1234 Main St" 
                                    onChange={handleChange}/>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control />
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