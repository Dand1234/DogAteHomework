import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DetailProductPage = (id) => {

    const token = localStorage.getItem('token')

    const navigate = useNavigate();

    useEffect (() => {
        if (!token) navigate('/')
        }, [navigate, token])

    const {data:productFetch, isLoading, isError, error} = useQuery({
        queryKey: ['DetailProdQuery'],
        queryFn: async (id) => {
            const fetching = await fetch(`https://api.react-learning.ru/products/${id}`,{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await fetching.json();

            if (result.status !== 'ok') {
                throw new Error('Что-то пошло не так')
            }

            return result;
        } 
    })
    


    return(

        <>
            <h1>Страница {productFetch.name}</h1>
        </>
    )
}