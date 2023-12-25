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
  const [errors, setErrors] = useState({
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
    const newErrors = {
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
    };

    if (isNaN(Number(newRow.amount))) {
      newErrors.amount = "Amount must be a valid number.";
    }
    if (isNaN(Number(newRow.duration))) {
      newErrors.duration = "Duration must be a valid number.";
    }
    if (isNaN(Number(newRow.payments))) {
      newErrors.payments = "Payments must be a valid number.";
    }
    if (isNaN(Number(newRow.year))) {
      newErrors.year = "Year must be a valid number.";
    }
    if (isNaN(Number(newRow.month))) {
      newErrors.month = "Month must be a valid number.";
    }
    if (isNaN(Number(newRow.day))) {
      newErrors.day = "Day must be a valid number.";
    }
    if (isNaN(Number(newRow.location))) {
      newErrors.location = "Location must be a valid number.";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return oldRow;
    }

    setErrors({});

    axios
      .put(
        `http://localhost:5000/update/completedloan/${newRow.loan_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedloan")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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

        axios
          .get("http://localhost:5000/api/data/get_completedloan")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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
    setErrors({
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

  const handleSaveNewRow = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/completedloan", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedloan")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    const numericFields = [
      "amount",
      "duration",
      "payments",
      "year",
      "month",
      "day",
      "location",
    ];
    numericFields.forEach((field) => {
      if (isNaN(Number(newRowData[field]))) {
        newErrors[field] = `${field} must be a numeric value`;
        valid = false;
      }
    });

    if (!newRowData.loan_id.trim()) {
      newErrors.loan_id = "Loan ID is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const columns = [
    { field: "loan_id", headerName: "Loan ID", flex: 0.5, editable: false },
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
        {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
        {errors.duration && (
          <div style={{ color: "red" }}>{errors.duration}</div>
        )}
        {errors.payments && (
          <div style={{ color: "red" }}>{errors.payments}</div>
        )}
        {errors.year && <div style={{ color: "red" }}>{errors.year}</div>}
        {errors.month && <div style={{ color: "red" }}>{errors.month}</div>}
        {errors.day && <div style={{ color: "red" }}>{errors.day}</div>}
        {errors.location && (
          <div style={{ color: "red" }}>{errors.location}</div>
        )}
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
            error={!!errors.loan_id}
            helperText={errors.loan_id}
          />
          <TextField
            label="Account ID"
            name="account_id"
            value={newRowData.account_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.account_id}
            helperText={errors.account_id}
          />
          <TextField
            label="Amount"
            name="amount"
            value={newRowData.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.amount}
            helperText={errors.amount}
          />
          <TextField
            label="Duration"
            name="duration"
            value={newRowData.duration}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.duration}
            helperText={errors.duration}
          />
          <TextField
            label="Payments"
            name="payments"
            value={newRowData.payments}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.payments}
            helperText={errors.payments}
          />
          <TextField
            label="Status"
            name="status"
            value={newRowData.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.status}
            helperText={errors.status}
          />
          <TextField
            label="Year"
            name="year"
            value={newRowData.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.year}
            helperText={errors.year}
          />
          <TextField
            label="Month"
            name="month"
            value={newRowData.month}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.month}
            helperText={errors.month}
          />
          <TextField
            label="Day"
            name="day"
            value={newRowData.day}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.day}
            helperText={errors.day}
          />
          <TextField
            label="Full Date"
            name="fulldate"
            value={newRowData.fulldate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.fulldate}
            helperText={errors.fulldate}
          />
          <TextField
            label="Location"
            name="location"
            value={newRowData.location}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            label="Purpose"
            name="purpose"
            value={newRowData.purpose}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.purpose}
            helperText={errors.purpose}
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

export default Loans;
