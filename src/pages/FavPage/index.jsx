import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/Spinner/Spinner";
import { deleteFromFav, cleanFav } from "../../redux/slices/favourite";
import './index.css'
import { EmptyPage } from "../../components/EmptyPage";
import { addToCart } from "../../redux/slices/cart";

export const FavPage = () => {
    const { token } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favIDs = useSelector(state => state.favourite);

    const FavCard = ({product}) => {
        return(
            <div className="favCard">
                <h5>{product.name}</h5>
                <img src={product.pictures} alt={product.name} className='favCard__img'/>
                <ul>
                    <li>Цена:{product.price} р.</li>
                </ul>
                <span>Понравилось {product.likes.length} людям!</span>
                <div>
                    <button onClick={() => dispatch(deleteFromFav(product._id))} className='favCard_button'>Убрать из избранного</button>
                    <button onClick={() => dispatch(addToCart(product._id))} className='favCard_button'>Добавить в корзину</button>
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
        <div className="favWrapper">
            <h1>Избранные товары </h1>
            <div className="favWrapper__Cards">
                {favQuery.map(product => <FavCard key={product._id} product={product}/>)}
            </div>
            <div>
                <button onClick={() => dispatch(cleanFav())} className='favCard_button'>Отчистить избранное</button>
                <button onClick={() => navigate('/products')} className='favCard_button'>Назад в каталог</button>
            </div>
        </div>
    )
}