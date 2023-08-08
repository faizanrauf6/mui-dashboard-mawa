import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { ToastContainer } from 'react-toastify';
// import { UserProvider } from './store/UserContext';
import { Provider } from 'react-redux';
import store from './store/store';
import './assets/style/App.css'
// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
            <ToastContainer position='top-right' autoClose={5000} />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
