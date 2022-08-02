import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../contexts/CartContext"

import { Card, Col, Row, InputGroup, FormControl, Form, Button, Alert } from "react-bootstrap"
import './order.scss'

import { HOST_URL, API_URL } from "../../CONFIG"

import { ProductInterface } from "../../contexts/CartContext"

export interface CartInterface extends ProductInterface{
    quantity: number
}

const OrderComponent = () => {
    const navigate = useNavigate();
    const {cart, setProductQuantity, removeProductFromCart} = useContext(CartContext);
    const [alert, setAlert] = useState('');

    const countTotal = () => {
        let sum = 0;
        if(!cart) return
        cart.forEach((element:ProductInterface) =>  element.quantity && element.price ?
                                                    sum = sum + (element.quantity * element.price): sum);
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

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => setForm({...form, [e.target.name]: e.target.value});
    const handleTermsAndConditionsChange = (e:React.ChangeEvent<HTMLInputElement>) => 
        e.target.checked ? 
        setForm({...form, acceptedTerms: true}) : 
        setForm({...form, acceptedTerms:false});

    const postCart = async (orderId:number) => {
        if(!cart) return;
        const requestCart = cart.map((product:ProductInterface) => ({order:orderId, quantity: product.quantity, product: product.id}))
        const response = await fetch(`${API_URL}/productordered/`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestCart)
        })
        if(response.status === 201){
            navigate(`/payment/${orderId}/`);
        } else {
            const data = await response.json();
            setAlert(data.error.toString());
        }
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        try{
            const response = await fetch(`${API_URL}/neworder/`, {
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
        e.preventDefault();
    }

    return(
        <div className='d-flex flex-row justify-content-center'>
            <Col style={{maxWidth:'50rem'}}>
                <Card className='my-3 border-bottom-0'>
                    {cart && cart.length !== 0 ? (cart.map((product:ProductInterface, index:number) => (
                        <Card className='border-start-0 border-top-0 border-end-0' key={index}>
                            <Card.Body className='d-flex flex-row justify-content-between'>
                                    <div className='image-size'>
                                        <Card.Img 
                                            src={`${HOST_URL}${product.picture}`} 
                                            style={{width: '3pem', height:'3pem'}}
                                            />
                                    </div>
                                    <div className='d-flex flex-fill align-content-center justify-content-center flex-wrap'>
                                        <Card.Text 
                                            className='order-fontsize'>
                                                {product.brand} {product.model}
                                        </Card.Text>
                                    </div>
                                    <div className='d-flex align-content-center justify-content-center flex-wrap mx-2 inputgroup-width'>
                                        <InputGroup className="d-flex align-content-center flex-wrap">
                                            <FormControl
                                            style={{borderColor:'pink', width:'1rem'}}
                                            placeholder={product.quantity?.toString()}
                                            type='number'
                                            min = '1'
                                            onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
                                                let doc = document.getElementById(index.toString());
                                                if(!doc) return;
                                                if(e.target.value === ''){
                                                    e.stopPropagation();
                                                    doc.innerText = '';
                                                    return
                                                }
                                                if(e.target.value as unknown as number > 0){
                                                    if(!setProductQuantity || !product.id || !e.target.value) return;
                                                    setProductQuantity(product.id, e.target.value as unknown as number);
                                                    doc.innerText = '';
                                                    return
                                                }
                                                e.stopPropagation();
                                                doc.innerText = 'Quantity must be higher than 0';
                                            }}
                                            /> 
                                        </InputGroup>
                                        <div style={{color:'red', fontSize:'0.8rem'}} id={index.toString()}></div>
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
                                            if(!removeProductFromCart || !product.id) return;
                                            removeProductFromCart(product.id);
                                            }}>
                                    </Button>
                                    </div>
                            </Card.Body>
                        </Card>
                        ))): (<Card>EMPTY CART</Card>)}
                </Card>
                <Card className='mb-3'>
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

                            {alert ? (<Alert variant="danger">{alert}</Alert>) : ''}
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