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

const WorkOrderList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/workorders`
        );
        setRows(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/workorders/${selectedRow.id}`,
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/workorders/${id}`);
      setRows(rows.filter((r) => r.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID' },

    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    { field: 'description', headerName: 'Description', flex: 1 },

    { field: 'priority', headerName: 'Priority', flex: 1 },

    { field: 'assetId', headerName: 'Asset ID', flex: 1 },

    { field: 'dueDate', headerName: 'Due Date', flex: 1 },

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
      <Header title='WORK ORDERS' subtitle='Managing Work Orders' />

      <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: colors.greenAccent[500],
            '&:hover': { backgroundColor: colors.greenAccent[600] },
          }}
          onClick={() => navigate('/work-order')}
        >
          Create Work Order
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
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} loading={loading} />
      </Box>

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Work Order</DialogTitle>

        <DialogContent>
          {selectedRow && (
            <Box display='flex' flexDirection='column' gap={2} mt={1}>
              {['title', 'description', 'priority', 'assetId', 'dueDate'].map(
                (field) => (
                  <TextField
                    key={field}
                    label={field}
                    value={selectedRow[field]}
                    onChange={(e) =>
                      setSelectedRow({
                        ...selectedRow,
                        [field]: e.target.value,
                      })
                    }
                  />
                )
              )}

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

export default WorkOrderList;
