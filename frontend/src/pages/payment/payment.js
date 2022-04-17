import { React, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { CartContext } from "../../contexts/CartContext"

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from "react-bootstrap"
import './payment.scss'
import CheckPaymentStatusComponent from "../../components/checkpaymentstatus/checkpaymentstatus"



const PaymentComponent = () => {
    const {cart} = useContext(CartContext);
    const params = useParams();
    const [paypalButtonClicked, setPaypalButtonClicked] = useState(false);

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    return (
    <div className='d-flex flex-row justify-content-center'>
        <Card className='m-5 p-3'>
            {paypalButtonClicked ? 
                <CheckPaymentStatusComponent orderId={params.orderid}/> : 
                <div>
                    <Card.Title className='text-center fs-2 text-secondary'>Total Price</Card.Title>
                    <Card.Title className='text-center fs-3'>{countTotal()} EUR</Card.Title>
                </div>}
            <Card.Text className='text-center fs-4 text-secondary mt-5'>Pay now with</Card.Text>
            <PayPalScriptProvider options={{ "client-id": "ATecRIUpNsMvS14iLTlQNhr7FSeUwNXIDrvbYYV1Wf3FTQPjBgyYUxsCWVy3AXl7XY0fxlysFhqOxCSL", "currency": "EUR" }}>
                <PayPalButtons 
                    onClick={() => setPaypalButtonClicked(true)}
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            "purchase_units" : [{
                                "reference_id": params.orderid,
                                "amount": {
                                    "currency_code": "EUR",
                                    "value": countTotal(),
                                    "breakdown": {
                                        "item_total": {
                                            "currency_code": "EUR",
                                            "value": countTotal()
                                        }
                                    }
                                },
                                "items":  cart.map((element) => ({
                                    "name": `${element.brand} ${element.model}`,
                                    "unit_amount": {
                                        "currency_code": "EUR",
                                        "value": element.price
                                    },
                                    "quantity": element.quantity
                                }))
                            }]
                        });
                    }}
                />
            </PayPalScriptProvider>
        </Card>  
    </div>
    )
}

export default PaymentComponent