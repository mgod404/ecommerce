import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from "react-bootstrap";

const Product = (props) => {
    const isDesktopScreen = props.isDesktopScreen;
    if(isDesktopScreen){
        return (
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
    else {
        return(
            <Card>
                <Row>
                    <Col>
                    <Card.Img src="holder.js/10px10" />
                    </Col>
                    <Col>
                    <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
                    </Col>
                </Row>
            </Card>
        )
        }
}

export default Product