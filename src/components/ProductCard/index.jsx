import './index.css';
import Like from '../../assets/pics/Like.png';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({card}) => {
    const navigate = useNavigate();

    return (
        <div className="productCard" key = {card._id}>
        <img src={card.pictures} alt="pucture" />
        <h2>{card.name}</h2>
        <p><img src={Like} alt='нрав' className='productCard__like'/> {card.likes.length}</p> {/*TODO:Стили иконки лайка*/}
        <button onClick={() => {navigate('/detail')}}>Подробнее</button>
        </div>
    )
}
