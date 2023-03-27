import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import '../StartPage/index.css'

export const StartPage = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect (() => {if (token !== 'undefined') navigate('/main')})

    return(
        <>
            <div className='startDiv'>
                <h1>Здравствуйте!</h1>
                <h2>Пожалуйста, войдите или зарегистриркйтесь!</h2>
                <button onClick={() => navigate('/auth')}>Войти</button>
                <button onClick={() => navigate('/reg')}>Зарегистрироваться</button>
            </div>
        </>
    )
}