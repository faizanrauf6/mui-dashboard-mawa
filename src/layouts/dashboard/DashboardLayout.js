import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";
import { useSelector, useDispatch } from "react-redux";
import request from "src/utils/request";
import { api } from "src/constants";
import { fetchMe, setUser } from "src/store/userSlice";
import BaseLoader from "src/components/base/BaseLoader";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({ setTheme, applicationTheme }) {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await fetchMe(api.auth.me)(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.getItem("token") && getCurrentUser();
    }
  }, [user]);

  return (
    // <Navigate replace to="/error-page" />
    localStorage.getItem("token") ? (
      loading ? (
        <BaseLoader />
      ) : (
        <StyledRoot>
          <Header
            setTheme={setTheme}
            applicationTheme={applicationTheme}
            onOpenNav={() => setOpen(true)}
          />

          <Nav openNav={open} onCloseNav={() => setOpen(false)} />

          <Main>
            <Outlet />
          </Main>
        </StyledRoot>
      )
    ) : (
      <Navigate replace to="/" />
    )
  );
}
