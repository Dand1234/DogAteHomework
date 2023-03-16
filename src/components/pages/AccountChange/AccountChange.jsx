import { useMutation } from "@tanstack/react-query";
import * as yup from 'yup';
import { Formik } from "formik";
import { Link } from "react-router-dom";

export function AccountChange() {
    
    const validationsSchema = yup.object().shape({
        avatar: yup.string(),
        name: yup.string(),
        about: yup.string(),
      })

    const initialValues={
        avatar: ``,
        name: ``,
        about: ``,
    }

    const {mutate:changeQuery, isLoading, isError, error} = useMutation({
      mutationKey:['changingNameOrDescript'],
      mutationFn: async (values) => {
        const fetching = await fetch ('https://api.react-learning.ru/v2/:groupId/users/me', {
          method: 'POST',
          headers:{           
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
          }
        )

        const result = await fetching.json();

        const test = await console.log(result);

        return result;
      } 
    }
  )

    return(
        <>
        <Formik
        
        initialValues={initialValues}

        validateOnBlur
        onSubmit={(values) => { 
            console.log(values);
            changeQuery(values)
            
        }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={`from`}>

            <p>
              <label htmlFor={`name`}>Новое имя</label><br />
              <input
                className={'input'}
                type={`name`}
                name={`name`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.name && errors.name && <p className={'error'}>{errors.name}</p>}

            <p>
              <label htmlFor={`about`}>Новое описание</label><br />
              <input
                className={'input'}
                type={`about`}
                name={`about`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.about && errors.about && <p className={'error'}>{errors.about}</p>}

            <p>
              <label htmlFor={`avatar`}>Ссылка на Ваше новое фото:</label><br />
              <input
                className={'input'}
                type={`avatar`}
                name={`avatar`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.avatar && errors.avatar && <p className={'error'}>{errors.avatar}</p>}

            <button
              disabled={!isValid || !dirty}
              onClick={handleSubmit}
              type={`submit`}
            >Регистрация</button>
          </div>
        )}
      </Formik>
        <Link to='..'><button>Назад</button></Link>
        </>
    )
}