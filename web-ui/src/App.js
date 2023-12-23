import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Districts from "./scenes/districts";
import Transactions from "./scenes/transactions";
import Crms from "./scenes/crms";
import Loans from "./scenes/loans";
import Accounts from "./scenes/accounts";
import Clients from "./scenes/clients";
import Dispositions from "./scenes/dispositions";
import Cards from "./scenes/cards";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Districts />} />
              <Route path="/districts" element={<Districts />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/crms" element={<Crms />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/dispositions" element={<Dispositions />} />
              <Route path="/cards" element={<Cards />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
