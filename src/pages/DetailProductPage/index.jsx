import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from '../../components/Spinner/Spinner';
import './index.css'
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart";

export const DetailProductPage = () => {
    const { token } = useAuth();
    const param = useParams();
    const dispatch = useDispatch();
    const productId = param.id;

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
                <p className="detailProd_ItemDescript">{productFetch.description}</p>
                <p className="detailProd_ItemAvaliable">{productFetch.avaliable ? 'Под заказ':'В наличии'}</p>
            </div>
            <span className="detailProd_likeSection">Нравится {productFetch.likes.length} людям</span>
            <p>Вот, что говорят люди!</p>
            <div className="comments">
                {productFetch.reviews.map(comment => <p key={comment._id}>{comment.text}</p>)}
            </div>
            <button onClick={() => dispatch(addToCart(productFetch._id))} className='detailProd__button'>В корзину</button>
        </div>
    )
}