import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { logout } from '../../slices/userSlice';
import { fetchCart } from '../../slices/cartSlice';
import { fetchCategories } from '../../slices/productSlice';

const Header = () => {
  const user = useSelector(state => state.user.user);
  const cartItems = useSelector(state => state.cart.items);
  const categories = useSelector(state => state.product.categories);
  const dispatch = useDispatch();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    if (user && cartItems.length === 0) {
      dispatch(fetchCart());
    }
  }, [user, cartItems.length, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <header className="bg-black text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="ShopGo Logo" className="w-72 h-21 transition-transform duration-300 hover:scale-110"/>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="block md:inline hover:underline text-3xl">Home</Link>
          <div className="relative">
            <span
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="block md:inline hover:underline cursor-pointer text-3xl">Categories
            </span>
            {isCategoriesOpen && (
              <div className="absolute top-full left-0 bg-gray-100 text-black shadow-lg rounded mt-1 z-10 transition-all duration-300 ease-in-out">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/?category=${category}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {user && <span className="block md:inline text-3xl">Welcome,{user.name}</span>}
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/cart" className="block md:inline hover:underline text-4xl relative">
                <FaShoppingCart />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
              </Link>
              <button onClick={() => dispatch(logout())} className="block md:inline hover:underline bg-transparent border-none text-white text-3xl">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block md:inline hover:underline text-3xl">Login</Link>
              <Link to="/register" className="block md:inline hover:underline text-3xl">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;