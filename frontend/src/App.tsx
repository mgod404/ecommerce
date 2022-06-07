import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Category from './pages/category/category'
import ProductDetails from './pages/productdetails/productdetails'
import CartContextProvider from './contexts/CartContext'
import OrderComponent from './pages/order/order'
import IsDesktopContextProvider from './contexts/IsDesktopScreenContext.js'
import PaymentComponent from './pages/payment/payment'

function App() {
  return (
      <IsDesktopContextProvider>
      <CartContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/smartphones' element={<Category category='Smartphone'/>}/>
            <Route path='/laptops' element={<Category category='Laptop'/>}/>
            <Route path='/p/:productid/' element={<ProductDetails/>}/>
            <Route path='/finalizeorder' element={<OrderComponent/>}/>
            <Route path='/payment/:orderid/' element={<PaymentComponent/>}/>
        </Routes> 
      </BrowserRouter>
      </CartContextProvider>
      </IsDesktopContextProvider>
  );
}

export default App;