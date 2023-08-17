import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// routes
import Router from "./routes";
// theme
import DarkThemeProvider from "./theme/darkTheme";
import LightThemeProvider from "./theme/lightTheme";
// components
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
import { ToastContainer } from "react-toastify";
// import { UserProvider } from './store/UserContext';
import { Provider } from "react-redux";
import store from "./store/store";
import "./assets/style/App.css";
import { systemLanguages } from "./store/userSlice";
import { useState } from "react";

// ----------------------------------------------------------------------

const ThemeProvider = ({ children, theme }) => {
  return theme === "light" ? (
    <LightThemeProvider>{children}</LightThemeProvider>
  ) : (
    <DarkThemeProvider>{children}</DarkThemeProvider>
  );
};

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ScrollToTop />
            <StyledChart />
            <Router setTheme={setTheme} theme={theme} />
            <ToastContainer position="top-right" autoClose={5000} />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
