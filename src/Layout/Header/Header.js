import { NavLink, Link } from "react-router-dom";
import './Header.css';
import Dog from '../../assets/pics/Dog.png';
import Cart from '../../assets/pics/Cart.png';
import User from '../../assets/pics/User.png'

export const Header = () => {


    return(
        <>
            <header className='header'>
                <Link to={'main'}><img className="header__icon-main" src={Dog} alt='mainpage' /></Link>
                                            {/*TODO: Сделать стили для иконок*/}
                <NavLink to={'cart'}><img className="header__icon" src={Cart} alt='Shopping Cart' /></NavLink>
                <NavLink to={'user'}><img className="header__icon" src={User} alt='Shopping Cart' /></NavLink>
            </header>  
        </>
    )
}