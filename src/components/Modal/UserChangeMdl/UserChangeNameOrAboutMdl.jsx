import { Formik } from "formik";
import * as yup from 'yup';
import { useMutation } from "@tanstack/react-query";

export const UserChangeNameOrAboutMdl = () => {

    const validationsSchema = yup.object().shape({
        name: yup.string(),
        about: yup.string(),
      })

    const initialValues = {
        name: '',
        about:'',
    }

    const onSubmit = (values) => {
      changeNameOrAbout(values)
    }

    const token = localStorage.getItem('token');

  
      const {mutateAsync:changeNameOrAbout, isError, error} = useMutation({
          mustationKey: ['changeNameOrAbout'],
          mutationFn: async (info) => {
              const fetching = await fetch ("https://api.react-learning.ru/v2/9-gr/users/me",{
                  method: 'PATCH',
                  headers:{
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(info),
              })
          }
      
      })


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