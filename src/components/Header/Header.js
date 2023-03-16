import { NavLink, Link } from "react-router-dom";
import './Header.css';
import Dog from '../Pics&Imgs/Dog.png';
import Cart from '../Pics&Imgs/Cart.png';
import User from '../Pics&Imgs/User.png'

export const Header = () => {


    return(
        <>
            <header className='header'>
                <Link to={'main'}><img className="header__dog-image" src={Dog} alt='mainpage' /></Link>
                                            {/*TODO: Сделать стили для иконок*/}
                <NavLink to={'cart'}><img className="header__dog-image" src={Cart} alt='Shopping Cart' /></NavLink>
                <NavLink to={'user'}><img className="header__dog-image" src={User} alt='Shopping Cart' /></NavLink>
            </header>  
        </>
    )
}