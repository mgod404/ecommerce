import { React, useEffect, useState, useContext } from "react";
import './home.scss';
import NavbarComponent from '../../components/navbar/navbar';
import Product from '../../components/product/product'

import { IsDesktopScreenContext } from "../../contexts/IsDesktopScreenContext";

const Home = () => {
    const [discounts, setDiscounts] = useState();
    const [mostPopular, setMostPopular] = useState();
    const { isDesktopScreen } = useContext(IsDesktopScreenContext);

    const getHomeData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/home/`);
        if(response.status === 200){
            const data = await response.json();
            setDiscounts(data.discounts);
            setMostPopular(changeKeyNames(data.most_popular));
            console.log(data);
        }
    }

    const changeKeyNames = (mostPopularProducts) => {
        return mostPopularProducts.map(product => {
            return {
                "brand": product.product__brand,
                "model": product.product__model,
                "options": product.product__options,
                "price": product.product__price,
                "picture": product.product__picture,
                "in_stock": product.in_stock,
            }
        });
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
                    { discounts && discounts.map((discountData, index) => (
                        <div className="item-wrapper" key={index}>
                            <Product
                                data={discountData.product}
                                isDesktopScreen={true}
                            />
                        </div>
                    ))}
                </div>
                <div className="fs-2 mt-4 mx-3 border-top">Most Popular</div>
                <div className="wrapper-flex border-bottom mx-3 pb-3">
                    { mostPopular && mostPopular.map((mostPopular, index) => (
                        <div className="item-wrapper" key={index}>
                            <Product
                            data={mostPopular}
                            isDesktopScreen={true}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
