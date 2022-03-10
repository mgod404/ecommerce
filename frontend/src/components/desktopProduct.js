import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button } from "react-bootstrap";


const DesktopProduct = () => {
    return(
        <Card style={{ margin: '1rem'}}>
        <Card.Img src="holder.js/10px10" />
        <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Button variant="primary">Add To Cart</Button>
        </Card.Body>
        </Card>
    )
}

export default DesktopProduct