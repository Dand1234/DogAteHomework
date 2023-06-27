import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../components/Spinner/Spinner";
import { cleanFav } from "../../redux/slices/favourite";
import { EmptyPage } from "../../components/EmptyPage";
import style from './index.module.css';
import { FavCard } from "../../components/FavCard";

export const FavPage = () => {
    const { token } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favIDs = useSelector(state => state.favourite);

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
                <button onClick={() => dispatch(cleanFav())} className={style.button}>Отчистить избранное</button>
                <button onClick={() => navigate('/products')} className={style.button}>Назад в каталог</button>
            </div>
        </div>
    )
}
