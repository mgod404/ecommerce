import { React, useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CloseButton, Form, FormControl, Button } from "react-bootstrap"
import './filter.scss';

const FilterComponent = (props) => {
    const [localFilterVars, setLocalFilterVars] = useState([]);
    const [filters, setFilters] = useState('');

    useEffect(() => {
        console.log(localFilterVars);
    },[localFilterVars]);

    const changeBrandFilter = (e) => {
        const brandName = e.target.value;
        const isBrandChecked = localFilterVars.filter(filter => filter.value !== brandName);
        if(e.target.checked && isBrandChecked){
            setLocalFilterVars([...localFilterVars, {name:"brand__in", value: brandName}]);
            return
        }
        if(!e.target.checked && isBrandChecked){
            setLocalFilterVars(localFilterVars.filter(filter => {
                if(filter.name === "brand__in" && filter.value === brandName){
                    return false
                } else {
                    return true
                }
            }));
            return
        };
    };
    const changeOptionsFilter = (e) => {
        const optionName = e.target.name;
        //change needed to use as api search param
        const changedOptionName = `options__${optionName}__in`;
        const selectedOption = e.target.value;
        const isOptionChecked = localFilterVars.filter(filter => filter.changedOptionName === selectedOption);
        if(e.target.checked && isOptionChecked){
            let newSelectedOption = {name: changedOptionName, value: selectedOption};
            setLocalFilterVars([...localFilterVars, newSelectedOption]);
            return
        }
        if(!e.target.checked && isOptionChecked){
            setLocalFilterVars(localFilterVars.filter(filter => {
                if(filter.name === changedOptionName && filter.value === selectedOption){
                    return false
                } else {
                    return true
                }
            }));
            return
        }
    };

    const renderOptionsChoices = (option) => {
        const options = filters.options;
        return options[option].map((element, index) => 
        (<Form.Check 
            key={index}
            type='checkbox'
            label={element}
            value={element}
            name={option}
            onChange={(e) => changeOptionsFilter(e)}
            />))
    };

    const renderOptions = () => {
        const returnArr = [];
        Object.entries(filters.options).forEach(([key,value], index) => returnArr.push(
            <div key={index}>
                <div className='fs-6 mb-3'>{key}</div>
                {renderOptionsChoices(key)}
            </div>
        ));
        return returnArr
    };

    useEffect( () => {
            fetch(`http://127.0.0.1:8000/api/categoryfilters/${props.category}/`)
                .then(res => res.json())
                .then(data => setFilters(data.filters));
        },[props]);

    return( props.filterTrigger && filters ? (
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
                    <div className='fs-5 mb-3'>Options</div>
                        {renderOptions()}
                    <div className='fs-5 mt-3'>Price</div>
                    <div className='d-flex flex-row mb-3'>
                        <FormControl 
                            name='min_price'
                            placeholder='Min Price'
                            onChange={(e)=> {
                                const localVars = localFilterVars.filter(filter => filter.name !== "price_min");
                                setLocalFilterVars([...localVars, {name:"price_min", value: e.target.value}]);
                            }}/>
                        <span className='mx-2'>-</span>
                        <FormControl 
                            name='max_price'
                            placeholder='Max Price' 
                            onChange={(e)=> {
                                const localVars = localFilterVars.filter(filter => filter.name !== "price_max");
                                setLocalFilterVars([...localVars, {name:"price_max", value: e.target.value}]);
                            }}/>
                    </div>
                    <Button 
                        className='align-self-end'
                        onClick={() => {
                            props.fetchProducts(localFilterVars);
                        }}
                        >Filter</Button>
            </Card>
        </div>
    ) : '');
}

export default FilterComponent