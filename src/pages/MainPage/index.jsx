import { useQuery } from "@tanstack/react-query";
import './index.css'
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAuth } from '../../hooks/useAuth'
import { useSelector } from "react-redux";

export const MainPage = () => {

    const { token } = useAuth();
    const { search } = useSelector(state => state.search)

    const{ data, isLoading, isError, error } = useQuery({
        queryKey:['getAllItems', search],
        queryFn: async () => {
            const query = await fetch(`https://api.react-learning.ru/products/search?query=${search}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })

            const parseData = await query.json();

            return parseData;
        }
    })

    if(isLoading) return <Spinner />


    return(
        <>
                <div className="mainWrapper">
                    {data.map(card =>
                     <ProductCard key={card._id} card={card}/>
                    )} 
            </div>   
        </>
                 
    )}
