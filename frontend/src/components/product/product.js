import {useState, React} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from "react-bootstrap";

const Product = (props) => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    const [isDesktopScreen, setIsDesktopScreen] = useState(mediaQuery.matches);
    mediaQuery.onchange = (e) => {
        if(e.matches){
            setIsDesktopScreen(true);
        }else{
            setIsDesktopScreen(false);
        }
    }

    if(isDesktopScreen){
        return (
            <Card style={{ margin: '1rem'}}>
            <Card.Img src={props.picture} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title>{props.brand} {props.model}</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary" className='mt-auto'>Add To Cart</Button>
            </Card.Body>
            </Card>
        )
    } 
    else {
        return(
            <Card>
                <Row>
                    <Col>
                    <Card.Img src={props.picture} />
                    </Col>
                    <Col>
                    <Card.Body>
                    <Card.Title>{props.brand} {props.model}</Card.Title>
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