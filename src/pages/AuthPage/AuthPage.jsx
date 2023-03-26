import { Formik } from "formik";
import * as yup from 'yup';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useState } from "react";


export const AuthPage = () => {

    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Укажите Ваш e-mail!'),
        password: yup.string().required('Укажите пароль!'),
      });

     const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
      localStorage.setItem('email',`${values.email}`)
      localStorage.setItem('password',`${values.password}`)
      authQuery(values);
    }


    const navigate = useNavigate();

    const {mutateAsync:authQuery, isLoading, isError, error } = useMutation({
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

        localStorage.setItem('token',`${result.token}`)

        navigate('../main')
        
        return result;
    }

  })

    if (isLoading) return <h2>Loading in progress</h2>

    if (isError) return <h2>Ошибка:{error.message}</h2>

    return(
    <>
        Введите данные для входа:
        <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, isValid, handleSubmit, handleChange, handleBlur, dirty }) => (
          <div className={`from`}>

            <p>
              <label htmlFor={`email`}>Email</label><br />
              <input
                className={'input'}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}

            <p>
              <label htmlFor={`password`}>Пароль</label><br />
              <input
                className={'input'}
                type={`password`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

            <button
              onClick={handleSubmit}
              type={`submit`}
            >Войти</button>
          </div>
        )}
      </Formik>
        <Link to='..'>Назад</Link>
    </>
    )
}