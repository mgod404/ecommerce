import { useState, useEffect, useContext } from "react";

import './category.scss';

import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product';
import { Form } from "react-bootstrap";
import { API_URL } from "../../CONFIG";

import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext";

type StringDictionary = {
    [key: string]: string[];
}
interface Props {
    category: string,
}
export interface SearchParam {
    name: string,
    value: string
}
export interface ProductInterface {
    id: number,
    brand: string,
    model: string,
    options: StringDictionary,
    price: number,
    picture: string,
}
interface Discount {
    ends: Date,
    discount_in_number: number,
    discount_in_percentage: number,
    product: number,
}
interface  ProductData{
    result: ProductInterface[],
    discounts: Discount[]
}
export interface ProductFiltersInterface {
    brand__in: string[]|null,
    price_max: number|null,
    price_min: number|null,
    ordering: string|null
}
const Category: React.FC<Props> = (props) => {
    const { isDesktopScreen } = useContext(IsDesktopScreenContext);
    const [productData, setProductData] = useState<ProductData>();
    const [productFilters, setProductFilters] = useState<ProductFiltersInterface>({
        brand__in: [],
        price_max: null,
        price_min: null,
        ordering:''
    });
    const [searchParams, setSearchParams] = useState<SearchParam[] | []>([]);

    const fetchProducts = async () => {
        let params = '';
        if(searchParams){
            Object.entries(searchParams).forEach( ([index, filter]) => {
                params = params + `${filter.name}=${filter.value}&`;
            });
        }
        let fetchURL = new URL(`${API_URL}/c/${props.category}/?${params}`);
        const response = await fetch(fetchURL);
        const data = await response.json();
        setProductData(data);
    }

    const sortProducts = async (e:React.ChangeEvent<HTMLSelectElement>) => {
        const sortingValue = e.target.value;
        const localVars = searchParams ? searchParams.filter(filter => filter.name !== "order_by"): [];
        if(sortingValue === ''){
            setSearchParams(localVars);
            return
        }
        if(localVars.length === 0){
            setSearchParams([{name:'order_by', value: sortingValue}]);
            return
        };
        setSearchParams([...localVars, {name:'order_by', value: sortingValue}]);
    }

    const getDiscount = (productId: number) =>{
        if(!productData){
            return
        }
        const discountForProduct = productData.discounts.filter((discount) => discount.product === productId);
        if(discountForProduct.length > 0){
            return {
                discount_in_number : discountForProduct[0].discount_in_number,
                discount_in_percentage : discountForProduct[0].discount_in_percentage,
            };
        } else {
            return null
        };
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, props]);

    return (
        <div>
            <NavbarComponent 
                category={props.category}
                productFilters={productFilters}
                setProductFilters={setProductFilters}
                fetchProducts={fetchProducts}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                />
            <div className='d-flex flex-row justify-content-center'>
                <div className="fs-5 text-center d-flex align-items-center">Sort by</div>
                <Form.Select 
                    aria-label='--' 
                    className='m-2 sort-by-width' 
                    defaultValue=''
                    onChange={sortProducts}
                    >
                    <option value=''/>
                    <option value='price'>Price - Ascending</option>
                    <option value='-price'>Price - Descending</option>
                </Form.Select>
            </div>
            <div className='wrapper-grid'>
                {productData && productData.result.map(
                    (productData,index) => 
                    (<Product
                        data={productData}
                        isDesktopScreen={isDesktopScreen}
                        key={index}
                        discount={getDiscount(productData.id)}
                    />
                    ))}
            </div>
        </div>
    )
}

export default Category;
