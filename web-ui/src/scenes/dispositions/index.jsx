import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";

const Dispositions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    disp_id: "",
    client_id: "",
    account_id: "",
    type: "",
  });

  useEffect(() => {
    // Make a request to the Flask backend
    axios
      .get("http://localhost:5000/api/data/get_completeddisposition")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    axios
      .put(
        `http://localhost:5000/update/completeddisposition/${newRow.disp_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.log("Error updating data:", error);
      });

    return newRow;
  };

  const handleDeleteRow = (disp_id) => {
    axios
      .delete(`http://localhost:5000/delete/completeddisposition/${disp_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        const updatedData = data.filter((row) => row.disp_id !== disp_id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  const handleAddRow = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveNewRow = () => {
    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/completeddisposition", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        setData((prevData) => [...prevData, newRowData]);
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
    setNewRowData({
      disp_id: "",
      client_id: "",
      account_id: "",
      type: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    { field: "disp_id", headerName: "Disposition ID", flex: 0.5 },
    { field: "client_id", headerName: "Client ID", flex: 1, editable: true },
    { field: "account_id", headerName: "Account ID", flex: 1, editable: true },
    { field: "type", headerName: "Type", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.disp_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DISPOSITIONS TABLE" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderbottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Button onClick={handleAddRow} variant="outlined" color="secondary">
          Add Row
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.disp_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Disposition ID"
            name="disp_id"
            value={newRowData.disp_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Client ID"
            name="client_id"
            value={newRowData.client_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Account ID"
            name="account_id"
            value={newRowData.account_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            name="type"
            value={newRowData.type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewRow} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dispositions;
