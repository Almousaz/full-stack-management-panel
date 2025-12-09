import { useState, useEffect } from 'react';
import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

import { tokens } from '../../theme';
import Header from '../../section/Header';
import { useNavigate } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AssetList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/assets`);
        setRows(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/assets/${selectedRow.id}`,
        selectedRow
      );

      setRows(rows.map((r) => (r.id === selectedRow.id ? selectedRow : r)));

      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/assets/${id}`);
      setRows(rows.filter((r) => r.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID' },

    {
      field: 'assetName',
      headerName: 'Asset Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    { field: 'assetTag', headerName: 'Asset Tag', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },

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
            sx={{ cursor: 'pointer', color: colors.redAccent?.[400] || 'red' }}
            onClick={() => handleDelete(params.row.id)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m='20px'>
      <Header title='ASSETS' subtitle='Managing Company Assets' />

      
      <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: colors.greenAccent[500],
            '&:hover': { backgroundColor: colors.greenAccent[600] },
          }}
          onClick={() => navigate('/asset')}
        >
          Create Asset
        </Button>
      </Box>

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
            borderBottom: 'none',
          },

          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },

          '& .MuiDataGrid-footerContainer .MuiDataGrid-footerContainer': {
            borderTop: 'none',
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
        <DialogTitle>Edit Asset</DialogTitle>

        <DialogContent>
          {selectedRow && (
            <Box display='flex' flexDirection='column' gap={2} mt={1}>
              <TextField
                label='Asset Name'
                value={selectedRow.assetName}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, assetName: e.target.value })
                }
              />

              <TextField
                label='Asset Tag'
                value={selectedRow.assetTag}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, assetTag: e.target.value })
                }
              />

              <TextField
                label='Category'
                value={selectedRow.category}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, category: e.target.value })
                }
              />

              <TextField
                label='Status'
                value={selectedRow.status}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, status: e.target.value })
                }
              />

              <TextField
                label='Location'
                value={selectedRow.location}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, location: e.target.value })
                }
              />

              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AssetList;
