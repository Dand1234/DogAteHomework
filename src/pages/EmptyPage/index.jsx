import './index.css'
import Dog from '../../assets/pics/Dog.jpg'

export const EmptyPage = () => {
    return ( 
        <div className='wrapperNotFound'>
            <h2 className="errorText">Такой страницы не существует!</h2>
            <h1>404</h1>
            <img src={Dog} alt='Ничего нету!' className='dog' />
        </div>
    )
} 