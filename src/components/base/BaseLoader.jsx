import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function BaseLoader() {
  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      {/* <CircularProgress color="secondary" size="4rem" /> */}
      <img
        src="/assets/images/loader/mawa-loader.gif"
        alt="MAWA Logo"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </Stack>
  );
}
