import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Categories = () => {
  const { categories, categoriesLoading, categoriesError } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  if (categoriesLoading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  if (categoriesError) {
    return <ErrorMessage message={categoriesError} />;
  }

  return (
    <div className="categories-container mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Categories</h2>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/"
          className={`px-4 py-2 rounded-lg border transition-colors ${
            !currentCategory
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/?category=${category}`}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentCategory === category
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;