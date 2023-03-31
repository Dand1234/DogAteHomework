import { useQuery } from "@tanstack/react-query";
import { Modal } from '../../components/Modal/Modal';
import { useState,useEffect } from 'react';
import { UserChangeNameOrAboutMdl } from "../../components/Modal/UserChangeMdl/UserChangeNameOrAboutMdl"
import { UserChangeAvatarMdl } from "../../components/Modal/UserChangeMdl/UserChangeAvatarMdl"
import { useNavigate } from "react-router-dom";
import './index.css'
import { Spinner } from "../../components/Spinner/Spinner";


export const UserPage = () => {

    const [modalState, setModalState] = useState(false);
    const [modalVisual, setModalVisual] = useState();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect (() => {
        if (!token) navigate('/')
        }, [navigate, token])

    const modalOpenHandler = (element) => {
        setModalState(true);
        setModalVisual(element)
    }
    
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['gettingUserData'],
        queryFn: async () => {
           const fetching = await fetch('https://api.react-learning.ru/v2/9-gr/users/me',{
                method:'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
            })

            const result = await fetching.json();
            
            return result;
        }
    });

    if(isLoading) return <Spinner />

    if (isError) {
        return <p>Что-то пошло не так: {error.message}</p>
    }

    return (
        <>
            <div className="userInfo">
                <h1>Описание аккаунта</h1>
                <p>Ваше имя: {data.name} </p>
                <p>Ваше описание: {data.about}</p>
                <p>Ваше группа: {data.group}</p>
                <img src = {data.avatar} alt='Фотокарточка'/>
            </div>
            <div className="buttonSection">            
                    <button onClick = {() => modalOpenHandler(<UserChangeAvatarMdl />)} className='buttonSection__button'
                        >Изменить фото</button>
                    <button onClick = {() => modalOpenHandler(<UserChangeNameOrAboutMdl />)} className='buttonSection__button'
                        >Изменить имя или описание</button>         
                    <button onClick={() => navigate('..')} className='buttonSection__button'>Назад</button>
            </div>
            <Modal active={modalState} setActive={setModalState} children={modalVisual}/> 
            {/* не совсем понял, почему нельзя передавать тело модалки через стейт (и, если честно, как это по другому реализовать) */}
        </>
    )
}