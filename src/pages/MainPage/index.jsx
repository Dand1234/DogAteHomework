import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './index.css'
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner/Spinner";

export const MainPage = () => {
    const navigate = useNavigate(); 

    const token = localStorage.getItem('token');

    useEffect (() => {
        if (!token) navigate('/')
        }, [navigate, token])

    const{ data, isLoading, isError, error } = useQuery({
        queryKey:['getAllItems'],
        queryFn: async () => {
            const fetching = await fetch ('https://api.react-learning.ru/products', {
                method:'GET',
                headers:{Authorization: `Bearer ${token}`}
            });
            const parseData = await fetching.json();

            return parseData;
        }
    }
    )

    if(isLoading) return <Spinner />


    return(
        <>
                <div className="mainWrapper">
                    {data.products.map(card =>
                        <ProductCard key={card._id} card={card}/>
                    )} 
            </div>   
        </>
                 
    )}
