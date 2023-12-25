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

const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    column_a: "",
    trans_id: "",
    account_id: "",
    type: "",
    operation: "",
    amount: "",
    balance: "",
    k_symbol: "",
    bank: "",
    account: "",
    year: "",
    month: "",
    day: "",
    fulldate: "",
    fulltime: "",
    fulldatewithtime: "",
  });

  const [errors, setErrors] = useState({
    column_a: "",
    trans_id: "",
    account_id: "",
    type: "",
    operation: "",
    amount: "",
    balance: "",
    k_symbol: "",
    bank: "",
    account: "",
    year: "",
    month: "",
    day: "",
    fulldate: "",
    fulltime: "",
    fulldatewithtime: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/get_completedtrans")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    const newErrors = {
      column_a: "",
      trans_id: "",
      account_id: "",
      type: "",
      operation: "",
      amount: "",
      balance: "",
      k_symbol: "",
      bank: "",
      account: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
      fulltime: "",
      fulldatewithtime: "",
    };

    const numericFields = [
      "column_a",
      "amount",
      "balance",
      "year",
      "month",
      "day",
    ];

    numericFields.forEach((field) => {
      if (isNaN(newRow[field])) {
        newErrors[field] = `${field} must be a valid number.`;
      }
    });

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return oldRow;
    }

    setErrors({});

    axios
      .put(
        `http://localhost:5000/update/completedtrans/${newRow.trans_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedtrans")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log("Error updating data:", error);

        setErrors({ ...newErrors, general: "Error updating data." });
      });

    return newRow;
  };

  const handleDeleteRow = (trans_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedtrans/${trans_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        axios
          .get("http://localhost:5000/api/data/get_completedtrans")
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
      column_a: "",
      trans_id: "",
      account_id: "",
      type: "",
      operation: "",
      amount: "",
      balance: "",
      k_symbol: "",
      bank: "",
      account: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
      fulltime: "",
      fulldatewithtime: "",
    });
  };

  const handleSaveNewRow = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/completedtrans", newRowData)
      .then((response) => {
        axios
          .get("http://localhost:5000/api/data/get_completedtrans")
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
      column_a: "",
      trans_id: "",
      account_id: "",
      type: "",
      operation: "",
      amount: "",
      balance: "",
      k_symbol: "",
      bank: "",
      account: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
      fulltime: "",
      fulldatewithtime: "",
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
      "column_a",
      "amount",
      "balance",
      "year",
      "month",
      "day",
    ];
    numericFields.forEach((field) => {
      if (isNaN(Number(newRowData[field]))) {
        newErrors[field] = `${field} must be a numeric value`;
        valid = false;
      }
    });

    if (!newRowData.column_a.trim()) {
      newErrors.column_a = "Column A is required";
      valid = false;
    }

    if (!newRowData.trans_id.trim()) {
      newErrors.trans_id = "Trans ID is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const columns = [
    { field: "column_a", headerName: "Column A", flex: 0.5, editable: false },
    {
      field: "trans_id",
      headerName: "Transaction ID",
      flex: 1,
      editable: false,
    },
    { field: "account_id", headerName: "Account ID", flex: 1, editable: true },
    { field: "type", headerName: "Type", flex: 1, editable: true },
    { field: "operation", headerName: "Operation", flex: 1, editable: true },
    { field: "amount", headerName: "Amount", flex: 1, editable: true },
    { field: "balance", headerName: "Balance", flex: 1, editable: true },
    { field: "k_symbol", headerName: "K Symbol", flex: 1, editable: true },
    { field: "bank", headerName: "Bank", flex: 1, editable: true },
    { field: "account", headerName: "Account", flex: 1, editable: true },
    { field: "year", headerName: "Year", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
    { field: "day", headerName: "Day", flex: 1, editable: true },
    { field: "fulldate", headerName: "Full Date", flex: 1, editable: true },
    { field: "fulltime", headerName: "Full Time", flex: 1, editable: true },
    {
      field: "fulldatewithtime",
      headerName: "Full Date With Time",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.trans_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TRANSACTIONS TABLE" />
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
        {errors.column_a && (
          <div style={{ color: "red" }}>{errors.column_a}</div>
        )}
        {errors.trans_id && (
          <div style={{ color: "red" }}>{errors.trans_id}</div>
        )}
        {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
        {errors.balance && <div style={{ color: "red" }}>{errors.balance}</div>}
        {errors.year && <div style={{ color: "red" }}>{errors.year}</div>}
        {errors.month && <div style={{ color: "red" }}>{errors.month}</div>}
        {errors.day && <div style={{ color: "red" }}>{errors.day}</div>}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddRow}
          style={{ marginTop: "20px" }}
        >
          Add New Row
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.trans_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Column A"
            name="column_a"
            value={newRowData.column_a}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.column_a)}
            helperText={errors.column_a}
          />
          <TextField
            label="Transaction ID"
            name="trans_id"
            value={newRowData.trans_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.trans_id)}
            helperText={errors.trans_id}
          />
          <TextField
            label="Account ID"
            name="account_id"
            value={newRowData.account_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.account_id)}
            helperText={errors.account_id}
          />
          <TextField
            label="Type"
            name="type"
            value={newRowData.type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.type)}
            helperText={errors.type}
          />
          <TextField
            label="Operation"
            name="operation"
            value={newRowData.operation}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.operation)}
            helperText={errors.operation}
          />
          <TextField
            label="Amount"
            name="amount"
            value={newRowData.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.amount)}
            helperText={errors.amount}
          />
          <TextField
            label="Balance"
            name="balance"
            value={newRowData.balance}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.balance)}
            helperText={errors.balance}
          />
          <TextField
            label="K Symbol"
            name="k_symbol"
            value={newRowData.k_symbol}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.k_symbol)}
            helperText={errors.k_symbol}
          />
          <TextField
            label="Bank"
            name="bank"
            value={newRowData.bank}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.bank)}
            helperText={errors.bank}
          />
          <TextField
            label="Account"
            name="account"
            value={newRowData.account}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.account)}
            helperText={errors.account}
          />
          <TextField
            label="Year"
            name="year"
            value={newRowData.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.year)}
            helperText={errors.year}
          />
          <TextField
            label="Month"
            name="month"
            value={newRowData.month}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.month)}
            helperText={errors.month}
          />
          <TextField
            label="Day"
            name="day"
            value={newRowData.day}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.day)}
            helperText={errors.day}
          />
          <TextField
            label="Full Date"
            name="fulldate"
            value={newRowData.fulldate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.fulldate)}
            helperText={errors.fulldate}
          />
          <TextField
            label="Full Time"
            name="fulltime"
            value={newRowData.fulltime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.fulltime)}
            helperText={errors.fulltime}
          />
          <TextField
            label="Full Date With Time"
            name="fulldatewithtime"
            value={newRowData.fulldatewithtime}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.fulldatewithtime)}
            helperText={errors.fulldatewithtime}
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

export default Transactions;
