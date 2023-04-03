import './index.css'
import Empty from '../../assets/pics/Empty.png'

export const EmptySearch = () => {
    return ( 
        <div className='wrapperNotFound'>
            <h2 className="errorText">По Вашему запросу ничего не найдено!</h2>
            <img src={Empty} alt='Ничего нету' />
            {/* Если надо, пикчу уберу */}
        </div>
    )
} 