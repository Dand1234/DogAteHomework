import { Formik } from "formik";
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query'
import { useSelector } from "react-redux";

export const UserChangeAvatarMdl = () => {

    const validationsSchema = yup.object().shape({
        avatar: yup.string(),
      })

    const initialValues = {
        avatar: '',
    }

    const onSubmit = (values) => {
        changeAvatar(values)

    }

    const { token } = useSelector(state => state.user);

    const {mutateAsync:changeAvatar, isError, error} = useMutation({
        mustationKey: ['changeAvatar'],
        mutationFn: async (info) => {
            const query = await fetch ("https://api.react-learning.ru/v2/9-gr/users/me/avatar",{
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
              <label htmlFor={`avatar`}>Аватар</label><br />
              <input
                className={'input'}
                type={`avatar`}
                name={`avatar`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.avatar}
              />
            </p>
            {touched.avatar && errors.avatar && <p className={'avatar'}>{errors.avatar}</p>}

            <button
              onClick={handleSubmit}
              type={`submit`}
            >Изменить</button>
          </div>
        )}
      </Formik>
    )
}