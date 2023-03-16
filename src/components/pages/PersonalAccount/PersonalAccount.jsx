import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

export const PersonalAccount = () => {

    const token = localStorage.getItem('token');
    
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['gettingUserData'],
        queryFn: async () => {
           const first = await fetch('https://api.react-learning.ru/v2/9-gr/users/me',{
                method:'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
            })

            const second = await first.json();
            
            return second;
        }
    });

    if (isLoading){
        return <p>Загрузка</p>
    }

    if (isError) {
        return <p>Error: {error.message}</p>
    }

    return (
        <>
            <p>Ваше имя: {data.name} </p>
            <p>Ваше описание: {data.about}</p>
            <p>Ваше группа: {data.group}</p>
            <img src={data.name} alt='Фотокарточка'/>
            <Link to="/">Назад</Link>
            <Link to="../userCh">Изменить данные аккаунта</Link>
            
        </>
    )
}