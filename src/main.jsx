import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextWrapper } from "./context/auth.context.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ead99',
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextWrapper>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthContextWrapper>
    </Router>
  </React.StrictMode>
);
