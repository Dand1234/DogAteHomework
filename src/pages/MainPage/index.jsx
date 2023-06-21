import { useQuery } from "@tanstack/react-query";
import style from './index.module.css'
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAuth } from '../../hooks/useAuth'
import { useSelector } from "react-redux";
import { EmptySearch } from "../../components/EmptySearch";

export const MainPage = () => {

    const { token } = useAuth();
    const { search } = useSelector(state => state.search)

    const{ data:products, isLoading } = useQuery({
        queryKey:['getAllItems', search],
        queryFn: async () => {
            const query = await fetch(`https://api.react-learning.ru/products/search?query=${search}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })

            const parseData = await query.json();

            if (parseData.status > 399 && parseData.status < 500 ) throw new Error ('Повторите попытку регистрации');
            else if (parseData.status > 500 ) throw new Error ('Ошибка сервера, попробуйте позже');

            return parseData;
        }
    })

    if (isLoading) return <Spinner />

    if (products.length === 0) return (<EmptySearch />)

    return(
            <div className={style.mainWrapper}>
                {products.map(card =>
                    <ProductCard key={card._id} card={card}/>
                )}
            </div>

    )}
