import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataComplaints } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Crms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "date_recevied",
      headerName: "Date Recevied",
      flex: 1,
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
    },
    {
      field: "sub_product",
      headerName: "Sub Product",
      flex: 1,
    },
    {
      field: "issue",
      headerName: "Issue",
      flex: 1,
    },
    {
      field: "sub_issue",
      headerName: "Sub Issue",
      flex: 1,
    },
    {
      field: "consumer_complaint_narrative",
      headerName: "Consumer Complaint Narrative",
      flex: 1,
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
    },
    {
      field: "consumer_consent_provided",
      headerName: "Consumer Consent Provided",
      flex: 1,
    },
    {
      field: "submitted_via",
      headerName: "Submitted Via",
      flex: 1,
    },
    {
      field: "date_sent_to_company",
      headerName: "Date Sent To Company",
      flex: 1,
    },
    {
      field: "company_response_to_consumer",
      headerName: "Company Response To Consumer",
      flex: 1,
    },
    {
      field: "timely_response",
      headerName: "Timely Response",
      flex: 1,
    },
    {
      field: "consumer_disputed",
      headerName: "Consumer Disputed",
      flex: 1,
    },
    {
      field: "complaint_id",
      headerName: "Complaint ID",
      flex: 1,
    },
    {
      field: "client_id",
      headerName: "Client ID",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="CRMs" subtitle="List of Crms for Future Reference" />
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
        <DataGrid
          rows={mockDataComplaints}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default Crms;
