import './index.css';
import Like from '../../assets/pics/Like.png';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({card}) => {
    const navigate = useNavigate();

    return (
        <div className="productCard" key = {card._id}>
        <img src={card.pictures} alt="pucture" className='productCard__img' />
        <h2>{card.name}</h2>
        <img src={Like} alt='нрав' className='productCard__like'/><span> {card.likes.length}</span> {/*TODO:Стили иконки лайка*/}
        <button onClick={() => {navigate('/detail')}} className='productCard__button'>Подробнее</button>
        </div>
    )
}
