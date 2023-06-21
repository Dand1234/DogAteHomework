import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import style from './index.module.css';

export const StartPage = () => {

    const navigate = useNavigate();
    const { token } = useSelector(state => state.user)

    useEffect (() => {
        if (token) navigate('/products')
        },[navigate, token])

    return(
        <>
            <div className={style.wrapper}>
                <h1>Здравствуйте!</h1>
                <h2>Пожалуйста, войдите или зарегистрируйтесь!</h2>
                <div className={style.button}>
                    <button onClick={() => navigate('/auth')} className='button'>Войти</button>
                    <button onClick={() => navigate('/reg')} className='button'>Зарегистрироваться</button>
                </div>
            </div>
        </>
    )
}
