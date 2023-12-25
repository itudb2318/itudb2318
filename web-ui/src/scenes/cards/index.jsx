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

  const [errors, setErrors] = useState({
    card_id: "",
    disp_id: "",
    type: "",
    year: "",
    month: "",
    day: "",
    fulldate: "",
  });

  useEffect(() => {
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
    const newErrors = {
      card_id: "",
      disp_id: "",
      type: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
    };

    if (!newRow.card_id) {
      newErrors.card_id = "Card ID is required.";
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
      return oldRow;
    }

    setErrors({});

    axios
      .put(
        `http://localhost:5000/update/completedcard/${newRow.card_id}`,
        newRow
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedcard")
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

  const handleDeleteRow = (card_id) => {
    axios
      .delete(`http://localhost:5000/delete/completedcard/${card_id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        axios
          .get("http://localhost:5000/api/data/get_completedcard")
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
      card_id: "",
      disp_id: "",
      type: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
    });
  };

  const handleSaveNewRow = () => {
    const newErrors = {
      card_id: "",
      disp_id: "",
      type: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
    };

    if (!newRowData.card_id) {
      newErrors.card_id = "Card ID is required.";
    }

    if (isNaN(newRowData.year)) {
      newErrors.year = "Year must be a valid number.";
    }

    if (isNaN(newRowData.month)) {
      newErrors.month = "Month must be a valid number.";
    }

    if (isNaN(newRowData.day)) {
      newErrors.day = "Day must be a valid number.";
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
      .post("http://localhost:5000/insert/completedcard", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_completedcard")
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
      card_id: "",
      disp_id: "",
      type: "",
      year: "",
      month: "",
      day: "",
      fulldate: "",
    });
    setErrors({
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
    { field: "card_id", headerName: "Card ID", flex: 0.5, editable: false },
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
        {errors.card_id && <div style={{ color: "red" }}>{errors.card_id}</div>}
        {errors.year && <div style={{ color: "red" }}>{errors.year}</div>}
        {errors.month && <div style={{ color: "red" }}>{errors.month}</div>}
        {errors.day && <div style={{ color: "red" }}>{errors.day}</div>}
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
            error={!!errors.card_id}
            helperText={errors.card_id}
          />
          <TextField
            label="Disposition ID"
            name="disp_id"
            value={newRowData.disp_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.disp_id}
            helperText={errors.disp_id}
          />
          <TextField
            label="Type"
            name="type"
            value={newRowData.type}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.type}
            helperText={errors.type}
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
