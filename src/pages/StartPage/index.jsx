import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import '../StartPage/index.css'

export const StartPage = () => {

    const navigate = useNavigate();
    const { token } = useSelector(state => state.user)

    useEffect (() => {
        if (token) navigate('/products')
        },[navigate, token])

    return(
        <>
            <div className='wrapper'>
                <h1>Здравствуйте!</h1>
                <h2>Пожалуйста, войдите или зарегистрируйтесь!</h2>
                <div className='start__buttonSection'>
                    <button onClick={() => navigate('/auth')} className='button'>Войти</button>
                    <button onClick={() => navigate('/reg')} className='button'>Зарегистрироваться</button>
                </div>
            </div>
        </>
    )
}