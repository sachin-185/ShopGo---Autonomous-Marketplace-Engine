import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../slices/orderSlice';
import { fetchCart } from '../../slices/cartSlice';
import ErrorMessage from '../common/ErrorMessage';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);
  const { loading, error } = useSelector((state) => state.order);
  const cartItems = useSelector((state) => state.cart.items);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', apartment: '', city: '', country: 'India', postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createOrder({
          shippingAddress: formData,
          paymentMethod,
          shippingMethod,
          items: cartItems,
          subtotal,
          shippingCost,
          tax,
          total: finalTotal,
        })
      ).unwrap();

      dispatch(fetchCart());
      navigate('/order-success');
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  const shippingCost = shippingMethod === 'express' ? 16 : 5;
  const tax = 8.32;
  const subtotal = total;
  const finalTotal = total + shippingCost + tax;

  return (
    <div className="min-h-screen bg-blue-900 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        { }
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
          { }
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Contact information
            </h2>
            <input type="email" name="email" placeholder="Email address"
              value={formData.email} onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </section>

          { }
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Shipping information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="firstName" placeholder="First name"
                value={formData.firstName} onChange={handleInputChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-2 mt-3"
            />

            <input
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              value={formData.apartment}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 mt-3"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="border rounded px-3 py-2"
              />
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border rounded px-3 py-2"
              />
              <input
                name="postalCode"
                placeholder="Postal code"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
                className="border rounded px-3 py-2"
              />
            </div>
          </section>

          { }
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Delivery method
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`border rounded p-3 flex items-center gap-2 cursor-pointer ${shippingMethod === 'standard' ? 'border-indigo-600' : ''}`}>
                <input type="radio"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                /> Standard (4–10 days) — ₹5
              </label>

              <label className={`border rounded p-3 flex items-center gap-2 cursor-pointer ${shippingMethod === 'express' ? 'border-indigo-600' : ''
                }`}
              >
                <input type="radio"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
                Express (2–5 days) — ₹16
              </label>
            </div>
          </section>

          { }
          <section>
            <h2 className="text-lg font-semibold mb-3">
              Payment
            </h2>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Credit card
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                PayPal
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery
              </label>
            </div>
          </section>

          {error && <ErrorMessage message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex text-2xl justify-center whitespace-nowrap transition"
          >
            {loading ? 'Processing...' : 'Confirm order'}
          </button>
        </form>

        { }
        <aside className="bg-white rounded-lg p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">
            Order summary
          </h2>

          <div className="space-y-3 text-2xl">
            {items.map((item) => (
              <div key={item.product._id} className="flex justify-between">
                <span>{item.product.name} × {item.quantity}</span>
                <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-2xl">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-2xl mt-2">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-2xl mt-2">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-2xl font-semibold mt-4">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
