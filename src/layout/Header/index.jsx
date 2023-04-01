import { NavLink, Link } from "react-router-dom";
import './index.css';
import Cart from '../../assets/pics/Cart.png';
import User from '../../assets/pics/User.png';
import { SearchBar } from "../../components/SearchBar";
import { useSelector } from 'react-redux';

export const Header = () => {
    const { token } = useSelector(state => state.user)

    return(
        <>
            <header className='header'>
                <Link to={'products'} className="header__shopName"><span>Dog store</span></Link>
                {token && <SearchBar />}
                {token && <NavLink to={'cart'}><img className="header__icon" src={Cart} alt='Shopping Cart' /></NavLink>}
                {token && <NavLink to={'user'}><img className="header__icon" src={User} alt='Shopping Cart' /></NavLink>}
            </header>  
        </>
    )
}