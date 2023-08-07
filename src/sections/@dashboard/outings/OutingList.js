import PropTypes from "prop-types";
// @mui
import { Grid } from "@mui/material";
import OutingCard from "./OutingCard";

// ----------------------------------------------------------------------

OutingList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function OutingList({ outings, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {outings.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <OutingCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
