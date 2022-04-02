import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/home/home.js';
import Category from './pages/category/category.js';
import ProductDetails from '../src/pages/productdetails/productdetails.js';
import CartContextProvider from './contexts/CartContext';
import OrderComponent from './pages/order/order.js';
import IsDesktopContextProvider from './contexts/IsDesktopScreenContext.js';

function App() {
  return (
      <IsDesktopContextProvider>
      <CartContextProvider>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/smartphones' element={<Category category='Smartphone'/>}/>
            <Route path='/laptops' element={<Category category='Laptop'/>}/>
            <Route path='/p/:productid/' element={<ProductDetails/>}/>
            <Route path='/finalizeorder' element={<OrderComponent/>}/>
        </Routes> 
      </BrowserRouter>
      </CartContextProvider>
      </IsDesktopContextProvider>
  );
}

export default App;