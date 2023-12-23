import React, { useState, useEffect } from "react";
import axios from "axios";
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

const Loans = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    loan_id: "",
    account_id: "",
    amount: "",
    duration: "",
    payments: "",
    status: "",
    year: "",
    month: "",
    day: "",
    fulldate: "",
    location: "",
    purpose: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/get_completedloan")
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
        `http://localhost:5000/update/completedloan/${newRow.loan_id}`,
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

  const handleDeleteRow = (loan_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedloan/${loan_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        const updatedData = data.filter((row) => row.loan_id !== loan_id);
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
      .post("http://localhost:5000/insert/completedloan", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        setData((prevData) => [...prevData, newRowData]);
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
    setNewRowData({
      loan_id: "",
      account_id: "",
      amount: "",
      duration: "",
      payments: "",
      status: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
      location: "",
      purpose: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    { field: "loan_id", headerName: "Loan ID", flex: 0.5, editable: true },
    { field: "account_id", headerName: "Account ID", flex: 1, editable: true },
    { field: "amount", headerName: "Amount", flex: 1, editable: true },
    { field: "duration", headerName: "Duration", flex: 1, editable: true },
    { field: "payments", headerName: "Payments", flex: 1, editable: true },
    { field: "status", headerName: "Status", flex: 1, editable: true },
    { field: "year", headerName: "Year", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
    { field: "day", headerName: "Day", flex: 1, editable: true },
    { field: "fulldate", headerName: "Full Date", flex: 1, editable: true },
    { field: "location", headerName: "Location", flex: 1, editable: true },
    { field: "purpose", headerName: "Purpose", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.loan_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="LOANS TABLE" />
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
          getRowId={(row) => row.loan_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Loan ID"
            name="loan_id"
            value={newRowData.loan_id}
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
            label="Amount"
            name="amount"
            value={newRowData.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            name="duration"
            value={newRowData.duration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Payments"
            name="payments"
            value={newRowData.payments}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={newRowData.status}
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
          <TextField
            label="Location"
            name="location"
            value={newRowData.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Purpose"
            name="purpose"
            value={newRowData.purpose}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={handleSaveNewRow}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Loans;
