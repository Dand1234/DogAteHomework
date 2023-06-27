import style from './index.module.css';
import Like from '../../assets/pics/Like.png';
import { useNavigate } from 'react-router-dom';
import { addToCart } from "../../redux/slices/cart";
import { addToFav } from '../../redux/slices/favourite';
import { useDispatch } from 'react-redux';

export const ProductCard = ({card}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDetailNav = (card) => {
        return navigate({
            pathname: `/products/${card}`,
        });
    }

    return (
        <div className={style.productCard}>
            <img src={card.pictures} alt="pucture" className={style.img} />
            <h2>{card.name}</h2>
            <ul>
                <li>Цена:{card.price} р.</li>
            </ul>
            <div className={style.likes}><img src={Like} alt='нрав' className={style.like} /><span> {card.likes.length}</span></div>
            <button 
                onClick={() => {handleDetailNav(card._id)}} className={style.button}>
                Подробнее
            </button>
            <button
                onClick={() => dispatch(addToCart(card._id))} className={style.button}>
                Добавить в корзину
            </button>
            <button
                onClick={() => dispatch(addToFav(card._id))} className={style.button}>
                Добавить в избранное
            </button>
        </div>
    )
}
