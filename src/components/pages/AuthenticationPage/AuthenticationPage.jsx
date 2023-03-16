import { Formik } from "formik";
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { useState } from "react";


export const AuthenticationPage = () => {
    const validationsSchema = yup.object().shape({
        email: yup.string().email('Введите верный email').required('Укажите Ваш e-mail!'),
        password: yup.string().required('Укажите пароль!'),
      });

    const navigate = useNavigate();
    const [body,setBody] = useState({});

    const { mutate:authQuery, isLoading, isError, error } = useMutation({
      mutationKey: ["authentification"],
      mutationFn: () => {
          fetch("https://api.react-learning.ru/signin", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(responce => {localStorage.setItem('token',responce.token);
      })
      },
    });  

    if (isLoading) return <h2>Loading in progress</h2>

    if (isError) return <h2>Ошибка:{error.message}</h2>

    return(
    <>
        This is an Authentication page
        <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validateOnBlur
        onSubmit={(values) => { 
          setBody(values);
          console.log(body)
          authQuery(body);
         }}
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
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type={`submit`}
            >Войти</button>
          </div>
        )}
      </Formik>
        <Link to='..'><button>Back</button></Link>
    </>
    )
}