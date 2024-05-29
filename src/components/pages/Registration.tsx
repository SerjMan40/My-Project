import {Formik, Form, Field, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {TextField, Button, Typography, Container, Grid} from '@mui/material'

import {RootState} from '../../redux/store'
import Footer from '../elements/Footer'
import './Registration.css'
import {
  isLogIn,
  registrationData,
  setRegistrationData,
} from '../../redux/slices/itemsSlices'
import {RegisterFormValues} from '../../types/interfaces'

const Registration = () => {
  const state = useSelector((state: RootState) => state.items.registrationData)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const initialValues = registrationData

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const handleSubmit = (
    values: RegisterFormValues,
    {setSubmitting}: FormikHelpers<any>
  ) => {
    setTimeout(() => {
      setSubmitting(false)
      dispatch(setRegistrationData({...values, isRegistering: true}))
      dispatch(isLogIn())
      navigate('/')
    }, 400)
  }

  return (
    <div className="img-background__blur">
      <div className="class-container">
        <main>
          <div className="registration-container">
            {state.isRegistering ? (
              <h1>You have successfully registered!</h1>
            ) : (
              <Container component="main" maxWidth="xs">
                <div>
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{marginBottom: '20px'}}
                  >
                    Register
                  </Typography>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({isSubmitting, errors, touched}) => (
                      <Form>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              type="email"
                              name="email"
                              label="Email Address"
                              variant="outlined"
                              fullWidth
                              error={touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              type="text"
                              name="username"
                              label="Username"
                              variant="outlined"
                              fullWidth
                              error={touched.username && !!errors.username}
                              helperText={touched.username && errors.username}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              type="text"
                              name="firstName"
                              label="First Name"
                              variant="outlined"
                              fullWidth
                              error={touched.firstName && !!errors.firstName}
                              helperText={touched.firstName && errors.firstName}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              type="text"
                              name="lastName"
                              label="Last Name"
                              variant="outlined"
                              fullWidth
                              error={touched.lastName && !!errors.lastName}
                              helperText={touched.lastName && errors.lastName}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              type="password"
                              name="password"
                              label="Password"
                              variant="outlined"
                              fullWidth
                              error={touched.password && !!errors.password}
                              helperText={touched.password && errors.password}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              type="password"
                              name="confirmPassword"
                              label="Confirm Password"
                              variant="outlined"
                              fullWidth
                              error={
                                touched.confirmPassword &&
                                !!errors.confirmPassword
                              }
                              helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              Register
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Container>
            )}
          </div>
        </main>
        <div className="class-footer">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Registration
