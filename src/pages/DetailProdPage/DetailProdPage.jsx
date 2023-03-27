import { useQuery } from "@tanstack/react-query"

export const DetailProdPage = () => {

    const token = localStorage.getItem('token')
    
    const {data:product, isLoading, isError, error} = useQuery({
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
            <h1>{product.name}</h1>
        </>
    )
}