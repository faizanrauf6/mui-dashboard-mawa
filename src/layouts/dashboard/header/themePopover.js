import { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import Iconify from "src/components/iconify/Iconify";

export default function ThemePopover({ setTheme, applicationTheme }) {
  // const theme = useTheme();
  // const [isLightMode, setIsLightMode] = useState(
  //   theme.palette.mode === "light"
  // );

  // const toggleTheme = () => {
  //   theme.palette.mode = isLightMode ? "dark" : "light";
  //   setIsLightMode(!isLightMode);
  //   console.log("Current theme: ", theme.palette.mode);
  // };
  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };
  return (
    <>
      <IconButton
        onClick={toggleTheme}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          // bgcolor: (theme) =>
          //   alpha(
          //     theme.palette.primary.main,
          //     theme.palette.action.focusOpacity
          //   ),
        }}
      >
        <Iconify
          icon={
            applicationTheme === "light"
              ? "iconamoon:mode-dark-light"
              : "material-symbols:light-mode-sharp"
          }
          sx={{ width: 28, m: 1 }}
        />
      </IconButton>
    </>
  );
}
