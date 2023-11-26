import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataAccounts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Accounts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "account_id", headerName: "Account ID", flex: 0.5 },
    {
      field: "district_id",
      headerName: "District ID",
      flex: 1,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      flex: 1,
    },
    {
      field: "parseddate",
      headerName: "Parsed Date",
      flex: 1,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 1,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
    },
    {
      field: "day",
      headerName: "Day",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="ACCOUNTS"
        subtitle="List of Accounts for Future Reference"
      />
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
          rows={mockDataAccounts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.account_id}
        />
      </Box>
    </Box>
  );
};

export default Accounts;
