import { addToCart } from "../../redux/slices/cart";
import { deleteFromFav } from "../../redux/slices/favourite";
import { useDispatch } from "react-redux";
import style from "./index.module.css";


export const FavCard = ({product}) => {

    const dispatch = useDispatch();

    return(
        <div className={style.card}>
            <h5>{product.name}</h5>
            <img src={product.pictures} alt={product.name} className={style.img}/>
            <ul>
                <li>Цена:{product.price} р.</li>
            </ul>
            <span>Понравилось {product.likes.length} людям!</span>
            <div>
                <button onClick={() => dispatch(deleteFromFav(product._id))} className={style.button}>Убрать из избранного</button>
                <button onClick={() => dispatch(addToCart(product._id))} className={style.button}>Добавить в корзину</button>
            </div>
        </div>
    )}