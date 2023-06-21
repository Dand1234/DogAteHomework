import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/Spinner/Spinner";
import { deleteFromFav, cleanFav } from "../../redux/slices/favourite";
import { EmptyPage } from "../../components/EmptyPage";
import { addToCart } from "../../redux/slices/cart";
import style from './index.module.css'

export const FavPage = () => {
    const { token } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favIDs = useSelector(state => state.favourite);

    const FavCard = ({product}) => {
        return(
            <div className={style.card}>
                <h5>{product.name}</h5>
                <img src={product.pictures} alt={product.name} className={style.cardImg}/>
                <ul>
                    <li>Цена:{product.price} р.</li>
                </ul>
                <span>Понравилось {product.likes.length} людям!</span>
                <div>
                    <button onClick={() => dispatch(deleteFromFav(product._id))} className={style.cardButton}>Убрать из избранного</button>
                    <button onClick={() => dispatch(addToCart(product._id))} className={style.cardButton}>Добавить в корзину</button>
                </div>
            </div>
        )}

    const { data: favQuery, isLoading } = useQuery({
        queryKey: ['favQuery', favIDs.length],
        queryFn: async () => {
          return await Promise.allSettled(
            favIDs.map(async favProduct =>
              await fetch(`https://api.react-learning.ru/products/${favProduct.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
                .then(res => res.json())))
            .then(result => result.map(elememt => elememt.value))
        },
        enabled: !!favIDs.length,
      })

      if (!favIDs.length) return <EmptyPage />

      if (isLoading) return <Spinner />

    return(
        <div className={style.favWrapper}>
            <h1>Избранные товары </h1>
            <div className={style.cards}>
                {favQuery.map(product => <FavCard key={product._id} product={product}/>)}
            </div>
            <div>
                <button onClick={() => dispatch(cleanFav())} className={style.cardButton}>Отчистить избранное</button>
                <button onClick={() => navigate('/products')} className={style.cardButton}>Назад в каталог</button>
            </div>
        </div>
    )
}
