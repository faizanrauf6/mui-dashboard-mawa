import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Link } from "@mui/material";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 109 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3359_719)">
          <path
            d="M51.5 67.332H42.8V76.6921H51.5V67.332Z"
            fill="url(#paint0_linear_3359_719)"
          />
          <path
            d="M65.2001 67.332H56.5001V76.7928H65.2001V67.332Z"
            fill="url(#paint1_linear_3359_719)"
          />
          <path
            d="M51.5001 80.7188H42.7001V89.9782H51.5001V80.7188Z"
            fill="url(#paint2_linear_3359_719)"
          />
          <path
            d="M65.2001 80.6172H56.5001V89.9773H65.2001V80.6172Z"
            fill="url(#paint3_linear_3359_719)"
          />
          <path
            d="M108.4 87.3589C106.4 84.0376 104.1 80.8169 102.3 77.3949C99.3 71.4568 97 65.2167 99 58.4734C100.2 54.5482 102.5 50.9249 104 46.9997C105.7 42.7726 107.3 38.4448 108.6 34.117C109.1 32.406 108.8 30.2924 106.8 29.4873C104.9 28.7827 103.3 29.8898 102.1 31.2989C101.7 31.8021 101.3 32.3054 101 32.8086C98.7 36.7338 96.4 40.7597 94.2 44.7855C90.2 52.2333 82.2 53.9443 75.6 48.5094C73.6 46.8991 71.7 45.2887 69.9 43.5777C62.8 36.9351 55.6 30.1918 50.4 21.6368C49.2 19.7246 48.5 17.5103 48 15.2961C47.6 13.3838 48.6 11.6729 50.6 11.069C52.6 10.3645 54.4 10.8677 55.6 12.5787C56.2 13.4845 56.5 14.491 57.1 15.7994C58.5 13.1825 58.7 10.6664 57.3 8.04959C55.3 4.32567 50.2 2.0108 46 2.81598C41.6 3.72179 38.3 7.44571 37.8 12.1761C37.4 16.4032 38.3 20.3284 40 24.153C43.3 31.2989 48.4 37.1364 53.4 42.9739C60.3 51.2269 67.8 59.0773 75.1 67.0284C78.7 70.9536 80.4 75.4826 80.1 80.7162C79.9 83.2324 78.9 85.7486 78.1 88.2647C76.6 93.0957 74.8 97.8261 73.4 102.657C72.6 105.274 73.4 107.589 75.2 108.495C77 109.501 79.6 108.897 81.4 106.884C82.7 105.375 83.7 103.462 84.9 101.852C87.3 98.6313 89.7 95.4106 92.3 92.3912C93.1 91.4854 94.7 91.2841 96.1 90.9822C99.1 90.3783 101.5 91.888 104.1 93.0957C105.1 93.599 107.1 93.6996 107.7 92.9951C108.6 92.0893 108.8 90.3783 109.1 88.9693C109.1 88.5667 108.7 87.8621 108.4 87.3589Z"
            fill="url(#paint4_linear_3359_719)"
          />
          <path
            d="M83 42.4699C88.1 42.4699 92.3 38.3434 92.4 33.2104C92.4 28.2787 88.2 23.9509 83.2 23.9509C78.3 23.8503 74 28.1781 73.9 33.1098C73.9 38.0414 78.1 42.4699 83 42.4699Z"
            fill="url(#paint5_linear_3359_719)"
          />
          <path
            d="M50.3001 0.30107C59.9001 -1.91315 72.2001 8.25213 67.3001 20.3297C65.3001 25.2614 62.5001 30.0924 59.2001 34.3195C51.1001 45.0887 42.2001 55.1533 34.0001 65.8219C27.7001 73.9742 28.0001 82.7304 34.0001 90.9834C35.6001 93.1977 36.6001 95.5125 36.4001 98.23C36.3001 100.645 35.0001 101.753 32.7001 101.048C31.2001 100.545 29.7001 99.7397 28.3001 98.9345C27.2001 98.3306 26.3001 97.4248 25.2001 96.8209C21.8001 94.6067 19.5001 94.808 16.6001 97.7267C15.1001 99.1358 13.8001 100.746 12.4001 102.256C11.8001 102.86 11.1001 103.464 10.4001 103.866C7.50006 105.577 5.00006 104.369 5.20006 101.048C5.30006 98.6326 6.20006 96.1164 6.90006 93.8015C7.40006 91.9899 8.10006 90.2789 8.70006 88.4673C10.4001 83.3343 8.20006 79.1072 5.40006 75.0813C3.90006 72.8671 2.30006 70.6529 1.30006 68.2374C0.800062 66.8283 1.00006 64.6141 1.80006 63.4063C2.90006 61.6953 4.90006 62.6012 6.50006 63.205C8.30006 63.9096 10.1001 64.8154 11.9001 65.6206C15.5001 67.3315 18.6001 66.7277 21.4001 63.9096C25.4001 59.7831 29.3001 55.5559 33.2001 51.3288C41.6001 42.3712 49.0001 32.5079 56.0001 22.4433C57.7001 20.0278 59.0001 17.2097 59.9001 14.3916C62.0001 8.25213 58.6001 2.41464 52.3001 0.703655C51.5001 0.603009 50.9001 0.401716 50.3001 0.30107Z"
            fill="url(#paint6_linear_3359_719)"
          />
          <path
            d="M12.3 58.4735C7.40002 58.4735 3.40002 54.347 3.40002 49.4153C3.50002 44.5843 7.50002 40.6591 12.4 40.7597C17.3 40.7597 21.2 44.7856 21.1 49.7172C21.1 54.5483 17.2 58.4735 12.3 58.4735Z"
            fill="url(#paint7_linear_3359_719)"
          />
          <path
            d="M9.10004 35.0232C9.10004 33.9161 9.00004 33.0103 9.10004 32.1045C9.20004 30.2929 10.2 29.7896 11.7 30.7961C12.7 31.5006 13.5 32.5071 14.3 33.4129C14.7 33.9161 14.9 34.4194 15.7 34.52C16.7 34.6207 17 35.5265 17.4 36.4323C11.7 38.4452 6.00004 40.3575 0.300039 42.2698C-0.199961 41.2633 -0.199961 40.3575 0.500039 39.5523C0.700039 39.2504 0.800039 38.8478 0.800039 38.5459C0.700039 36.231 1.30004 34.1174 2.90004 32.5071C4.50004 30.7961 6.30004 30.8967 7.70004 32.809C8.20004 33.4129 8.60004 34.1174 9.10004 35.0232Z"
            fill="url(#paint8_linear_3359_719)"
          />
          <path
            d="M86.0001 18.7209C86.4001 17.7145 86.7001 16.8087 87.1001 16.0035C87.9001 14.3931 89.0001 14.2925 90.0001 15.8022C90.6001 16.8087 91.0001 18.1171 91.4001 19.2242C91.6001 19.828 91.6001 20.4319 92.3001 20.8345C93.2001 21.3377 93.1001 22.2436 93.1001 23.25C87.1001 22.7468 81.2001 22.2436 75.2001 21.841C75.1001 20.7339 75.5001 19.9287 76.5001 19.4255C76.8001 19.2242 77.1001 18.9222 77.2001 18.6203C78.0001 16.5067 79.3001 14.7957 81.5001 13.7893C83.6001 12.8835 85.3001 13.6886 85.8001 16.0035C85.8001 16.8087 85.9001 17.7145 86.0001 18.7209Z"
            fill="url(#paint9_linear_3359_719)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_3359_719"
            x1="38.4096"
            y1="81.4274"
            x2="42.6711"
            y2="68.9876"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_3359_719"
            x1="52.1097"
            y1="81.579"
            x2="56.4534"
            y2="69.0339"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_3359_719"
            x1="38.2591"
            y1="94.6626"
            x2="42.401"
            y2="82.3"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_3359_719"
            x1="52.1097"
            y1="94.7126"
            x2="56.3712"
            y2="82.2727"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_3359_719"
            x1="1.67664"
            y1="162.758"
            x2="62.7954"
            y2="33.8588"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_3359_719"
            x1="64.564"
            y1="51.8395"
            x2="72.5223"
            y2="26.8732"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_3359_719"
            x1="-32.9788"
            y1="157.58"
            x2="28.7631"
            y2="32.7126"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint7_linear_3359_719"
            x1="-5.53325"
            y1="67.4358"
            x2="2.0771"
            y2="43.5533"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint8_linear_3359_719"
            x1="-8.86085"
            y1="48.3328"
            x2="-5.14715"
            y2="31.3477"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <linearGradient
            id="paint9_linear_3359_719"
            x1="66.1427"
            y1="28.2201"
            x2="68.6143"
            y2="14.0626"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.0135063" stop-color="white" />
            <stop offset="1" stop-color="#01D1D6" />
          </linearGradient>
          <clipPath id="clip0_3359_719">
            <rect width="109" height="109" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/dashboard" component={RouterLink} sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
