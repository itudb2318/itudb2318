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

const Crms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    date_received: "",
    product: "",
    sub_product: "",
    issue: "",
    sub_issue: "",
    consumer_complaint_narrative: "",
    tags: "",
    consumer_consent_provided: "",
    submitted_via: "",
    date_sent_to_company: "",
    company_response_to_consumer: "",
    timely_response: "",
    consumer_disputed: "",
    complaint_id: "",
    client_id: "",
  });

  const [errors, setErrors] = useState({
    date_received: "",
    product: "",
    sub_product: "",
    issue: "",
    sub_issue: "",
    consumer_complaint_narrative: "",
    tags: "",
    consumer_consent_provided: "",
    submitted_via: "",
    date_sent_to_company: "",
    company_response_to_consumer: "",
    timely_response: "",
    consumer_disputed: "",
    complaint_id: "",
    client_id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data/get_crm_events")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditCellChange = (newRow, oldRow) => {
    axios
      .put(`http://localhost:5000/update/crm_events/${newRow.id}`, newRow)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_crm_events")
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

  const handleDeleteRow = (id) => {
    axios
      .delete(`http://localhost:5000/delete/crm_events/${id}`)
      .then((response) => {
        console.log("Row deleted successfully:", response.data);

        axios
          .get("http://localhost:5000/api/data/get_crm_events")
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
      date_received: "",
      product: "",
      sub_product: "",
      issue: "",
      sub_issue: "",
      consumer_complaint_narrative: "",
      tags: "",
      consumer_consent_provided: "",
      submitted_via: "",
      date_sent_to_company: "",
      company_response_to_consumer: "",
      timely_response: "",
      consumer_disputed: "",
      complaint_id: "",
      client_id: "",
    });
  };

  const handleSaveNewRow = () => {
    const newErrors = {
      date_received: "",
      product: "",
      sub_product: "",
      issue: "",
      sub_issue: "",
      consumer_complaint_narrative: "",
      tags: "",
      consumer_consent_provided: "",
      submitted_via: "",
      date_sent_to_company: "",
      company_response_to_consumer: "",
      timely_response: "",
      consumer_disputed: "",
      complaint_id: "",
      client_id: "",
    };

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setDialogOpen(false);
    axios
      .post("http://localhost:5000/insert/crm_events", newRowData)
      .then((response) => {
        console.log("New row added successfully:", response.data);
        axios
          .get("http://localhost:5000/api/data/get_crm_events")
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
      date_received: "",
      product: "",
      sub_product: "",
      issue: "",
      sub_issue: "",
      consumer_complaint_narrative: "",
      tags: "",
      consumer_consent_provided: "",
      submitted_via: "",
      date_sent_to_company: "",
      company_response_to_consumer: "",
      timely_response: "",
      consumer_disputed: "",
      complaint_id: "",
      client_id: "",
    });
    setErrors({
      date_received: "",
      product: "",
      sub_product: "",
      issue: "",
      sub_issue: "",
      consumer_complaint_narrative: "",
      tags: "",
      consumer_consent_provided: "",
      submitted_via: "",
      date_sent_to_company: "",
      company_response_to_consumer: "",
      timely_response: "",
      consumer_disputed: "",
      complaint_id: "",
      client_id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, editable: false },
    {
      field: "date_received",
      headerName: "Date Recevied",
      flex: 1,
      editable: true,
    },
    { field: "product", headerName: "Product", flex: 1, editable: true },
    {
      field: "sub_product",
      headerName: "Sub Product",
      flex: 1,
      editable: true,
    },
    { field: "issue", headerName: "Issue", flex: 1, editable: true },
    { field: "sub_issue", headerName: "Sub Issue", flex: 1, editable: true },
    {
      field: "consumer_complaint_narrative",
      headerName: "Consumer Complaint Narrative",
      flex: 1,
      editable: true,
    },
    { field: "tags", headerName: "Tags", flex: 1, editable: true },
    {
      field: "consumer_consent_provided",
      headerName: "Consumer Consent Provided",
      flex: 1,
      editable: true,
    },
    {
      field: "submitted_via",
      headerName: "Submitted Via",
      flex: 1,
      editable: true,
    },
    {
      field: "date_sent_to_company",
      headerName: "Date Sent To Company",
      flex: 1,
      editable: true,
    },
    {
      field: "company_response_to_consumer",
      headerName: "Company Response To Consumer",
      flex: 1,
      editable: true,
    },
    {
      field: "timely_response",
      headerName: "Timely Response",
      flex: 1,
      editable: true,
    },
    {
      field: "consumer_disputed",
      headerName: "Consumer Disputed",
      flex: 1,
      editable: true,
    },
    {
      field: "complaint_id",
      headerName: "Complaint ID",
      flex: 1,
      editable: true,
    },
    { field: "client_id", headerName: "Client ID", flex: 1, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CRM EVENTS TABLE" />
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
            borderBottom: "none",
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
          getRowId={(row) => row.id}
          processRowUpdate={handleEditCellChange}
        />
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Date Received"
            name="date_received"
            value={newRowData.date_received}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.date_received}
            helperText={errors.date_received}
          />
          <TextField
            label="Product"
            name="product"
            value={newRowData.product}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.product}
            helperText={errors.product}
          />
          <TextField
            label="Sub Product"
            name="sub_product"
            value={newRowData.sub_product}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.sub_product}
            helperText={errors.sub_product}
          />
          <TextField
            label="Issue"
            name="issue"
            value={newRowData.issue}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.issue}
            helperText={errors.issue}
          />
          <TextField
            label="Sub Issue"
            name="sub_issue"
            value={newRowData.sub_issue}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.sub_issue}
            helperText={errors.sub_issue}
          />
          <TextField
            label="Consumer Complaint Narrative"
            name="consumer_complaint_narrative"
            value={newRowData.consumer_complaint_narrative}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.consumer_complaint_narrative}
            helperText={errors.consumer_complaint_narrative}
          />
          <TextField
            label="Tags"
            name="tags"
            value={newRowData.tags}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.tags}
            helperText={errors.tags}
          />
          <TextField
            label="Consumer Consent Provided"
            name="consumer_consent_provided"
            value={newRowData.consumer_consent_provided}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.consumer_consent_provided}
            helperText={errors.consumer_consent_provided}
          />
          <TextField
            label="Submitted Via"
            name="submitted_via"
            value={newRowData.submitted_via}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.submitted_via}
            helperText={errors.submitted_via}
          />
          <TextField
            label="Date Sent To Company"
            name="date_sent_to_company"
            value={newRowData.date_sent_to_company}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.date_sent_to_company}
            helperText={errors.date_sent_to_company}
          />
          <TextField
            label="Company Response To Consumer"
            name="company_response_to_consumer"
            value={newRowData.company_response_to_consumer}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.company_response_to_consumer}
            helperText={errors.company_response_to_consumer}
          />
          <TextField
            label="Timely Response"
            name="timely_response"
            value={newRowData.timely_response}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.timely_response}
            helperText={errors.timely_response}
          />
          <TextField
            label="Consumer Disputed"
            name="consumer_disputed"
            value={newRowData.consumer_disputed}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.consumer_disputed}
            helperText={errors.consumer_disputed}
          />
          <TextField
            label="Complaint ID"
            name="complaint_id"
            value={newRowData.complaint_id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.complaint_id}
            helperText={errors.complaint_id}
          />
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

export default Crms;
