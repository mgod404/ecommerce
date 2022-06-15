import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import CartContextProvider, { CartContext } from '../../contexts/CartContext'
import IsDesktopContextProvider from '../../contexts/IsDesktopScreenContext'
import OrderComponent from './order'


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
        <BrowserRouter>
            <Routes>
            <Route path='/finalizeorder' element={<OrderComponent/>}/>
            </Routes> 
        </BrowserRouter>
        </CartContextProvider>
        </IsDesktopContextProvider>
    )
});