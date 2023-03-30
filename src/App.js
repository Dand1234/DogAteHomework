import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { AuthPage } from './pages/AuthPage/index';
import { MainPage } from './pages/MainPage/index';
import { RegPage } from './pages/RegPage/index';
import { UserPage } from './pages/UserPage/index';
import { CartPage } from './pages/CartPage/index';
import { StartPage } from './pages/StartPage/index';
import { DetailProdPage } from './pages/DetailProdPage/index';
import './App.css';

export function App() {

  return (
    <div className='mainFrame'>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<StartPage />} />       
          <Route path='main' element={<MainPage />} />
          <Route path='auth' element={<AuthPage />} />
          <Route path='reg' element={<RegPage />} />
          <Route path='user' element={<UserPage/>} />
          <Route path='cart' element={<CartPage />} />
          <Route path='main/:id' element={<DetailProdPage />} />
        </Route>
      </Routes>
    </div>
  );
}