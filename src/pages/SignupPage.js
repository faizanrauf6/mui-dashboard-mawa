import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { LoginForm, SignupForm } from "../sections/auth/login";
import { Link as RouterLink } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const RouterLinkCustom = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Signup | Mawa </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Create your account in Mawa Admin Panel
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {""}
              <Link variant="subtitle2" underline="none">
                <RouterLinkCustom to={"/"}>Singin</RouterLinkCustom>
              </Link>
            </Typography>

            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
