import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const orders = useSelector((state) => state.order.orders);
  const order = orders?.[orders.length - 1];

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No order found.</p>
      </div>
    );
  }

  const {
    _id,
    items,
    shippingAddress,
    paymentMethod,
    shippingMethod,
    trackingNumber,
    subtotal,
    shippingCost,
    tax,
    totalPrice,
  } = order;

  return (
    <div className="min-h-screen bg-blue-80 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">

        {}
        <p className="text-4xl text-blue-600 mb-1">Thank you!</p>
        <h1 className="text-2xl font-semibold mb-2">
          It's on the way!
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Your order <span className="font-medium">#{_id}</span> has shipped and will be with you soon.
        </p>

        {/* Tracking */}
        {trackingNumber && (
          <div className="mb-8">
            <p className="text-sm text-gray-600">Tracking number</p>
            <p className="text-sm text-blue-600 font-medium">
              {trackingNumber}
            </p>
          </div>
        )}

        <hr className="mb-8" />

        {/* Products */}
        {items.map((item) => (
          <div key={item.product._id} className="flex gap-4 mb-8">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-30 h-30 object-cover rounded border"
            />
            <div className="flex-1">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-white-600 mb-2">
                {item.product.description}
              </p>
              <p className="text-sm text-gray-700">
                Quantity {item.quantity} &nbsp;·&nbsp; Price ₹{item.product.price}
              </p>
            </div>
          </div>
        ))}

        <hr className="mb-8" />

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 text-sm mb-8">
          <div>
            <p className="font-medium mb-2">Shipping address</p>
            <p className="text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}
              <br />
              {shippingAddress.address}
              <br />
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
          </div>

          <div>
            <p className="font-medium mb-2">Billing address</p>
            <p className="text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}
              <br />
              {shippingAddress.address}
              <br />
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
          </div>
        </div>

        <hr className="mb-8" />

        {/* Payment & Shipping */}
        <div className="grid grid-cols-2 gap-8 text-sm mb-8">
          <div>
            <p className="font-medium mb-2">Payment method</p>
            <p className="text-gray-600">{paymentMethod}</p>
          </div>

          <div>
            <p className="font-medium mb-2">Shipping method</p>
            <p className="text-gray-600">{shippingMethod}</p>
          </div>
        </div>

        <hr className="mb-8" />

        {/* Summary */}
        <div className="text-sm space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold pt-4 border-t">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/"
            className="text-3xl font-medium text-blue-600 hover:underline"
          >
            See our products
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
