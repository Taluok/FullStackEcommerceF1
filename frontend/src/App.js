import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSingUp from './Pages/LoginSingup';
import Footer from './Components/Footer/Footer.jsx';
import banner_one from './Components/Assets/banner_one.jpg';
import banner_two from './Components/Assets/banner_two.jpg'
import banner_three from './Components/Assets/banner_three.jpg';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/unisex' element={<ShopCategory banner={banner_one} category="unisex" />} />
          <Route path='/mens' element={<ShopCategory banner={banner_two} category="mens" />} />
          <Route path="/womens" element={<ShopCategory banner={banner_three} category="womens"/>} />
          <Route path="/product/" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSingUp />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

