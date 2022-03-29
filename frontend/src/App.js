import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './pages/home/home.js';
import Category from './pages/category/category.js';
import ProductDetails from '../src/pages/productdetails/productdetails.js';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
      <CartContextProvider>
      <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/smartphones' element={<Category category='Smartphone'/>}/>
            <Route path='/laptops' element={<Category category='Laptop'/>}/>
            <Route path='/p/:productid/' element={<ProductDetails/>}/>
        </Routes> 
      </BrowserRouter>
      </CartContextProvider>
  );
}

export default App;