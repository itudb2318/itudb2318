import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Cards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make a request to the Flask backend
    axios
      .get("http://localhost:5000/api/data/get_completedcard")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "card_id", headerName: "Card ID", flex: 0.5 },
    {
      field: "disp_id",
      headerName: "Disposition ID",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
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
      field: "fulldate",
      headerName: "Full Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="CARDS" subtitle="List of Cards for Future Reference" />
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.card_id}
        />
      </Box>
    </Box>
  );
};

export default Cards;
