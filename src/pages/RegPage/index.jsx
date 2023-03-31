import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import './index.css';
import { useEffect } from "react";

export const RegPage = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect (() => {
      if (token) navigate('/main')
      },[navigate, token])

    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Укажите Ваш e-mail!'),
        password: yup.string().required('Укажите пароль!'),
        group: yup.string().required('Укажите номер Вашей группы!'),
      })

      const initialValues = {
        email: '',
        password: '',
        group: ''
    }
    

    const {mutateAsync:regQuery, isError, error } = useMutation({
        mutationKey: ['registrationQuery'],
        mutationFn: async (regData) => {
            const fetching = await fetch(
                'https://api.react-learning.ru/signup',
                {
                    method: 'POST',
                    headers:{
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(regData),
                },
        )

            const res = await fetching.json();

              if (res.status === 409 ) throw new Error ('Пользователь с указанным E-mail уже существует!');
              else if (res.status > 399 && res.status < 500 ) throw new Error ('Повторите попытку регистрации');
              else if (res.status > 500 ) throw new Error ('Ошибка сервера, попробуйте позже');   

            else return navigate('../auth')
        }})

    if (isError) return <p>Ошибка:{error.message}</p>

    const onSubmit = (values) => { 
      regQuery(values);
    }
      

    return(
        <>
          <Formik
          initialValues={initialValues}
          validateOnBlur
          onSubmit={onSubmit}
          validationSchema={validationsSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <div className='wrapper'>
              <h2>Введите данные для регистрации</h2>
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
              {touched.email && errors.email && <p className='error'>{errors.email}</p>}

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

              <p>
                <label htmlFor='group'>Номер группы</label><br />
                <input
                  className='input'
                  type='group'
                  name='group'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.group}
                />
              </p>
              {touched.group && errors.group && <p className={'error'}>{errors.group}</p>}

              <button
                onClick={handleSubmit}
                type='submit'
                className="button"
              >Регистрация</button>
            </div>
          )}
        </Formik>
        <button onClick={() => navigate('..')} className="button">Назад</button>
        </>
    )
}