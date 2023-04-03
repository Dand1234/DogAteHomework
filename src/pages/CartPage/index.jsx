import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Spinner } from "../../components/Spinner/Spinner"
import { useAuth } from "../../hooks/useAuth"
import { deleteFromCart, dicrementProduct, incrementProduct, clearCart, changeCheck } from "../../redux/slices/cart"
import './index.css'

const totalPrice = (count, price, discount) => {
    return count * price * (1 - discount / 100)
  }


const RealCart = () => {
  const cart = useSelector(state => state.cart)
  const { token } = useAuth()

  const { data: productsChecked } = useQuery({
    queryKey: ['cartProducts', cart],
    queryFn: async () => {
      return await Promise.allSettled(
        cart.map(async cartProduct => {
          const product = await fetch(`https://api.react-learning.ru/products/${cartProduct.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }   
          })
            .then(res => res.json())
          return { ...product, isChecked: cartProduct.isChecked, count: cartProduct.count }
        }))
        .then(res => res.map(elememt => elememt.value).filter(el => el.isChecked === true))
    },
    enabled: !!cart.length,
  })

  let totalPriceOfAll = 0;
  productsChecked && productsChecked.forEach(({ count, price, discount }) => {
    totalPriceOfAll += totalPrice(count, price, discount)
  });


  return (
    <div className="realCart">
      <p>Всего: <span>{totalPriceOfAll} руб.</span></p>
    </div>
  )
}

const NoProductsInCart = () => {
  return <div className="emptyCart">
    <p>Ничего нет в корзине</p>
    <Link to={'/products'} className='emptyCart_link'>Вернуться к товарам</Link>
  </div>
}

const ProductInCart = ({ product: { name, price, discount, _id, stock, pictures } }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const { count, isChecked } = cart.find(el => el.id === _id)

  return <li className="listItem">
    <input
      type="checkbox"
      onChange={(event) => dispatch(changeCheck({ _id, isChecked: event.target.checked }))}
      checked={isChecked}
    />
    <img src={pictures} alt={name} className='productImg'/>
    {name}
    <span className="numberSection">{count} штук</span>
    <div className="countDiv">
      <button
        className="buttonCart"
        onClick={() => dispatch(dicrementProduct(_id))}
      >
        -
      </button>
      <span className="numberSection">
        {totalPrice(count, price, discount)} р
      </span>
      <button
        className="buttonCart"
        disabled={count === stock}
        onClick={() => dispatch(incrementProduct(_id))}
      >
        +
      </button>
    </div>
    <button
      className="buttonCart"
      onClick={() => dispatch(deleteFromCart(_id))}
    >
      X
    </button>
  </li>
}

export const CartPage = () => {
  const { token } = useAuth()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const { data: products, isLoading } = useQuery({
    queryKey: ['cartProducts', cart.length],
    queryFn: async () => {
      return await Promise.allSettled(
        cart.map(async cartProduct =>
          await fetch(`https://api.react-learning.ru/products/${cartProduct.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }   
          })
            .then(res => res.json())))
        .then(res => res.map(elememt => elememt.value))
    },
    enabled: !!cart.length,
  })

  if (!cart.length) return <NoProductsInCart />
  if (isLoading) return <Spinner />

  return (
    <>
      <h1 className="headerOfCart">Корзина</h1>
      <ul className="list-group">
        {products.map(product => <ProductInCart product={product} key={product._id} />)}
      </ul>
      <button onClick={() => dispatch(clearCart())} className="cleanAll">Очистить корзину</button>
      <div className="deleteAndCountSection">
        <RealCart />
      </div>
    </>
  )
}