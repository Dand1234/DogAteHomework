import { Route, Routes } from 'react-router-dom';
import { AuthenticationPage } from './components/pages/AuthenticationPage/AuthenticationPage';
import { MainPage } from './components/pages/MainPage/MainPage';
import { RegistrationPage } from './components/pages/RegistrationPage/RegistrationPage';
import { Layout } from './components/Layout/Layout';
import { StartPage } from './components/pages/StartPage/StartPage';
import './App.css';
import { PersonalAccount } from './components/pages/PersonalAccount/PersonalAccount';
import { ShoppingCart } from './components/pages/ShoppingCart/ShoppingCart';
import { AccountChange } from './components/pages/AccountChange/AccountChange';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<StartPage />} />       
          <Route path='main' element={<MainPage />} />
          <Route path='authentication' element={<AuthenticationPage />} />
          <Route path='registration' element={<RegistrationPage />} />
          <Route path='user' element={<PersonalAccount/>} />
          <Route path='cart' element={<ShoppingCart />} />
          <Route path='userch' element={<AccountChange />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
