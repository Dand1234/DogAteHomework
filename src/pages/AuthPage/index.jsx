import { Formik } from "formik";
import { useEffect } from "react";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import './index.css'

export const AuthPage = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect (() => {
      if (token) navigate('/main')
      },[navigate, token])

    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Укажите Ваш e-mail!'),
        password: yup.string().required('Укажите пароль!'),
      });

     const initialValues = {
        email: '',
        password: ''
    }


    const {mutateAsync:authQuery, isError, error } = useMutation({
      mutationKey: ['authQuery'],
      mutationFn: async (authData) => {
        
        const query = await fetch('https://api.react-learning.ru/signin',{
                  method: 'POST',
                  headers:{
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(authData),
              }
      );
        const result = await query.json();

        localStorage.setItem('token', `${result.token}`)

        return navigate('/main')   
    }

  })

    if (isError) return <h2>Ошибка:{error.message}</h2>

    const onSubmit = (values) => {
      console.log(values);
      authQuery(values);
    }

    return(
    <>
        <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, isValid, handleSubmit, handleChange, handleBlur, dirty }) => (
          <div className='wrapper'>
            <h1>Введите данные для входа</h1>
            <p>
              <label htmlFor='email'>Email</label><br />
              <input
                className='input'
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}

            <p>
              <label htmlFor='password'>Пароль</label><br />
              <input
                className='input'
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

            <button
              onClick={handleSubmit}
              type='submit'
              className="button"
            >Войти</button>
          </div>
        )}
      </Formik>
        <Link to='..'>Назад</Link>
    </>
    )
}