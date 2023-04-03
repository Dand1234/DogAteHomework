import './index.css';
import Like from '../../assets/pics/Like.png';
import { useNavigate } from 'react-router-dom';
import { addToCart } from "../../redux/slices/cart"
import { useDispatch } from 'react-redux';

export const ProductCard = ({card}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="productCard" key = {card._id}>
            <img src={card.pictures} alt="pucture" className='productCard__img' />
            <h2>{card.name}</h2>
            <div className='likeSection'><img src={Like} alt='нрав' className='productCard__like'/><span> {card.likes.length}</span></div>
            <button onClick={() => {navigate('/detail')}} className='productCard__button'>Подробнее</button>
            <button
                onClick={() => dispatch(addToCart(card._id))} className="productCard__button">
                Добавить в корзину
            </button>
        </div>
    )
}
