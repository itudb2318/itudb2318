import React, { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100], marginBottom: "5px" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: `transparent !important`,
        },
        "& .pro-inner-item": {
          padding: `5px 35px 5px 20px !important`,
        },
        "& .pro-inner-item:hover": {
          color: `#868dfb !important`,
        },
        "& .pro-menu-item.active": {
          color: `6870fa !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape={"square"}>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="flex-start" marginLeft={3.2}>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                  <Typography
                    variant="h6"
                    color={colors.grey[100]}
                    sx={{ marginLeft: 2 }}
                  >
                    Menu
                  </Typography>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            display="flex"
            flexDirection="column"
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            <MenuItem>
              <IconButton
                style={{ color: colors.grey[100] }}
                onClick={colorMode.toggleColorMode}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  sx={{ marginLeft: 2 }}
                >
                  Switch Mode
                </Typography>
              </IconButton>
            </MenuItem>
            <Typography
              variant="h6"
              sx={{ marginLeft: 3 }}
              color={colors.grey[500]}
            >
              Tables
            </Typography>
            <Item
              title="Completed Districts"
              to="/districts"
              icon={<LocationCityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Transactions"
              to="/transactions"
              icon={<PaidOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="CRM Events"
              to="/crms"
              icon={<SupportAgentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Loans"
              to="/loans"
              icon={<CreditScoreOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Accounts"
              to="/accounts"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Clients"
              to="/clients"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Dispositions"
              to="/dispositions"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Completed Cards"
              to="/cards"
              icon={<CreditCardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
