import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from '../../components/Spinner/Spinner';
import './index.css'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart";
import Star from '../../assets/pics/Star.png'
import { useState } from "react";

export const DetailProductPage = () => {
    const { token } = useAuth();
    const param = useParams();
    const dispatch = useDispatch();
    const productId = param.id;
    const [index,setIndex] = useState(0);

    const incrementHandler = (value) => {
        value++;
        if (value === productFetch.reviews.length) {return setIndex(0)}
        else return setIndex(value)
    }

    const decrementHandler = (value) => {
        value--;
        if (value < 0) {return setIndex(productFetch.reviews.length-1)}
        else return setIndex(value)
    }

    const {data:productFetch, isLoading, isError, error} = useQuery({
        queryKey: ['DetailProductQuery'],
        queryFn: async () => {
            const query = await fetch(`https://api.react-learning.ru/products/${productId}`,{
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await query.json();

            if (result.status > 399 && result.status < 500 ) throw new Error ('Повторите попытку регистрации');
            else if (result.status > 500 ) throw new Error ('Ошибка сервера, попробуйте позже'); 

            return result;
        } 
    })

    if (isLoading) return <Spinner />

    if (isError) return <h1>Error:{error.message}</h1>

    return(
        <div className="detailProd">
            <h2>{productFetch.name}</h2>
            <img src={productFetch.pictures} alt={productFetch.name} className='detailProd_img'/>
            <div className="detailProd_Items">
                <p className="detailProd_ItemPrice">{productFetch.price} р</p>
                <div className="comments_div"> 
                    <p className="detailProd_ItemDescript">{productFetch.description}</p>
                    <p>Вот, что говорят люди!</p>
                    <div className="comments">
                       <button onClick={() => decrementHandler(index)} className='comment__button'>&#8592;</button>
                       <span className="comments_section">{productFetch.reviews[index].text}<img src = {Star} alt='Rating' className="comment__star"/> {productFetch.reviews[index].rating}</span>
                       <button onClick={() => incrementHandler(index)} className='comment__button'>&#8594;</button>
                    </div>
                    {/* <img src = {Star} alt='Rating' className="comment_star"/> */}
                </div>
                <p className="detailProd_ItemAvaliable">{productFetch.avaliable ? 'Под заказ':'В наличии'}</p>
            </div>
            <span className="detailProd_likeSection">Нравится {productFetch.likes.length} людям</span>
            <button onClick={() => dispatch(addToCart(productFetch._id))} className='detailProd__button'>В корзину</button>
        </div>
    )
}