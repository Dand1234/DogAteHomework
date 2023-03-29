import { NavLink, Link } from "react-router-dom";
import './index.css';
import Dog from '../../assets/pics/Dog.png';
import Cart from '../../assets/pics/Cart.png';
import User from '../../assets/pics/User.png';
import { SearchBar } from "../../components/SearchBar";

export const Header = () => {

    const token = localStorage.getItem('token')

    return(
        <>
            <header className='header'>
                <Link to={'main'}><img className="header__icon-main" src={Dog} alt='mainpage' /></Link>
                <span className="header__shopName">Dog store</span>
                <SearchBar token={token}/>
                <NavLink to={'cart'}><img className="header__icon" src={Cart} alt='Shopping Cart' /></NavLink>
                <NavLink to={'user'}><img className="header__icon" src={User} alt='Shopping Cart' /></NavLink>
            </header>  
        </>
    )
}