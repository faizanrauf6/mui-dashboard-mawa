import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

// SETUP COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const PRIMARY = {
  lighter: "#D1E9FC",
  // light: "#76B0F1",
  light: "#C0FCF8",
  // main: "#2065D1",
  main: "#00e5df",
  // dark: "#103996",
  dark: "#519D99",
  // darker: "#061B64",
  darker: "#334B4A",
  contrastText: "#000",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const darkPalette = {
  mode: "dark",
  common: { black: "#000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[100],
    secondary: GREY[200],
    disabled: GREY[300],
  },
  background: {
    paper: GREY[800],
    default: GREY[900],
    neutral: GREY[700],
  },
  action: {
    active: GREY[300],
    hover: alpha(GREY[500], 0.24),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.48),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.24,
    disabledOpacity: 0.48,
  },
};

export default darkPalette;
