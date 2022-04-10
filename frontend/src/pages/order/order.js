import {React, useContext, useState } from "react"
import { CartContext } from "../../contexts/CartContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row, InputGroup, FormControl, Form, Button } from "react-bootstrap";
import './order.scss';

const OrderComponent = () => {
    const {cart, setProductQuantity, removeProductFromCart} = useContext(CartContext);

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    const [form, setForm] = useState({
        email: '',
        name: '',
        surname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        acceptedTerms: false,
    });

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});
    const handleTermsAndConditionsChange = (e) => 
        e.target.checked ? 
        setForm({...form, acceptedTerms: true}) : 
        setForm({...form, acceptedTerms:false});

    const postCart = async (orderId) => {
        const requestCart = cart.map((product) => ({order:orderId, quantity: product.quantity, product: product.id}))
        const response = await fetch(`http://127.0.0.1:8000/api/productordered/`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestCart)
        })
        const data = await response.json();
        console.log(data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/neworder/`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form)
            })
            if(response.status === 201){
                const data = await response.json();
                postCart(data.id);
            }
        } catch (err){
            console.log(err);
        }
        
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
                                    <div style={{width:'4rem'}} className='d-flex align-content-center justify-content-center flex-wrap mx-2'>
                                        <InputGroup className="d-flex align-content-center flex-wrap">
                                            <FormControl
                                            style={{bordercolor:'pink'}}
                                            placeholder={product.quantity}
                                            type='number'
                                            min = '1'
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
                        <div className='fs-3 text-secondary'>TOTAL: {countTotal()} EUR</div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    required
                                    type="email" 
                                    name='email' 
                                    placeholder="Enter email" 
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    required
                                    type="text" 
                                    name='name' 
                                    placeholder="Name" 
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control 
                                    required
                                    type="text" 
                                    name='surname'
                                    placeholder="Surname" 
                                    onChange={handleChange}/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    required
                                    type='text' 
                                    name='address'
                                    placeholder="1234 Main St" 
                                    onChange={handleChange}/>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                    required
                                    type='text'
                                    name='city'
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control 
                                    required
                                    type='text'
                                    name='state'
                                    onChange={handleChange}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control 
                                    required
                                    type='text'
                                    name='zip'
                                    onChange={handleChange}/>
                                </Form.Group>

                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check 
                                    required
                                    type="checkbox" 
                                    label="I accept terms and conditions" 
                                    name='acceptedTerms'
                                    onChange={handleTermsAndConditionsChange}/>
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