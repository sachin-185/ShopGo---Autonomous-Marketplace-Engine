import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../../slices/cartSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, loading, error } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user) dispatch(fetchCart());
  }, [dispatch, user]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleRemoveItem = (productId) => dispatch(removeFromCart(productId));
  const handleCheckout = () => navigate('/checkout');

  if (!user) {
    return (
      <div className="container mx-auto p-9 min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white">
        <h2 className="text-7xl font-bold mb-4">Shopping Cart</h2>
        <p className="text-lg">Please log in to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 min-h-screen bg-blue-900 text-white">
      <h2 className="text-7xl font-bold mb-8 border-b pb-4 justify-center">Shopping Cart</h2>

      {loading && (
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" message="Loading cart..." />
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-10">
        {}
        <div className="flex-1 space-y-8">
          {loading && (
            <div className="flex justify-center items-center h-96">
              <LoadingSpinner size="lg" message="Loading cart..." />
            </div>
          )}

          {!loading && items.length === 0 ? (
            <p className="text-lg text-gray-300">Your cart is empty.</p>
          ) : (
            items.map(item => (
              <div
                key={item.product._id}
                className="flex border rounded-lg p-10 shadow-sm bg-gray-800"
              >
                {}
                <div className="w-100 h-90 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {}
                <div className="flex flex-col justify-between grow ml-6">
                  <div>
                    <h3 className="text-xl font-semibold">{item.product.name}</h3>
                    {}
                    <p className="text-2xl text-gray-500 mt-1 line-clamp-2">{item.product.description}</p>
                    <p className="text-2xl font-bold mt-1">₹{item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    {}
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                      className="border rounded px-3 py-1 text-lg bg-gray-700 text-white"
                    >
                      {[...Array(10).keys()].map(n => (
                        <option key={n + 1} value={n + 1}>{n + 1}</option>
                      ))}
                    </select>

                    {}
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-gray-400 hover:underline"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>

                  {}
                  <p className={`mt-2 text-sm ${item.product.inStock ? 'text-green-400' : 'text-gray-400'}`}>
                    {item.product.inStock ? 'In stock' : 'Ships in 3-4 weeks'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {}
        <div className="w-101 p-10 bg-gray-800 rounded-lg shadow-md border border-gray-700 h-fit">
          <h3 className="text-4xl font-semibold mb-6">Order summary</h3>

          <div className="flex justify-between mb-3">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-semibold">₹{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3 text-gray-400">
            <span>Shipping estimate <span className="cursor-help" title="Based on your location">?</span></span>
            <span>₹5.00</span>
          </div>

          <div className="flex justify-between mb-6 text-gray-400">
            <span>Tax estimate <span className="cursor-help" title="Estimated tax">?</span></span>
            <span>₹8.32</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6 border-t border-gray-600 pt-4">
            <span>Order total</span>
            <span>₹{(total + 5 + 8.32).toFixed(2)}</span>
          </div>
<button
  onClick={handleCheckout}
  className="w-full min-w-full
             py-4 px-6
             bg-blue-600 hover:bg-blue-700
             text-white text-lg font-semibold
             rounded-lg
             flex items-center justify-center
             whitespace-nowrap
             transition">Checkout
</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
