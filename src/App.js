import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { MainPage } from './pages/MainPage/MainPage';
import { RegPage } from './pages/RegPage/RegPage';
import { UserPage } from './pages/UserPage/UserPage';
import { CartPage } from './pages/CartPage/CartPage';
import { StartPage } from './pages/StartPage/StartPage';
import './App.css';



export function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<StartPage />} />       
          <Route path='main' element={<MainPage />} />
          <Route path='auth' element={<AuthPage />} />
          <Route path='reg' element={<RegPage />} />
          <Route path='user' element={<UserPage/>} />
          <Route path='cart' element={<CartPage />} />
        </Route>
      </Routes>
    </>
  );
}