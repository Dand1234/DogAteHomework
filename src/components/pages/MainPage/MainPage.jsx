import { useQuery } from "@tanstack/react-query"

export const MainPage = () => {

    const{ data, isLoading, isError, error } = useQuery({
        queryKey:['getAllItems'],
        queryFn: async () => {
            const fetching = await fetch ('https://api.react-learning.ru/products');
            const parseData = await fetching.json();

            console.log(parseData)
        }
    }
    )

    return(
        <div>
            
        </div>
    )
}