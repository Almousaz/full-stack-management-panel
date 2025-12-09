import { Box, Button, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../section/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

const WorkOrderForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const createOrder = async (data) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}/workorders`, data);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createOrder(values);
      alert('Work order saved!');
      resetForm();
    } catch (err) {
      alert(err, 'Error saving work order');
    }
  };

  return (
    <div>
      <Box m='20px'>
        <Header title='CREATE WORK ORDER' subtitle='New work order' />

        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={schema}
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
                gridTemplateColumns='repeat(4, minmax(0,1fr))'
                sx={{
                  '& > div': {
                    gridColumn: isNonMobile ? undefined : 'span 4',
                  },
                }}
              >
                <TextField
                  label='Title'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: 'span 4' }}
                  variant='filled'
                  fullWidth
                />

                <TextField
                  label='Description'
                  name='description'
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={3}
                  sx={{ gridColumn: 'span 4' }}
                  variant='filled'
                  fullWidth
                />

                <TextField
                  label='Priority'
                  name='priority'
                  value={values.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ gridColumn: 'span 2' }}
                  variant='filled'
                  fullWidth
                />

                <TextField
                  label='Asset ID'
                  name='assetId'
                  value={values.assetId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ gridColumn: 'span 2' }}
                  variant='filled'
                  fullWidth
                />

                <TextField
                  label='Due Date'
                  type='date'
                  name='dueDate'
                  value={values.dueDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: true }}
                  sx={{ gridColumn: 'span 4' }}
                  variant='filled'
                  fullWidth
                />
              </Box>

              <Box display='flex' justifyContent='flex-end' gap={2} mt={1}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: colors.blueAccent[500],
                    '&:hover': { backgroundColor: colors.blueAccent[600] },
                  }}
                  onClick={() => navigate('/work-orders-list')}
                >
                  Back
                </Button>

                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    '&:hover': { backgroundColor: colors.greenAccent[600] },
                  }}
                >
                  Create Work Order
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

// Validation
const schema = yup.object().shape({
  title: yup.string().required('required'),
});

// Initial
const initialValues = {
  title: '',
  description: '',
  priority: '',
  assetId: '',
  dueDate: '',
};

export default WorkOrderForm;
