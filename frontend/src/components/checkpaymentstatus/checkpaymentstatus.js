import { React, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './checkpaymentstatus.scss'

import { API_URL } from '../../CONFIG'

const CheckPaymentStatusComponent = (props) => {
    const [orderState, setOrderState] = useState('WAITING_FOR_PAYMENT');

    const updateOrderState = async () => {
        const response = await fetch(`${API_URL}/o/${props.orderId}/`);
        const data = await response.json();
        if (data.order_state === "PAYMENT_RECEIVED"){
            setOrderState(data.order_state);
            clearInterval(interval);
        }
    } 
    let interval = setInterval(updateOrderState(), 3000);


    return(
        <div>
            {orderState === "PAYMENT_RECEIVED" ? 
                <div className='d-flex flex-column justify-content-center'>
                    <div className='text-center mt-2 text-secondary fs-2'>
                        Order Status
                    </div>
                    <div className='text-success text-center'>
                        PAYMENT RECEIVED
                    </div>
                </div> : 
                <div className='d-flex flex-column justify-content-center'>
                    <div className='d-flex justify-content-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className='text-center mt-2 text-secondary fs-2'>
                        Order Status
                    </div>
                    <div className='text-danger text-center'>
                        WAITING FOR PAYMENT
                    </div>
                </div>}
            </div>
    )
}

export default CheckPaymentStatusComponent