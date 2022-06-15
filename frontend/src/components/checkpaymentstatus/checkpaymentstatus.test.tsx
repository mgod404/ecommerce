import CheckPaymentStatusComponent from './checkpaymentstatus'
import CartContextProvider, { CartContext } from '../../contexts/CartContext'
import IsDesktopContextProvider from '../../contexts/IsDesktopScreenContext'
import { render } from '@testing-library/react'

type StringDictionary = {
    [key: string]: string[];
}
interface data{
    id: number,
    category?: string,
    model: string,
    options: StringDictionary,
    price: number,
    picture: string,
}
interface Props {
    id: number
}

const testData:data = {
    id: 2,
    category: "Smartphone",
    model:"Galaxy S22",
    options: {
        "RAM": ["6GB"],
        "Color": ["Grey"],
        "Memory": ["128GB"],
        "Screen Size": ["6.43in."]
    },
    price: 999.00,
    picture: "/media/xiaomi_redmi_note_10_grey.png"
};
const discountedPrice = "339.00";


test("renders without problems" , async () => {

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    render(
    <IsDesktopContextProvider>
    <CartContextProvider>
        <CheckPaymentStatusComponent orderId={2}/>
    </CartContextProvider>
    </IsDesktopContextProvider>
    )
});