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

const Districts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    district_id: "",
    city: "",
    state_name: "",
    state_abbrev: "",
    region: "",
    division: "",
  });
  const [errors, setErrors] = useState({
    district_id: "",
    city: "",
    state_name: "",
    state_abbrev: "",
    region: "",
    division: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/get_completeddistrict")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    const newErrors = {
      district_id: "",
      city: "",
      state_name: "",
      state_abbrev: "",
      region: "",
      division: "",
    };

    if (!newRow.district_id) {
      newErrors.district_id = "District ID is required.";
    }

    if (!Number.isInteger(Number(newRow.district_id))) {
      newErrors.district_id = "District ID must be an integer";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return oldRow;
    }

    setErrors({});

    axios
      .put(
        `http://localhost:5000/update/completeddistrict/${newRow.district_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completeddistrict")
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

  const handleDeleteRow = (district_id) => {
    axios
      .delete(`http://localhost:5000/delete/completeddistrict/${district_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        axios
          .get("http://localhost:5000/api/data/get_completeddistrict")
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
      district_id: "",
      city: "",
      state_name: "",
      state_abbrev: "",
      region: "",
      division: "",
    });
  };

  const handleSaveNewRow = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/completeddistrict", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completeddistrict")
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
      district_id: "",
      city: "",
      state_name: "",
      state_abbrev: "",
      region: "",
      division: "",
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

    if (!newRowData.district_id.trim()) {
      newErrors.district_id = "District ID is required";
      valid = false;
    }

    if (!Number.isInteger(Number(newRowData.district_id))) {
      newErrors.district_id = "District ID must be an integer";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const columns = [
    {
      field: "district_id",
      headerName: "District ID",
      flex: 0.5,
      editable: false,
    },
    { field: "city", headerName: "City", flex: 1, editable: true },
    { field: "state_name", headerName: "State Name", flex: 1, editable: true },
    {
      field: "state_abbrev",
      headerName: "State Abbrevation",
      flex: 1,
      editable: true,
    },
    { field: "region", headerName: "Region", flex: 1, editable: true },
    { field: "division", headerName: "Division", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.district_id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="DISTRICTS TABLE" />
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
        {errors.district_id && (
          <div style={{ color: "red" }}>{errors.district_id}</div>
        )}
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.district_id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
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
            label="State Name"
            name="state_name"
            value={newRowData.state_name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.state_name}
            helperText={errors.state_name}
          />
          <TextField
            label="State Abbreviation"
            name="state_abbrev"
            value={newRowData.state_abbrev}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.state_abbrev}
            helperText={errors.state_abbrev}
          />
          <TextField
            label="Region"
            name="region"
            value={newRowData.region}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.region}
            helperText={errors.region}
          />
          <TextField
            label="Division"
            name="division"
            value={newRowData.division}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.division}
            helperText={errors.division}
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

export default Districts;
