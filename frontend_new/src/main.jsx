import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store'
import { setAuthToken } from './utils/api'
import { getUserProfile } from './slices/userSlice'


const token = localStorage.getItem('userToken');
if (token) {
  setAuthToken(token);
  store.dispatch(getUserProfile());
}


document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
