import style from './index.module.css'
import { Link } from "react-router-dom"

export const EmptyPage = () => {
    return <div className={style.emptyCart}>
      <p>Ничего нет!</p>
      <Link to={'/products'} className={style.link}>Вернуться к товарам</Link>
    </div>
  }