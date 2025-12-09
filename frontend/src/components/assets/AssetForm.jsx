import { Box, Button, TextField, useTheme } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../section/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

const AssetForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const navigate = useNavigate();

  const createAsset = async (data) => {
    return await axios.post(`${import.meta.env.VITE_API_URL}/assets`, data);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await createAsset(values);
      alert('Asset saved!');
      resetForm();
    } catch (err) {
      alert(err, 'Error saving asset');
    }
  };

  return (
    <Box m='20px'>
      <Header title='CREATE ASSET' subtitle='Add a new asset' />

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
                label='Asset Name'
                name='assetName'
                value={values.assetName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.assetName && !!errors.assetName}
                helperText={touched.assetName && errors.assetName}
                sx={{ gridColumn: 'span 2' }}
                variant='filled'
                fullWidth
              />

              <TextField
                label='Asset Tag'
                name='assetTag'
                value={values.assetTag}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.assetTag && !!errors.assetTag}
                helperText={touched.assetTag && errors.assetTag}
                sx={{ gridColumn: 'span 2' }}
                variant='filled'
                fullWidth
              />

              <TextField
                label='Category'
                name='category'
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: 'span 2' }}
                variant='filled'
                fullWidth
              />

              <TextField
                label='Status'
                name='status'
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: 'span 2' }}
                variant='filled'
                fullWidth
              />

              <TextField
                label='Location'
                name='location'
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: 'span 4' }}
                variant='filled'
                fullWidth
              />
            </Box>

            <Box display='flex' justifyContent='flex-end' gap={2} mt='20px'>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: colors.redAccent[500],
                  '&:hover': { backgroundColor: colors.blueAccent[600] },
                }}
                onClick={() => navigate('/asset-list')}
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
                Create Asset
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation
const schema = yup.object().shape({
  assetName: yup.string().required('required'),
  assetTag: yup.string().required('required'),
  category: yup.string().required('required'),
  status: yup.string().required('required'),
  location: yup.string().required('required'),
});

// Initial Values
const initialValues = {
  assetName: '',
  assetTag: '',
  category: '',
  status: '',
  location: '',
};

export default AssetForm;
