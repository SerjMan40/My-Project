import {Formik, Form, Field, FormikHelpers} from 'formik'
import {object, string} from 'yup'
import {Button, TextField, Grid, Container} from '@mui/material'
import {useDispatch} from 'react-redux'

import {setLoginData} from '../../redux/slices/itemsSlices'
import {LoginFormValues} from '../../types/interfaces'

const validationSchema = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required'),
})

const LoginForm = () => {
  const dispatch = useDispatch()

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  }

  const handleSubmit = (
    values: LoginFormValues,
    {setSubmitting}: FormikHelpers<any>
  ) => {
    setTimeout(() => {
      setSubmitting(false)
      dispatch(setLoginData(values))
    }, 400)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({errors, touched}) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default LoginForm
