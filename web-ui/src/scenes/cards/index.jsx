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

const Cards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    card_id: "",
    disp_id: "",
    type: "",
    year: "",
    month: "",
    day: "",
    fulldate: "",
  });

  useEffect(() => {
    // Make a request to the Flask backend
    axios
      .get("http://localhost:5000/api/data/get_completedcard")
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
        `http://localhost:5000/update/completedcard/${newRow.card_id}`,
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

  const handleDeleteRow = (card_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedcard/${card_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        const updatedData = data.filter((row) => row.card_id !== card_id);
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
      .post("http://localhost:5000/insert/completedcard", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        setData((prevData) => [...prevData, newRowData]);
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
    setNewRowData({
      card_id: "",
      disp_id: "",
      type: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    { field: "card_id", headerName: "Card ID", flex: 0.5, editable: true },
    { field: "disp_id", headerName: "Disposition ID", flex: 1, editable: true },
    { field: "type", headerName: "Type", flex: 1, editable: true },
    { field: "year", headerName: "Year", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
    { field: "day", headerName: "Day", flex: 1, editable: true },
    { field: "fulldate", headerName: "Full Date", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.card_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CARDS TABLE" />
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
          getRowId={(row) => row.card_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Card ID"
            name="card_id"
            value={newRowData.card_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Disposition ID"
            name="disp_id"
            value={newRowData.disp_id}
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
          <TextField
            label="Year"
            name="year"
            value={newRowData.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Month"
            name="month"
            value={newRowData.month}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Day"
            name="day"
            value={newRowData.day}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Full Date"
            name="fulldate"
            value={newRowData.fulldate}
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

export default Cards;
