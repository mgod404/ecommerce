import {useState, React} from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from "react-bootstrap";
import './product.css'


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

    const getProductOptions = (options) => {
        let index = 0;
        let content = [];
        for (let [key, value] of Object.entries(options)) {
            if(index > 2){break;}
            if(isDesktopScreen){
                content.push(<ul key={index} className="options"> {key}: {value} </ul>);
            }else {
                content.push(<span key={index} className='product-details-options'> {key}: {value} |</span>);
            }
            index++;
        }
        return content;
    }

    const navigate = useNavigate();
    const addToCart = (productId) =>{
        console.log(productId);
        console.log('hi');
    }


    if(isDesktopScreen){
        return (
                <Card onClick={() => navigate('/p/' + props.data.id)}>
                    <Card.Img src={props.data.picture}/>
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title className='product-card-body'>{props.data.brand} {props.data.model}</Card.Title>
                            <div className='product-card-body'>{getProductOptions(props.data.options)}</div>
                        <Row>
                            <Col className='row justify-content-center align-content-center'>{props.data.price} EUR</Col>
                            <Col><Button id={props.data.id} variant="primary" className='mt-auto' onClick={(event) =>{
                                event.stopPropagation();
                                console.log('button clicked');
                            }}>Add To Cart</Button></Col>
                        </Row>
                    </Card.Body>
                </Card>
        )
    } 
    else {
        return(
            <Card style={{ margin: '0.1rem'}}>
                <Row>
                    <Col>
                        <Card.Img src={props.data.picture} />
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{props.data.brand} {props.data.model}</Card.Title>
                            <Card.Text>
                                {getProductOptions(props.data.options)}
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