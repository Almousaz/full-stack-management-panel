import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';

import Header from '../section/Header';
import ProgressCircle from '../section/ProgressCircle';
import StatBox from '../section/StatBox';
import BarChart from '../components/chart/BarChart';

import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [barData, setBarData] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [woRes, userRes, countRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/workorders`),
          axios.get(`${import.meta.env.VITE_API_URL}/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/dashboard/counts`),
        ]);

        setWorkOrders(woRes.data);
        setUsers(userRes.data);

        const b = countRes.data;
        setBarData([
          { category: 'Users', value: b.users },
          { category: 'Assets', value: b.assets },
          { category: 'WorkOrders', value: b.workorders },
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box m='20px'>
        {/* HEADER */}
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Reports
          </Button>
        </Box>

        {/* GRID */}
        <Box
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gridAutoRows='140px'
          gap='20px'
        >
          {/* ROW 1 – STATS */}
          <Box
            gridColumn='span 3'
            backgroundColor={colors.primary[400]}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <StatBox
              title={users.length}
              subtitle='Total Users'
              progress={0.75}
              increase='+4%'
              icon={
                <PersonIcon
                  sx={{ color: colors.greenAccent[600], fontSize: 26 }}
                />
              }
            />
          </Box>

          <Box
            gridColumn='span 3'
            backgroundColor={colors.primary[400]}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <StatBox
              title={workOrders.length}
              subtitle='Work Orders Created'
              progress={0.55}
              increase='+12%'
              icon={
                <AssignmentIcon
                  sx={{ color: colors.greenAccent[600], fontSize: 26 }}
                />
              }
            />
          </Box>

          <Box
            gridColumn='span 3'
            backgroundColor={colors.primary[400]}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <StatBox
              title='87'
              subtitle='Total Assets'
              progress={0.35}
              increase='+3%'
              icon={
                <InventoryIcon
                  sx={{ color: colors.greenAccent[600], fontSize: 26 }}
                />
              }
            />
          </Box>

          <Box
            gridColumn='span 3'
            backgroundColor={colors.primary[400]}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <StatBox
              title='19'
              subtitle='Pending Work Orders'
              progress={0.68}
              increase='+9%'
              icon={
                <PendingActionsIcon
                  sx={{ color: colors.greenAccent[600], fontSize: 26 }}
                />
              }
            />
          </Box>

          {/* ROW 2 - WORK ORDERS LIST */}
          <Box
            gridColumn='span 8'
            gridRow='span 2'
            backgroundColor={colors.primary[400]}
            overflow='auto'
          >
            <Box
              mt='25px'
              p='0 30px'
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography
                variant='h5'
                fontWeight='600'
                color={colors.grey[100]}
              >
                Work Orders
              </Typography>
            </Box>

            <Box p='20px'>
              {workOrders.length === 0 ? (
                <Typography color={colors.grey[300]}>
                  No work orders available
                </Typography>
              ) : (
                workOrders.map((wo) => (
                  <Box
                    key={wo.id}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom={`1px solid ${colors.primary[500]}`}
                    p='10px 0'
                  >
                    <Typography color={colors.grey[100]} fontWeight='600'>
                      {wo.title}
                    </Typography>

                    <Typography color={colors.greenAccent[400]}>
                      {wo.priority || 'No Priority'}
                    </Typography>

                    <Typography color={colors.grey[300]}>
                      Due: {wo.dueDate || 'N/A'}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* ROW 2 - USERS LIST */}
          <Box
            gridColumn='span 4'
            gridRow='span 2'
            backgroundColor={colors.primary[400]}
            overflow='auto'
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              borderBottom={`4px solid ${colors.primary[500]}`}
              p='15px'
            >
              <Typography
                color={colors.grey[100]}
                variant='h5'
                fontWeight='600'
              >
                Users
              </Typography>
            </Box>

            <Box p='15px'>
              {users.length === 0 ? (
                <Typography color={colors.grey[300]}>
                  No users available
                </Typography>
              ) : (
                users.map((user) => (
                  <Box
                    key={user.id}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom={`1px solid ${colors.primary[500]}`}
                    p='10px 0'
                  >
                    <Typography color={colors.grey[100]} fontWeight='600'>
                      {user.name}
                    </Typography>

                    <Typography color={colors.greenAccent[400]}>
                      {user.access}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn='span 4'
            gridRow='span 2'
            backgroundColor={colors.primary[400]}
            p='30px'
          >
            <Typography variant='h5' fontWeight='600'>
              Campaign
            </Typography>

            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              mt='25px'
            >
              <ProgressCircle size='125' />

              <Typography
                variant='h5'
                color={colors.greenAccent[500]}
                sx={{ mt: '15px' }}
              >
                $48,352 revenue generated
              </Typography>

              <Typography>
                Includes extra misc expenditures and costs
              </Typography>
            </Box>
          </Box>

          {/* BAR CHART */}
          <Box
            gridColumn='span 4'
            gridRow='span 2'
            backgroundColor={colors.primary[400]}
          >
            <Typography variant='h5' fontWeight='600' sx={{ p: '30px 30px 0' }}>
              Sales Quantity
            </Typography>

            <Box height='250px' mt='-20px'>
              <BarChart isDashboard={true} chartData={barData} />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
