import { React, useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CloseButton, Form, FormControl, Button } from "react-bootstrap"
import './filter.scss';

const FilterComponent = (props) => {
    const [filters, setFilters] = useState('');
    const [localSearchParams, setLocalSearchParams] = useState(props.searchParams);


    const changeBrandFilter = (e) => {
        const brandName = e.target.value;
        const isBrandChecked = localSearchParams.filter(filter => filter.value !== brandName);
        if(e.target.checked && isBrandChecked){
            setLocalSearchParams([...localSearchParams, {name:"brand__in", value: brandName}]);
            return
        }
        if(!e.target.checked && isBrandChecked){
            setLocalSearchParams(localSearchParams.filter(filter => {
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
        const isOptionChecked = localSearchParams.filter(filter => filter.changedOptionName === selectedOption);
        if(e.target.checked && isOptionChecked){
            let newSelectedOption = {name: changedOptionName, value: selectedOption};
            setLocalSearchParams([...localSearchParams, newSelectedOption]);
            return
        }
        if(!e.target.checked && isOptionChecked){
            setLocalSearchParams(localSearchParams.filter(filter => {
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
        return options[option].map((element, index) => {
            const isCheckboxChecked = localSearchParams.some((param) => param.name === `options__${option}__in` && param.value === element);
            return (<Form.Check 
                        key={index}
                        type='checkbox'
                        label={element}
                        value={element}
                        name={option}
                        defaultChecked={isCheckboxChecked}
                        onChange={(e) => {
                            changeOptionsFilter(e);
                        }}
                    />)
        })
    };

    const renderBrands = () => {
        return filters.brand.map((element, index) => {
            const isCheckboxChecked = localSearchParams.some((param) => param.name === 'brand__in' && param.value === element);
            return(<Form.Check 
                key={index}
                type='checkbox'
                label={element}
                value={element}
                defaultChecked={isCheckboxChecked}
                onChange={(e) => changeBrandFilter(e)}
                />)
        });
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

    const renderPriceFilters = (priceFilterName, priceFilterPlaceholder) => {
        const isFilterAdded = localSearchParams.filter(filter => filter.name === priceFilterName);
        const defaultValue = isFilterAdded.length !== 0 ? isFilterAdded[0] : ''
        return(
            <FormControl 
                name={priceFilterName}
                placeholder={priceFilterPlaceholder}
                defaultValue={defaultValue.value}
                onChange={(e)=> {
                    const params = localSearchParams.filter(filter => filter.name !== priceFilterName);
                    setLocalSearchParams([...params, {name: priceFilterName, value: e.target.value}]);
                }}
            />
        )
    }

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
                        {renderBrands()}
                    <div className='fs-5 mb-3'>Options</div>
                        {renderOptions()}
                    <div className='fs-5 mt-3'>Price</div>
                    <div className='d-flex flex-row mb-3'>
                            {renderPriceFilters('price_min', 'Min Price')}
                        <span className='mx-2'>-</span>
                            {renderPriceFilters('price_max', 'Max Price')}
                    </div>
                    <div className='align-self-end flex-row'>
                        <Button
                            onClick={() => {
                                props.setSearchParams(localSearchParams);
                            }}
                            >Filter</Button>
                    </div>
            </Card>
        </div>
    ) : '');
}

export default FilterComponent