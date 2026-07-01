import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../slices/userSlice';
import ErrorMessage from '../common/ErrorMessage';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (buttonRef.current) {
      const styles = window.getComputedStyle(buttonRef.current);
      console.log('Login Button Styles:');
      console.log('Width:', styles.width);
      console.log('Height:', styles.height);
      console.log('Padding:', styles.padding);
      console.log('Font Size:', styles.fontSize);
      console.log('Font Weight:', styles.fontWeight);
      console.log('Classes:', buttonRef.current.className);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, rememberMe }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 dark:bg-gray-900 px-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 sm:p-14 animate-fade-in">
        <h2 className="text-5xl font-bold text-center text-white dark:text-gray-100 mb-10">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {}
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-4 text-xl border border-gray-300 dark:border-gray-600
                         rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {}
          <div>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 text-xl border border-gray-300 dark:border-gray-600
                         rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {}
          <div className="flex items-center text-base">
            <label className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
          </div>

          {}
          <button
            ref={buttonRef}
            type="submit"
            disabled={loading || !email || !password}
            className={`
              w-full py-8 text-3xl font-semibold rounded-xl
              flex items-center justify-center gap-3
              transition-all duration-200
              focus:outline-none focus:ring-4 focus:ring-blue-300
              ${
                loading || !email || !password
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98]'
              }
              text-white shadow-lg
            `}
          >
            {loading ? (
              <>
                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {error && (
          <div className="mt-8">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>

      {}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
