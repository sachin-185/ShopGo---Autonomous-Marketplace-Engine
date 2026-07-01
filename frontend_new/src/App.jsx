import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories.jsx';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductDetail from './components/ProductDetail/ProductDetail';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  console.log('App component rendered');
  return (
    <Router>
      <Header />
      <ChatbotWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
