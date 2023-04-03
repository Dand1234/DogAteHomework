import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

export const DetailProductPage = () => {
    
    const id = useParams();

    const { token } = useAuth()

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