import style from './index.module.css'
import Dog from '../../assets/pics/Dog.jpg'

export const NotFoundPage = () => {
    return (
        <div className= {style.wrapperNotFound}>
            <h2 className={style.errorText}>Такой страницы не существует!</h2>
            <h1>404</h1>
            <img src={Dog} alt='Ничего нету!' className={style.dog} />
        </div>
    )
}
