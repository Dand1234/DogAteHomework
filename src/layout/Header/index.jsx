import { NavLink, Link } from "react-router-dom";
import './index.css';
import Cart from '../../assets/pics/Cart.png';
import User from '../../assets/pics/User.png';
import Star from '../../assets/pics/Star.png';
import { SearchBar } from "../../components/SearchBar";
import { useSelector } from 'react-redux';

export const Header = () => {
    const { token } = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)

    return(
        <>
            <header className='header'>
                <Link to={'products'} className="header__shopName"><span>Dog store</span></Link>
                {token && <>
                    <SearchBar />
                    <div className="header__linkSection">
                        <NavLink to={'cart'}><img className="header__icon" src={Cart} alt='Корзина' /></NavLink>
                        {cart.length ? <span className="cartFillment">{cart.length}</span> : null} 
                        <NavLink to={'user'}><img className="header__icon" src={User} alt='Пользователь' /></NavLink>
                        <NavLink to={'fav'}><img className="header__icon-star" src={Star} alt='Избранное' /></NavLink>
                    </div>
                </>}
            </header>  
        </>
    )
}