import { Outlet} from 'react-router-dom';
import './index.css';
import { Header } from '../Header/index';

export const Layout = () => {

    return(
        <div className='layout'> 
            <Header /> 
            <main>
                 <Outlet />      
            </main>
        </div>
    )
}