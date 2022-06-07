import { useState, useEffect } from 'react'

import { Card, CloseButton, Form, FormControl, Button } from "react-bootstrap"
import './filter.scss'

import { API_URL } from '../../CONFIG'

import { SearchParam } from '../../pages/category/category'


type StringDictionary = {
    [key: string]: string[];
}
interface CategoryFilters{
    brand: string[],
    options: StringDictionary,
    category: string
}
interface ProductFilters {
    brand__in?: string[];
    price_max?: string;
    price_min?: string;
    ordering?: string;
}
interface Props {
    category: string,
    filterTrigger: boolean,
    setFilterTrigger:React.Dispatch<React.SetStateAction<boolean>>,
    setProductFilters:React.Dispatch<React.SetStateAction<ProductFilters>>, 
    productFilters: ProductFilters,
    fetchProducts: () => Promise<void>,
    searchParams: SearchParam[],
    setSearchParams: React.Dispatch<React.SetStateAction<SearchParam[]>>
}

const FilterComponent = (props: Props) => {
    const [filters, setFilters] = useState<CategoryFilters>();
    const [localSearchParams, setLocalSearchParams] = useState(props.searchParams);


    const changeBrandFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
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
    const changeOptionsFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
        const optionName = e.target.name;
        //change needed to use as api search param
        const changedOptionName = `options__${optionName}__in`;
        const selectedOption = e.target.value;
        const isOptionChecked = localSearchParams.filter(filter => filter.name === changedOptionName && filter.value === selectedOption);
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

    const renderOptionsChoices = (option: string) => {
        if(!filters) return;
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
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            changeOptionsFilter(e);
                        }}
                    />)
        })
    };

    const renderBrands = () => {
        if(!filters) return;
        return filters.brand.map((element, index) => {
            const isCheckboxChecked = localSearchParams.some((param) => param.name === 'brand__in' && param.value === element);
            return(<Form.Check 
                key={index}
                type='checkbox'
                label={element}
                value={element}
                defaultChecked={isCheckboxChecked}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => changeBrandFilter(e)}
                />)
        });
    };

    const renderOptions = () => {
        const returnArr:JSX.Element[] = [];
        if(!filters) return;
        Object.entries(filters.options).forEach(([key,value], index) => returnArr.push(
            <div key={index}>
                <div className='fs-6 mb-3'>{key}</div>
                {renderOptionsChoices(key)}
            </div>
        ));
        return returnArr
    };

    const renderPriceFilters = (priceFilterName:string, priceFilterPlaceholder:string) => {
        const isFilterAdded = localSearchParams.filter(filter => filter.name === priceFilterName);
        const defaultValue = isFilterAdded.length !== 0 ? isFilterAdded[0].value : '';
        return(
            <FormControl 
                name={priceFilterName}
                placeholder={priceFilterPlaceholder}
                defaultValue={defaultValue}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                    const params = localSearchParams.filter(filter => filter.name !== priceFilterName);
                    console.log(e.target.value);
                    if(!e.target.value){
                        setLocalSearchParams([...params]);
                    } else {
                        setLocalSearchParams([...params, {name: priceFilterName, value: e.target.value}]);
                    }
                }}
            />
        )
    }

    useEffect( () => {
            fetch(`${API_URL}/categoryfilters/${props.category}/`)
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