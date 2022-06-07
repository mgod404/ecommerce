import { useEffect, useState } from "react";
import './home.scss';
import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product'
import { API_URL } from "../../CONFIG";


type StringDictionary = {
    [key: string]: string[];
}
interface ProductInterface {
    id: number,
    in_stock: string,
    category?: string,
    brand: string,
    model: string,
    options: StringDictionary,
    price: number,
    picture: string,
    description?: string
}
interface Discount {
    ends: Date,
    discount_in_number: number,
    discount_in_percentage: number,
    product: ProductInterface
}
interface MostPopularRaw {
    product_id: number,
    product__brand: string,
    product__model: string,
    product__options: StringDictionary,
    product__price: number,
    product__picture: string,
    product_id__count: number,
    in_stock: string
}
interface FetchedData {
    most_popular: ProductInterface[],
    discounts: Discount[]
}

const Home = () => {
    const [fetchedData, setFetchedData] = useState<FetchedData>();

    const getHomeData = async () => {
        const response = await fetch(`${API_URL}/home/`);
        if(response.status === 200){
            const data = await response.json();
            const mostPopular: ProductInterface[] = await changeKeyNames(data.most_popular);
            const newData = await {...data, most_popular: mostPopular};
            setFetchedData(newData);
        }
    }

    // Change key names so they fit to product component
    const changeKeyNames = (mostPopularProducts:MostPopularRaw[]):ProductInterface[] => {
        return mostPopularProducts.map(product => {
            return {
                "id": product.product_id,
                "brand": product.product__brand,
                "model": product.product__model,
                "options": product.product__options,
                "price": product.product__price,
                "picture": product.product__picture,
                "in_stock": product.in_stock,
            }
        });
    };

    const getDiscount = (productId: number) =>{
        if(!fetchedData) return;
        const discountForProduct = fetchedData.discounts.filter((discount) => discount.product.id === productId);
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
        getHomeData();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavbarComponent />
            <div className="">
                <div className="fs-2 mt-4 mx-3 border-top">Discounts</div>
                <div className="wrapper-flex border-bottom mx-3 pb-3">
                    { fetchedData && fetchedData.discounts.map((discountData, index) => (
                        <div className="item-wrapper" key={index}>
                            <Product
                                data={discountData.product}
                                isDesktopScreen={true}
                                discount={getDiscount(discountData.product.id)}
                            />
                        </div>
                    ))}
                </div>
                <div className="fs-2 mt-4 mx-3 border-top">Most Popular</div>
                <div className="wrapper-flex border-bottom mx-3 pb-3">
                    { fetchedData && fetchedData.most_popular.map((mostPopular, index) => (
                        <div className="item-wrapper" key={index}>
                            <Product
                            data={mostPopular}
                            isDesktopScreen={true}
                            discount={getDiscount(mostPopular.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
