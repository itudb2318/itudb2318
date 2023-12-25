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
  const [errors, setErrors] = useState({
    account_id: "",
    district_id: "",
    frequency: "",
    parseddate: "",
    year: "",
    month: "",
    day: "",
  });
  const [editErrors, setEditErrors] = useState({
    account_id: "",
    district_id: "",
    frequency: "",
    parseddate: "",
    year: "",
    month: "",
    day: "",
  });

  useEffect(() => {
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
    const newErrors = {
      account_id: "",
      district_id: "",
      frequency: "",
      parseddate: "",
      year: "",
      month: "",
      day: "",
    };

    if (!newRow.account_id) {
      newErrors.account_id = "Account ID is required.";
    }

    if (isNaN(newRow.district_id)) {
      newErrors.district_id = "District ID must be a valid number.";
    }

    if (isNaN(newRow.year)) {
      newErrors.year = "Year must be a valid number.";
    }

    if (isNaN(newRow.month)) {
      newErrors.month = "Month must be a valid number.";
    }

    if (isNaN(newRow.day)) {
      newErrors.day = "Day must be a valid number.";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setEditErrors(newErrors);
      return oldRow;
    }

    setEditErrors({});

    axios
      .put(
        `http://localhost:5000/update/completedacct/${newRow.account_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedacct")
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

  const handleDeleteRow = (account_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedacct/${account_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedacct")
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
      account_id: "",
      district_id: "",
      frequency: "",
      parseddate: "",
      year: "",
      month: "",
      day: "",
    });
  };

  const handleSaveNewRow = () => {
    const newErrors = {
      account_id: "",
      district_id: "",
      frequency: "",
      parseddate: "",
      year: "",
      month: "",
      day: "",
    };

    const newRow = {
      ...newRowData,
      district_id: parseInt(newRowData.district_id, 10),
      year: parseInt(newRowData.year, 10),
      month: parseInt(newRowData.month, 10),
      day: parseInt(newRowData.day, 10),
    };

    if (!newRow.account_id) {
      newErrors.account_id = "Account ID is required.";
    }

    if (isNaN(newRow.district_id)) {
      newErrors.district_id = "District ID must be a valid number.";
    }

    if (isNaN(newRow.year)) {
      newErrors.year = "Year must be a valid number.";
    }

    if (isNaN(newRow.month)) {
      newErrors.month = "Month must be a valid number.";
    }

    if (isNaN(newRow.day)) {
      newErrors.day = "Day must be a valid number.";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setDialogOpen(false);

    axios
      .post("http://localhost:5000/insert/completedacct", newRow)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedacct")
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
      account_id: "",
      district_id: "",
      frequency: "",
      parseddate: "",
      year: "",
      month: "",
      day: "",
    });
    setErrors({
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.account_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ACCOUNTS TABLE" />
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
        {editErrors.account_id && (
          <div style={{ color: "red" }}>{editErrors.account_id}</div>
        )}
        {editErrors.district_id && (
          <div style={{ color: "red" }}>{editErrors.district_id}</div>
        )}
        {editErrors.year && (
          <div style={{ color: "red" }}>{editErrors.year}</div>
        )}
        {editErrors.month && (
          <div style={{ color: "red" }}>{editErrors.month}</div>
        )}
        {editErrors.day && <div style={{ color: "red" }}>{editErrors.day}</div>}

        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.account_id}
          processRowUpdate={handleEditCellChange}
        />
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
            error={!!errors.account_id}
            helperText={errors.account_id}
          />
          <TextField
            label="District ID"
            name="district_id"
            value={newRowData.district_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.district_id}
            helperText={errors.district_id}
          />
          <TextField
            label="Frequency"
            name="frequency"
            value={newRowData.frequency}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.frequency}
            helperText={errors.frequency}
          />
          <TextField
            label="Parsed Date"
            name="parseddate"
            value={newRowData.parseddate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.parseddate}
            helperText={errors.parseddate}
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
