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

const Accounts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    account_id: "",
    district_id: "",
    frequency: "",
    parseddate: "",
    year: "",
    month: "",
    day: "",
  });

  useEffect(() => {
    // Make a request to the Flask backend
    axios
      .get("http://localhost:5000/api/data/get_completedacct")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    console.log("Old row is: ", oldRow);
    console.log("New row is: ", newRow);
    axios
      .put(`http://localhost:5000/update/completedacct/${newRow.account_id}`, {
        newRow,
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
    return newRow;
  };

  const handleDeleteRow = (selectedRowIds) => {
    console.log("Selected row ids: ", selectedRowIds);
    const updatedData = data.filter(
      (row) => !selectedRowIds.includes(row.account_id)
    );
    setData(updatedData);

    // Make a request to the Flask backend to delete the row
    const deletedRowIds = selectedRowIds.join(",");
    /*axios
      .delete(`http://localhost:5000/delete/completedacct/${deletedRowIds}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
        // If there's an error, you might want to revert the local state
        setData(data);
      });*/
  };

  const handleAddRow = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveNewRow = () => {
    const newRow = {
      ...newRowData,
    };

    setData((prevData) => [...prevData, newRow]);
    setDialogOpen(false);
    setNewRowData({
      account_id: "",
      district_id: "",
      frequency: "",
      parseddate: "",
      year: "",
      month: "",
      day: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    {
      field: "account_id",
      headerName: "Account ID",
      flex: 0.5,
      editable: false,
    },
    {
      field: "district_id",
      headerName: "District ID",
      flex: 1,
      editable: true,
    },
    { field: "frequency", headerName: "Frequency", flex: 1, editable: true },
    { field: "parseddate", headerName: "Parsed Date", flex: 1, editable: true },
    { field: "year", headerName: "Year", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
    { field: "day", headerName: "Day", flex: 1, editable: true },
  ];

  return (
    <Box m="20px">
      <Header
        title="ACCOUNTS"
        subtitle="List of Accounts for Future Reference"
      />
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
        <Button onClick={handleAddRow} variant="contained" color="primary">
          Add Row
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.account_id}
          processRowUpdate={handleEditCellChange}
        />
        <Button
          onClick={() => handleDeleteRow(data.map((row) => row.account_id))}
          variant="contained"
          color="secondary"
        >
          Delete Selected Rows
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Account ID"
            name="account_id"
            value={newRowData.account_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="District ID"
            name="district_id"
            value={newRowData.district_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Frequency"
            name="frequency"
            value={newRowData.frequency}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Parsed Date"
            name="parseddate"
            value={newRowData.parseddate}
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

export default Accounts;
