import { Box } from '@mui/material';
import Header from '../../section/Header';
import BarChart from '../../components/chart/BarChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Bar = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/dashboard/counts`)
      .then((res) => {
        const d = res.data;

        const formatted = [
          { category: 'Users', value: d.users },
          { category: 'Assets', value: d.assets },
          { category: 'WorkOrders', value: d.workorders },
        ];

        setChartData(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m='20px'>
      <Header title='Bar Chart' subtitle='Simple Bar Chart' />
      <Box height='75vh'>
        <BarChart chartData={chartData} />
      </Box>
    </Box>
  );
};

export default Bar;
