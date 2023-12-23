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
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    district_id: "",
  });

  useEffect(() => {
    // Make a request to the Flask backend
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
    axios
      .put(
        `http://localhost:5000/update/completedclient/${newRow.client_id}`,
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

  const handleDeleteRow = (client_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedclient/${client_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        const updatedData = data.filter((row) => row.client_id !== client_id);
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
      .post("http://localhost:5000/insert/completedclient", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        setData((prevData) => [...prevData, newRowData]);
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
      address1: "",
      address2: "",
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
    { field: "client_id", headerName: "Client ID", flex: 0.5, editable: true },
    { field: "sex", headerName: "Sex", flex: 1, editable: true },
    { field: "fulldate", headerName: "Full Date", flex: 1, editable: true },
    { field: "month", headerName: "Month", flex: 1, editable: true },
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
          />
          <TextField
            label="Sex"
            name="sex"
            value={newRowData.sex}
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
            label="Day"
            name="day"
            value={newRowData.day}
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
            label="Year"
            name="year"
            value={newRowData.year}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            name="age"
            value={newRowData.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Social"
            name="social"
            value={newRowData.social}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="First"
            name="first"
            value={newRowData.first}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Middle"
            name="middle"
            value={newRowData.middle}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last"
            name="last"
            value={newRowData.last}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={newRowData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newRowData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address 1"
            name="address1"
            value={newRowData.address1}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address 2"
            name="address2"
            value={newRowData.address2}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={newRowData.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            name="state"
            value={newRowData.state}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Zipcode"
            name="zipcode"
            value={newRowData.zipcode}
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
