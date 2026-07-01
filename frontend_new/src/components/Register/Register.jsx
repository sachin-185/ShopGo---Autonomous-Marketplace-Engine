import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../../slices/userSlice';
import ErrorMessage from '../common/ErrorMessage';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  
  useEffect(() => {
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 dark:bg-gray-900 px-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 sm:p-14 animate-fade-in">
        <h2 className="text-5xl font-bold text-center text-white dark:text-gray-100 mb-10">
          Sign Up
        </h2>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-8">
          {}
          <div>
            <label htmlFor="name" className="block text-2xl font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-5 py-4 text-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {}
          <div>
            <label htmlFor="email" className="block text-2xl font-medium text-gray-700 dark:text-gray-200">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-5 py-4 text-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {}
          <div>
            <label htmlFor="password" className="block text-2xl font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-5 py-4 text-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-8 px-5 bg-blue-600 text-white rounded-md text-3xl font-medium hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-gray-400 text-3xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-3"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
