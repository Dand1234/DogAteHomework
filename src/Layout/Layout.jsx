import { Outlet} from 'react-router-dom';
import './Layout.css';
import { Header } from './Header/Header';

export const Layout = () => {

    return(
        <div className='layout'> 
            <Header /> 
            <Outlet />       
        </div>
    )
}