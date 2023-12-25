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

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    client_id: "",
    sex: "",
    fulldate: "",
    day: "",
    month: "",
    year: "",
    age: "",
    social: "",
    first: "",
    middle: "",
    last: "",
    phone: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zipcode: "",
    district_id: "",
  });
  const [errors, setErrors] = useState({
    client_id: "",
    sex: "",
    fulldate: "",
    day: "",
    month: "",
    year: "",
    age: "",
    social: "",
    first: "",
    middle: "",
    last: "",
    phone: "",
    email: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zipcode: "",
    district_id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/get_completedclient")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    const newErrors = {
      client_id: "",
      sex: "",
      fulldate: "",
      day: "",
      month: "",
      year: "",
      age: "",
      social: "",
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      district_id: "",
    };

    if (!newRow.client_id) {
      newErrors.client_id = "Client ID is required.";
    }

    if (isNaN(newRow.day)) {
      newErrors.day = "Day must be a valid number.";
    }

    if (isNaN(newRow.month)) {
      newErrors.month = "Month must be a valid number.";
    }

    if (isNaN(newRow.year)) {
      newErrors.year = "Year must be a valid number.";
    }

    if (isNaN(newRow.age)) {
      newErrors.age = "Age must be a valid number.";
    }

    if (isNaN(newRow.zipcode)) {
      newErrors.zipcode = "Zipcode must be a valid number.";
    }

    if (isNaN(newRow.district_id)) {
      newErrors.district_id = "District ID must be a valid number.";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return oldRow;
    }

    setErrors({});

    axios
      .put(
        `http://localhost:5000/update/completedclient/${newRow.client_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedclient")
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

  const handleDeleteRow = (client_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedclient/${client_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        axios
          .get("http://localhost:5000/api/data/get_completedclient")
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
      client_id: "",
      sex: "",
      fulldate: "",
      day: "",
      month: "",
      year: "",
      age: "",
      social: "",
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      district_id: "",
    });
  };

  const handleSaveNewRow = () => {
    const newErrors = {
      client_id: "",
      sex: "",
      fulldate: "",
      day: "",
      month: "",
      year: "",
      age: "",
      social: "",
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      district_id: "",
    };

    if (!newRowData.client_id) {
      newErrors.client_id = "Client ID is required.";
    }

    if (isNaN(newRowData.day)) {
      newErrors.day = "Day must be a valid number.";
    }

    if (isNaN(newRowData.month)) {
      newErrors.month = "Month must be a valid number.";
    }

    if (isNaN(newRowData.year)) {
      newErrors.year = "Year must be a valid number.";
    }

    if (isNaN(newRowData.age)) {
      newErrors.age = "Age must be a valid number.";
    }

    if (isNaN(newRowData.zipcode)) {
      newErrors.zipcode = "Zipcode must be a valid number.";
    }

    if (isNaN(newRowData.district_id)) {
      newErrors.district_id = "District ID must be a valid number.";
    }

    if (
      Object.values(newErrors).some((error) => error !== "") ||
      Object.values(newErrors).some((error) => error !== "")
    ) {
      setErrors(newErrors);
      return;
    }

    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/completedclient", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedclient")
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
      client_id: "",
      sex: "",
      fulldate: "",
      day: "",
      month: "",
      year: "",
      age: "",
      social: "",
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      district_id: "",
    });
    setErrors({
      client_id: "",
      sex: "",
      fulldate: "",
      day: "",
      month: "",
      year: "",
      age: "",
      social: "",
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      zipcode: "",
      district_id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    { field: "client_id", headerName: "Client ID", flex: 0.5, editable: false },
    { field: "sex", headerName: "Sex", flex: 1, editable: true },
    { field: "fulldate", headerName: "Full Date", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
    { field: "day", headerName: "Day", flex: 1, editable: true },
    { field: "year", headerName: "Year", flex: 1, editable: true },
    { field: "age", headerName: "Age", flex: 1, editable: true },
    { field: "social", headerName: "Social", flex: 1, editable: true },
    { field: "first", headerName: "First", flex: 1, editable: true },
    { field: "middle", headerName: "Middle", flex: 1, editable: true },
    { field: "last", headerName: "Last", flex: 1, editable: true },
    { field: "phone", headerName: "Phone", flex: 1, editable: true },
    { field: "email", headerName: "Email", flex: 1, editable: true },
    { field: "address_1", headerName: "Address 1", flex: 1, editable: true },
    { field: "address_2", headerName: "Address 2", flex: 1, editable: true },
    { field: "city", headerName: "City", flex: 1, editable: true },
    { field: "state", headerName: "State", flex: 1, editable: true },
    { field: "zipcode", headerName: "Zipcode", flex: 1, editable: true },
    {
      field: "district_id",
      headerName: "District ID",
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
          onClick={() => handleDeleteRow(params.row.client_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTS TABLE" />
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
        {errors.client_id && (
          <div style={{ color: "red" }}>{errors.client_id}</div>
        )}
        {errors.day && <div style={{ color: "red" }}>{errors.day}</div>}
        {errors.month && <div style={{ color: "red" }}>{errors.month}</div>}
        {errors.year && <div style={{ color: "red" }}>{errors.year}</div>}
        {errors.age && <div style={{ color: "red" }}>{errors.age}</div>}
        {errors.zipcode && <div style={{ color: "red" }}>{errors.zipcode}</div>}
        {errors.district_id && (
          <div style={{ color: "red" }}>{errors.district_id}</div>
        )}
        <Button onClick={handleAddRow} variant="outlined" color="secondary">
          Add Row
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.client_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Client ID"
            name="client_id"
            value={newRowData.client_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.client_id}
            helperText={errors.client_id}
          />
          <TextField
            label="Sex"
            name="sex"
            value={newRowData.sex}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.sex}
            helperText={errors.sex}
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
            label="Age"
            name="age"
            value={newRowData.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            label="Social"
            name="social"
            value={newRowData.social}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.social}
            helperText={errors.social}
          />
          <TextField
            label="First"
            name="first"
            value={newRowData.first}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.first}
            helperText={errors.first}
          />
          <TextField
            label="Middle"
            name="middle"
            value={newRowData.middle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.middle}
            helperText={errors.middle}
          />
          <TextField
            label="Last"
            name="last"
            value={newRowData.last}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.last}
            helperText={errors.last}
          />
          <TextField
            label="Phone"
            name="phone"
            value={newRowData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Email"
            name="email"
            value={newRowData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Address 1"
            name="address_1"
            value={newRowData.address_1}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.address_1}
            helperText={errors.address_1}
          />
          <TextField
            label="Address 2"
            name="address_2"
            value={newRowData.address_2}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.address_2}
            helperText={errors.address_2}
          />
          <TextField
            label="City"
            name="city"
            value={newRowData.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            label="State"
            name="state"
            value={newRowData.state}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.state}
            helperText={errors.state}
          />
          <TextField
            label="Zipcode"
            name="zipcode"
            value={newRowData.zipcode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.zipcode}
            helperText={errors.zipcode}
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

export default Clients;
