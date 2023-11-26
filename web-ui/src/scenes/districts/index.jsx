import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDistricts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Districts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "district_id", headerName: "District ID", flex: 0.5 },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state_name",
      headerName: "State Name",
      flex: 1,
    },
    {
      field: "state_abbrev",
      headerName: "State Abbrevation",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "division",
      headerName: "Division",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="DISTRICTS"
        subtitle="List of Districts for Future Reference"
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
          rows={mockDataDistricts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.district_id}
        />
      </Box>
    </Box>
  );
};

export default Districts;
