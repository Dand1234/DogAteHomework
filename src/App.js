import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { AuthPage } from './pages/AuthPage/index';
import { MainPage } from './pages/MainPage/index';
import { RegPage } from './pages/RegPage/index';
import { UserPage } from './pages/UserPage/index';
import { CartPage } from './pages/CartPage/index';
import { StartPage } from './pages/StartPage/index';
import { DetailProductPage } from './pages/DetailProductPage/index';
import './App.css';
import { EmptyPage } from './pages/EmptyPage';

export function App() {

  return (
    <div className='mainFrame'>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<StartPage />} />       
          <Route path='products' element={<MainPage />} />
          <Route path='auth' element={<AuthPage />} />
          <Route path='reg' element={<RegPage />} />
          <Route path='user' element={<UserPage/>} />
          <Route path='cart' element={<CartPage />} />
          <Route path='products/:id' element={<DetailProductPage />} />
          <Route path='*' element={<EmptyPage/>} />
        </Route>
      </Routes>
    </div>
  );
}