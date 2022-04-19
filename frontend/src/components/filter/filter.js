import { React, useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CloseButton, Form, FormControl, Button } from "react-bootstrap"
import './filter.scss';

const FilterComponent = (props) => {
    const [localFilterVars, setLocalFilterVars] = useState(props.productFilters);
    const [filters, setFilters] = useState('');

    const changeBrandFilter = (e) => {
        const brandName = e.target.value;
        let isFilterEnabledAlready = localFilterVars.brand.findIndex(item => item === brandName);
        if(e.target.checked && isFilterEnabledAlready === -1){
            setLocalFilterVars({
                ...localFilterVars,
                brand: [...localFilterVars.brand, e.target.value]
            });
        };
        if(!e.target.checked && isFilterEnabledAlready!== -1){
            let filterNameArray = localFilterVars.brand;
            setLocalFilterVars({
                ...localFilterVars,
                brand: filterNameArray.filter(item => item !== brandName)
            });
        };
    };

    useEffect( () => {
            fetch(`http://127.0.0.1:8000/api/categoryfilters/${props.category}/`)
            .then(res => res.json())
            .then(data => setFilters(data.filters));
        },[props]);

    return( props.filterTrigger ? (
        <div className='filter-background'>
            <Card className='d-flex flex-column justify-content-center p-3'>

                <CloseButton 
                    className='align-self-end'
                    onClick={() => props.setFilterTrigger(false)}/>

                    <div className='fs-5 mb-3'>Brand</div>
                    { filters.brand.map((element, index) => 
                        (<Form.Check 
                            key={index}
                            type='checkbox'
                            label={element}
                            value={element}
                            onChange={(e) => changeBrandFilter(e)}
                            />)
                    )}

                    <div className='fs-5 mt-3'>Price</div>
                    <div className='d-flex flex-row mb-3'>
                        <FormControl 
                            name='min_price'
                            placeholder='Min Price'
                            onChange={(e)=> {
                                setLocalFilterVars({
                                    ...localFilterVars,
                                    'price_min': e.target.value,
                                });
                            }}/>
                        <span className='mx-2'>-</span>
                        <FormControl 
                            name='max_price'
                            placeholder='Max Price' 
                            onChange={(e)=> {
                                setLocalFilterVars({
                                    ...localFilterVars,
                                    'price_max': e.target.value
                                });
                            }}/>
                    </div>
                    <Button 
                        className='align-self-end'
                        onClick={() => props.setProductFilters(localFilterVars)}
                        >Filter</Button>
            </Card>
        </div>
    ) : '');
}

export default FilterComponent