import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';
import { UserChangeNameOrAboutMdl } from "../../components/Modal/UserChangeMdl/UserChangeNameOrAboutMdl"
import { UserChangeAvatarMdl } from "../../components/Modal/UserChangeMdl/UserChangeAvatarMdl"
import { useNavigate } from "react-router-dom";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '../../redux/slices/user';
import { clearCart } from '../../redux/slices/cart';


export const UserPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChangeNameOpen, setIsChangeNameOpen] = useState(false);
    const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);

    const handleExit = () => {
        navigate('/');
        dispatch(removeUser());
        dispatch(clearCart());
      
      }
    
    const userData = useSelector(state => state.user)

    return (
        <>
            <div className="userInfo">
                <h1>Описание аккаунта</h1>
                <p>Ваше имя: {userData.name} </p>
                <p>Ваше описание: {userData.about}</p>
                <p>Ваше группа: {userData.group}</p>
                <img src = {userData.avatar} alt='Фотокарточка'/>
            </div>
            <div className="buttonSection">            
                    <button onClick = {() => setIsChangeAvatarOpen(true)} className='buttonSection__button'
                        >Изменить фото</button>
                    <button onClick = {() => setIsChangeNameOpen(true)} className='buttonSection__button'
                        >Изменить имя или описание</button>         
                    <button onClick={() => navigate('/products')} className='buttonSection__button'>Назад</button>
                    <button onClick={handleExit} className='buttonSection__button-exit'>Выход</button>
            </div>
            <Modal active={isChangeAvatarOpen} setActive={setIsChangeAvatarOpen}> {<UserChangeAvatarMdl />} </Modal>
            <Modal active={isChangeNameOpen} setActive={setIsChangeNameOpen}> {<UserChangeNameOrAboutMdl />} </Modal>
        </>
    )
}