import { Formik } from "formik";
import * as yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { useSelector,useDispatch } from "react-redux";
import { changeUserData } from "../../../redux/slices/user";

export const UserChangeNameOrAboutMdl = () => {

    const { name,about } = useSelector (state => state.user)
    const dispatch = useDispatch();

    const validationsSchema = yup.object().shape({
        name: yup.string(),
        about: yup.string(),
      })

    const initialValues = {
        name: `${name}`,
        about: `${about}`
    }

    const onSubmit = (values) => {
      changeNameOrAbout(values)
      dispatch(changeUserData(values))
    }

    const { token } = useSelector(state => state.user)

  
      const {mutateAsync:changeNameOrAbout, isError, error} = useMutation({
          mustationKey: ['changeNameOrAbout'],
          mutationFn: async (info) => {
              const query = await fetch ("https://api.react-learning.ru/v2/9-gr/users/me",{
                  method: 'PATCH',
                  headers:{
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(info),
              })

              if (query.status > 399 && query.status < 500 ) throw new Error ('Повторите попытку регистрации');
              else if (query.status > 500 ) throw new Error ('Ошибка сервера, попробуйте позже'); 

              return query;
          }
      
      })

      if (isError) return <h2>Ошибка:{error.message}</h2>


    return(

        <Formik
        initialValues={initialValues}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <div className={`from`}>

            <p>
              <label htmlFor={`name`}>Имя</label><br />
              <input
                className={'input'}
                type={`name`}
                name={`name`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </p>
            {touched.name && errors.name && <p className={'name'}>{errors.name}</p>}

            <p>
              <label htmlFor={`about`}>Описание</label><br />
              <input
                className={'input'}
                type={`about`}
                name={`about`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
              />
            </p>
            {touched.about && errors.about && <p className={'about'}>{errors.about}</p>}

            <button
              onClick={handleSubmit}
              type={`submit`}
            >Войти</button>
          </div>
        )}
      </Formik>
    )
}