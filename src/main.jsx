import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthContextWrapper } from './context/auth.context.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { init } from '@rematch/core';
import * as models from './models';
import { Provider } from 'react-redux';

const store = init({ models });

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ead99',
    },
  },
  typography: {
    fontFamily: '"Lato", Helvetica, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <AuthContextWrapper>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthContextWrapper>
    </Provider>
  </Router>
);
