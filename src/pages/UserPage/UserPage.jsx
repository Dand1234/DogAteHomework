import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';
import { UserChangeNameOrAboutMdl } from "../../components/Modal/UserChangeMdl/UserChangeNameOrAboutMdl"
import { UserChangeAvatarMdl } from "../../components/Modal/UserChangeMdl/UserChangeAvatarMdl"


export const UserPage = () => {

    const [modalState, setModalState] = useState(false);

    const [modalVisual, setModalVisual] = useState()

    const token = localStorage.getItem('token');

    
    const {data, isLoading, isError, error, refetch} = useQuery({
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
            <img src = {data.avatar} alt='Фотокарточка'/>
            <button onClick = {() => {setModalState(true);
                 setModalVisual(<UserChangeAvatarMdl />)}}
                 >Изменить фото</button>
            <button onClick = {() => {setModalState(true);
                setModalVisual(<UserChangeNameOrAboutMdl />)}}
                >Изменить имя или описание</button>         
            <button><Link to = "..">Назад</Link></button>
            <Modal active={modalState} setActive={setModalState} Children={modalVisual}/>   
        </>
    )
}