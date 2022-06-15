import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { CartContext } from "../../contexts/CartContext"

import { Card } from "react-bootstrap"
import './payment.scss'
import CheckPaymentStatusComponent from "../../components/checkpaymentstatus/checkpaymentstatus"
import { ProductInterface } from "../../contexts/CartContext"


const PaymentComponent = () => {
    const {cart} = useContext(CartContext);
    const params = useParams();
    const [paypalButtonClicked, setPaypalButtonClicked] = useState(false);

    const countTotal = () => {
        let sum = 0;
        if(!cart) return 0;
        cart.forEach((element:ProductInterface) =>  element.quantity && element.price ?
                                                    sum = sum + (element.quantity * element.price) : sum);
        return sum
    }

    return ( cart ? 
    <div className='d-flex flex-row justify-content-center'>
        <Card className='m-5 p-3'>
            { paypalButtonClicked && params.orderid ? 
                <CheckPaymentStatusComponent orderId={params.orderid as unknown as number}/> : 
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
                                    "value": countTotal().toString(),
                                    "breakdown": {
                                        "item_total": {
                                            "currency_code": "EUR",
                                            "value": countTotal().toString()
                                        }
                                    }
                                },
                                "items":  cart.map((element:ProductInterface) => 
                                ({
                                    "name": `${element.brand} ${element.model}`,
                                    "unit_amount": {
                                        "currency_code": "EUR",
                                        "value": element.price ? element.price as unknown as string : 0 as unknown as string
                                    },
                                    "quantity": element.quantity ? element.quantity as unknown as string : 0 as unknown as string
                                }))
                            }]
                        });
                    }}
                />
            </PayPalScriptProvider>
        </Card>  
    </div> : <div></div>
    )
}

export default PaymentComponent