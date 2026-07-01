import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, searchProducts } from '../../slices/productSlice';
import LoadingSpinner from '../common/LoadingSpinner';
import Categories from '../Categories/Categories';
import ErrorMessage from '../common/ErrorMessage';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, searchResults, searchLoading, searchError } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Home component mounted, dispatching fetchProducts');
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchProducts(searchQuery.trim()));
    }
  };

  const displayedProducts = searchResults.length > 0 ? searchResults : (category ? products.filter((product) => product.category === category) : products);

  const getHighlights = (productCategory) => {
    const highlightsMap = {
      Electronics: ['✓ Latest Technology', '✓ 1 Year Warranty', '✓ Premium Quality'],
      Sports: ['✓ Durable Material', '✓ Performance Tested', '✓ Comfort Design'],
      Home: ['✓ Energy Efficient', '✓ Easy Installation', '✓ Long Lasting'],
      Accessories: ['✓ Stylish Design', '✓ High Quality', '✓ Versatile Use'],
      Books: ['✓ Engaging Content', '✓ Expert Author', '✓ Educational Value'],
      Clothing: ['✓ Comfortable Fabric', '✓ Trendy Design', '✓ Size Inclusive']
    };
    return highlightsMap[productCategory] || ['✓ Free Shipping', '✓ 30-Day Return', '✓ Premium Quality'];
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-white">
        <h2 className="text-4xl font-bold mb-4">Products</h2>
        <LoadingSpinner message="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-white">
        <h2 className="text-3xl font-bold mb-4">Products</h2>
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchProducts())}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-900 dark:bg-gray-900 text-white dark:text-gray-100">
      {}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        <div className="w-full">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-xl lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight justify-center text-white sm:text-8xl">
                Discover Amazing Products
              </h1>
              <p className="mt-4 text-2xl text-gray-300">
                Explore our curated collection of high-quality products across all categories.
                Find everything you need with great prices and fast shipping.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
>
                  <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src="/heaphones.png"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-72 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/book.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/jeans.png"
                            className="size-full object-cover transition-transform duration-400 hover:scale-110"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/smart_watch.png"
                            className="size-full object-cover transition-transform duration-200 hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/jacket.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>

                        <div className="h-50 w-80 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/oven.png"
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-90 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/coffee_maker.png"
                            className="size-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="h-60 w-90 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/phone.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>
                        <div className="h-90 w-70 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/shirt.png"
                            className="size-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      </div>
                      
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8 ">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/jeans.png"
                            className="size-full object-cover transition-transform duration-900 hover:scale-110"
                          />
                        </div>
                        <div className="h-64 w-98 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/science_textbook.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>
                        <div className="h-64 w-99 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/backpack.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>
                        <div className="h-44 w-90 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 animate-pulse">
                          <img
                            alt=""
                            src="/sunglasses.png"
                            className="size-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                        <div className="h-64 w-99 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src="/yoga_mat.png"
                            className="size-full object-cover hover:scale-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a href="#products" className="inline-block rounded-md border border-transparent bg-blue-600 px-8 py-3 text-center text-3xl font-medium text-white hover:bg-blue-700">Shop Collection</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-16">
        <h2 id="products" className="text-5xl font-bold text-center mb-8 text-white dark:text-gray-200">
          {searchResults.length > 0 ? 'Search Results' : (category ? `${category} Products` : 'Featured Products')}
        </h2>

        {}
        <div className="mb-8 flex justify-center">
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-5 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={searchLoading}
              >
                {searchLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {searchError && <ErrorMessage message={searchError} onRetry={() => dispatch(searchProducts(searchQuery))} />}

        <Categories />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {displayedProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 flex flex-col overflow-hidden"
            >
              {}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-50 object-cover p-2"
                />
                <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              {}
              <div className="p-4 flex flex-col grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2 min-h-12">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-3 min-h-15">
                  {product.description}
                </p>

                {}
                <h4 className="text-sm font-semibold text-gray-700 white:text-gray-300 mb-1">Highlights</h4>
                <ul className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                  {getHighlights(product.category).map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-white-600 dark:text-white-400">
                    ₹{product.price}
                  </span>

                  <span className="text-sm text-white-500 white:text-gray-400">
                    Stock: <span className="font-medium">{product.stock}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchResults.length > 0 ? 'No products found for your search.' : 'No products found in this category.'}
            </p>
          </div>
        )}
      </div>

      {}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl font-bold mb-4">ShopGo</h3>
              <p className="text-gray-400">
                Your one-stop shop for quality products across all categories.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/?category=Electronics" className="hover:text-white">Electronics</a></li>
                <li><a href="/?category=Sports" className="hover:text-white">Sports</a></li>
                <li><a href="/?category=Home" className="hover:text-white">Home</a></li>
                <li><a href="/?category=Books" className="hover:text-white">Books</a></li>
                <li><a href="/?category=Clothing" className="hover:text-white">Clothing</a></li>
                <li><a href="/?category=Accessories" className="hover:text-white">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
