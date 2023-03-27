import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import './index.css'

export const MainPage = () => {

    const token = localStorage.getItem('token');

    const navigate = useNavigate(); 


    const{ data, isLoading, isError, error } = useQuery({
        queryKey:['getAllItems'],
        queryFn: async () => {
            const fetching = await fetch ('https://api.react-learning.ru/products', {
                method:'GET',
                headers:{Authorization: `Bearer ${token}`}
            });
            const parseData = await fetching.json();

            console.log(parseData.products);

            return parseData;
        }
    }
    )

    if(isLoading) return <h2>Loading</h2>


    return(
            <div className='container mainFrame'>
                {data.products.map(card =>
                    <div className="productCard" key = {card._id}>
                        <img src={card.pictures} alt="pucture" />
                        <h2>{card.name}</h2>
                        <p>likes: {card.likes.length}</p>
                        <button onClick={() => navigate('/detail')}>Подробнее</button>
                    </div>)}
                    
            </div>   
    )}
