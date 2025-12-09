import { Box, Button, TextField, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../section/Header';
import axios from 'axios';

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const API_URL = `${import.meta.env.VITE_API_URL}/users`;

  const createUser = async (userData) => {
    return await axios.post(API_URL, userData);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const res = await createUser(values);
      console.log('Saved data!', res.data);
      alert('User created successfully');
      resetForm();
    } catch (error) {
      console.log(error);
      alert('Error creating user');
    }
  };

  return (
    <Box m='20px'>
      <Header title='CREATE TEAM USER' subtitle='Add a New Team Member' />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                name='name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='number'
                label='Age'
                name='age'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='email'
                label='Email'
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Phone Number'
                name='phone'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 4' }}
              />

              <TextField
                fullWidth
                select
                variant='filled'
                label='Access Level'
                name='access'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.access}
                error={!!touched.access && !!errors.access}
                helperText={touched.access && errors.access}
                sx={{ gridColumn: 'span 4' }}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='manager'>Manager</MenuItem>
                <MenuItem value='user'>User</MenuItem>
              </TextField>
            </Box>

            <Box display='flex' justifyContent='end' mt='20px'>
              <Button type='submit' color='secondary' variant='contained'>
                Create Team Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required('required'),
  age: yup.number().required('required').positive().integer(),
  email: yup.string().email('invalid email').required('required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Invalid phone')
    .required('required'),
  access: yup.string().required('required'),
});

const initialValues = {
  name: '',
  age: '',
  email: '',
  phone: '',
  access: 'user',
};

export default Form;
