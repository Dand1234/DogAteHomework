import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';
import { UserChangeNameOrAboutMdl } from "../../components/Modal/UserChangeMdl/UserChangeNameOrAboutMdl"
import { UserChangeAvatarMdl } from "../../components/Modal/UserChangeMdl/UserChangeAvatarMdl"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '../../redux/slices/user';
import { clearCart } from '../../redux/slices/cart';
import style from './index.module.css';


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
            <div className={style.userInfo}>
                <h1>Описание аккаунта</h1>
                <p>Ваше имя: {userData.name} </p>
                <p>Ваше описание: {userData.about}</p>
                <p>Ваше группа: {userData.group}</p>
                <img src = {userData.avatar} alt='Фотокарточка'/>
            </div>
            <div className={style.buttonSection}>
                    <button onClick = {() => setIsChangeAvatarOpen(true)} className={style.button}
                        >Изменить фото</button>
                    <button onClick = {() => setIsChangeNameOpen(true)} className={style.button}
                        >Изменить имя или описание</button>
                    <button onClick = {() => navigate('/myProducts')} className={style.button}
                        >Мои товары</button>
                    <button onClick={() => navigate('/products')} className={style.button}>Назад</button>
                    <button onClick={handleExit} className={style.exitButton}>Выход</button>
            </div>
            <Modal active={isChangeAvatarOpen} setActive={setIsChangeAvatarOpen}> {<UserChangeAvatarMdl />} </Modal>
            <Modal active={isChangeNameOpen} setActive={setIsChangeNameOpen}> {<UserChangeNameOrAboutMdl />} </Modal>
        </>
    )
}
