
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CloseButton } from "react-bootstrap"
import './filter.scss';

const FilterComponent = (props) => {
    return( props.filterTrigger ? (
        <div className='filter-background'>
            <Card className='d-flex flex-column justify-content-center'>
                <CloseButton 
                    className='align-self-end'
                    onClick={() => props.setFilterTrigger(false)}/>
                    Hello
                { props.children }
            </Card>
        </div>
    ) : '');
}

export default FilterComponent