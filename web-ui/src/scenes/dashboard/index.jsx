import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Home Page" subtitle="Welcome to the home page!" />
      </Box>
    </Box>
  );
};

export default Dashboard;
