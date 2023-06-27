import style from './index.module.css';

export const EmptySearch = () => {
    return ( 
        <div className={style.wrapper}>
            <h2 className={style.errorText}>По Вашему запросу ничего не найдено!</h2>
        </div>
    )
} 