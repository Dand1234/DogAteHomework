import * as yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import './index.css';

export const SearchBar = (token) => {

    const validationsSchema = yup.object().shape({
        search: yup.string()
      })

      const initialValues = {
        search: '',
    }

    const {mutate:searchQuery} = useMutation({
        mutationKey:['searchQuery'],
        mutationFn: async (request) => {
            const fetching = await fetch (`https://api.react-learning.ru/products/search?query=:request`,{
                method: 'GET',
                header:{
                    Authorization: `Bearer ${token}`
                },
            })
            const result = await fetching.json();

            if (result === []) return <h2>По вашему запросу ничего не найдено!</h2>

            return result;
        }
    })

    const onSubmit = (values) =>{searchQuery(values)}


    return(
        <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationsSchema}
    >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
        <div className='searchBar'>

            <p>
            <input
                className='searchBar__input'
                type='search'
                name='search'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Что вы хотите найти?'
            />
            </p>

            <button
            onClick={handleSubmit}
            type='submit'
            className='searchBar__button'
            >Поиск</button>
        </div>
        )}
    </Formik>
    )
}