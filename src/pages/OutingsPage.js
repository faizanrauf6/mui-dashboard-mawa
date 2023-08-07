import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import { Container, Stack, Typography } from "@mui/material";
// components
import { OutingList } from "../sections/@dashboard/outings";
// mock
import OUTINGS from "../_mock/products";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Outings | Mawa </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Outings
        </Typography>

        <OutingList outings={OUTINGS} />
      </Container>
    </>
  );
}
