import {useContext, React} from "react"
import { useNavigate } from "react-router-dom"
import AddToCardBttnComponent from "../../components/addtocardbttn/addtocardbttn"

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Row, Col } from "react-bootstrap"
import './product.scss'

import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext"

const Product = (props) => {
    const {isDesktopScreen} = useContext(IsDesktopScreenContext);

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

    return isDesktopScreen ? (
            <Card onClick={() => navigate(`/p/${props.data.id}`)} className='on-hover-desktop'>
                <Card.Img src={props.data.picture}/>
                <Card.Body className='d-flex flex-column'>
                    <Card.Title className='product-card-body overflow-hidden'>{props.data.brand} {props.data.model}</Card.Title>
                        <div className='product-card-body pb-2'>{getProductOptions(props.data.options)}</div>
                    <Row>
                        <Col className='row justify-content-center align-content-center'>{props.data.price} EUR</Col>
                        <Col>
                            <AddToCardBttnComponent
                                id={props.data.id}
                                data={props.data}>
                            </AddToCardBttnComponent>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
    ) : (
        <Card 
            onClick={() => navigate(`/p/${props.data.id}`)}
            className='d-flex flex-row on-hover-mobile'>
                    <Card.Img 
                        src={props.data.picture}  
                        style={{height:'10rem', width:'12rem'}}
                        />
                    <Card.Body>
                        <Card.Title>
                            {props.data.brand} {props.data.model}
                        </Card.Title>
                        <Card.Text>
                            {getProductOptions(props.data.options)}
                        </Card.Text>
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='d-flex align-items-center'>{props.data.price} EUR</div>
                            <AddToCardBttnComponent 
                                id={props.data.id}
                                data={props.data}>
                            </AddToCardBttnComponent>
                        </div>
                    </Card.Body>
        </Card>
    )
}

export default Product