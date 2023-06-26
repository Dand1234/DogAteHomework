import { NavLink, Link } from "react-router-dom";
import style from './index.module.css';
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
            <header className={style.header}>
                <Link to={'products'} className={style.shopName}><span>Dog store</span></Link>
                {token && <>
                    <SearchBar />
                    <div className={style.links}>
                        <NavLink to={'cart'}><img className={style.icon} src={Cart} alt='Корзина' /></NavLink>
                        {cart.length ? <span className={style.cartFillment}>{cart.length}</span> : null} 
                        <NavLink to={'user'}><img className={style.icon} src={User} alt='Пользователь' /></NavLink>
                        <NavLink to={'fav'}><img className={style.favStar} src={Star} alt='Избранное' /></NavLink>
                    </div>
                </>}
            </header>  
        </>
    )
}