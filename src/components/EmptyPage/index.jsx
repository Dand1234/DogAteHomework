import './index.css'
import { Link } from "react-router-dom"

export const EmptyPage = () => {
    return <div className="emptyCart">
      <p>Ничего нет!</p>
      <Link to={'/products'} className='emptyCart_link'>Вернуться к товарам</Link>
    </div>
  }