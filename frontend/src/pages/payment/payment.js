import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { CartContext } from "../../contexts/CartContext"
import { useContext } from "react"

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from "react-bootstrap"
import './payment.scss'



const PaymentComponent = () => {
    const {cart} = useContext(CartContext);

    const countTotal = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + (element.quantity * element.price));
        return sum
    }

    return (
    <div className='d-flex flex-row justify-content-center'>
        <Card className='m-5'>
            <PayPalScriptProvider options={{ "client-id": "ATecRIUpNsMvS14iLTlQNhr7FSeUwNXIDrvbYYV1Wf3FTQPjBgyYUxsCWVy3AXl7XY0fxlysFhqOxCSL", "currency": "EUR" }}>
                <PayPalButtons style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            "purchase_units" : [{
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