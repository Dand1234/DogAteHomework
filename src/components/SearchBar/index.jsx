import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { changeSearch } from "../../redux/slices/search";
import style from './index.module.css';

export const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(() => {return searchParams.get('search') ? searchParams.get('search') : ''});
    const dispatch = useDispatch();
    const debounceValue = useDebounce(search, 200);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(changeSearch(debounceValue))
    }, [dispatch, debounceValue])

    const handleChange = (event) => {
        event.preventDefault()
        const searchValue = event.target.value;
        setSearch(searchValue)
        if (searchValue) {
        return navigate({
            pathname: '/products',
            search: `?search=${searchValue}`,
        });
        }

        navigate({
        pathname: '/products',
        });
    }

    return(
        <div className={style.searchBar}>
            <input
            className={style.input}
            placeholder='Что вы хотите найти?'
            type="text"
            value={search}
            onChange={handleChange} />
        </div>
    )
}