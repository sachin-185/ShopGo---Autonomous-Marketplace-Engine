import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../slices/productSlice';
import { addToCart } from '../../slices/cartSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, productLoading, productError } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ productId: product._id }));
    } else {
      navigate('/login');
    }
  };

  if (productLoading) {
    return (
      <div className="container mx-auto p-4">
        <LoadingSpinner message="Loading product..." />
      </div>
    );
  }

  if (productError) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage message={productError} onRetry={() => dispatch(fetchProductById(id))} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-700 dark:text-gray-300 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-100 min-h-screen flex flex-col sm:flex-row gap-6 sm:gap-12 items-center">
      
      {}
      <div className="flex-shrink-0 w-full sm:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>

      {}
      <div className="flex flex-col justify-between w-full sm:w-1/2 gap-6">
        {}
        <h2 className="text-2xl sm:text-4xl font-bold">{product.name}</h2>

         <hr className="my-4" />

        {}
        <p className="text-base sm:text-lg text-gray-300">
          {product.description}
        </p>

        {}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>✓ Free Shipping</li>
            <li>✓ 30-Day Return Policy</li>
            <li>✓ Premium Quality Guarantee</li>
            <li>✓ Secure Payment</li>
          </ul>
        </div>

        {}
        <p className="text-xl sm:text-2xl font-bold text-green-600">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {}
        <button
          onClick={handleAddToCart}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-6 rounded-xl text-lg sm:text-xl font-bold
                      hover:from-blue-600 hover:to-blue-700 active:scale-95 transition transform duration-200 shadow-lg w-full sm:w-auto min-w-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
