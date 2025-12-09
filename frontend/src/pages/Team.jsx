import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from '../theme';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

import Header from '../section/Header';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const API = import.meta.env.VITE_API_URL;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await axios.get(`${API}/users`);
        setRows(res.data);
      } catch (err) {
        console.log('API Error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow({ ...row });
    setOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API}/users/${selectedRow.id}`, selectedRow);

      setRows(rows.map((u) => (u.id === selectedRow.id ? selectedRow : u)));

      setOpenEdit(false);
    } catch (err) {
      console.log('Update Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`);

      setRows(rows.filter((u) => u.id !== id));
    } catch (err) {
      console.log('Delete Error:', err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },

    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 100,
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },

    {
      field: 'access',
      headerName: 'Access',
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          width='60%'
          m='0 auto'
          p='5px'
          display='flex'
          justifyContent='center'
          backgroundColor={
            row.access === 'admin'
              ? colors.greenAccent[600]
              : row.access === 'manager'
              ? colors.greenAccent[700]
              : colors.greenAccent[700]
          }
          borderRadius='4px'
        >
          {row.access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
          {row.access === 'manager' && <SecurityOutlinedIcon />}
          {row.access === 'user' && <LockOpenOutlinedIcon />}

          <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
            {row.access}
          </Typography>
        </Box>
      ),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box display='flex' gap={1}>
          <EditIcon
            sx={{ cursor: 'pointer', color: colors.greenAccent[400] }}
            onClick={() => handleEdit(params.row)}
          />

          <DeleteIcon
            sx={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m='20px'>
      <Header title='TEAM' subtitle='Managing the Team Members' />

      <Box
        m='40px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader': {
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          checkboxSelection
        />
      </Box>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent>
          {selectedRow && (
            <Box display='flex' flexDirection='column' gap={2} mt={1}>
              <TextField
                label='Name'
                value={selectedRow.name}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, name: e.target.value })
                }
              />

              <TextField
                label='Email'
                value={selectedRow.email}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, email: e.target.value })
                }
              />

              <TextField
                label='Phone'
                value={selectedRow.phone}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, phone: e.target.value })
                }
              />

              <Button variant='contained' onClick={handleSave}>
                Save
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Team;
