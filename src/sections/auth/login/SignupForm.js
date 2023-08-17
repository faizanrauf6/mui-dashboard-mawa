import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Skeleton,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { toast } from "react-toastify";
import request from "src/utils/request";
import { api } from "src/constants";
import { object, string } from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
  login,
  systemLanguages,
} from "src/store/userSlice";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { languages, loading } = useSelector((state) => state.user);
  let userSchema = object({
    username: string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters"),
    fullName: string().required("Full Name is required"),
    password: string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    fcmToken: string().required("FCM Token is required"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    fullName: "",
    password: "",
    userType: "Admin",
    language: "en-US",
    fcmToken:
      "fLmZLv9FoUNMj5HQIcb4MA:APA91bFKnZtz4TXt5A3zilEn8cvyjTbBkmVi1gckSSeJxK9iBF6qriLU9FqcF5XDSd-6Aaf_TGPZDIsRC82HQcP12yd7jNLo7itBVKRSUqk-k6VKGFDtu55sGHj4kp3DxBozvqT7RxF2",
  });
  // const [languages, setLanguages] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSchema.validate(userDetails, { abortEarly: false });
      signUpUser();
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const signUpUser = async () => {
    try {
      const response = await request.post(api.auth.signup, userDetails);
      toast.success("Signup Successful" || response?.data?.message);
      navigate("/", { replace: true });
    } finally {
      setUserDetails({
        username: "",
        fullName: "",
        password: "",
        userType: "Admin",
        language: "en-US",
        fcmToken:
          "fLmZLv9FoUNMj5HQIcb4MA:APA91bFKnZtz4TXt5A3zilEn8cvyjTbBkmVi1gckSSeJxK9iBF6qriLU9FqcF5XDSd-6Aaf_TGPZDIsRC82HQcP12yd7jNLo7itBVKRSUqk-k6VKGFDtu55sGHj4kp3DxBozvqT7RxF2",
      });
      setErrors({});
    }
    // navigate("/dashboard", { replace: true });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLanguageChange = (e) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      language: e.target.value,
    }));
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Enter Username"
          required
          value={userDetails.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
          autocomplete="off"
        />
        {/* {errors.username && (
          <FormHelperText error>{errors.username}</FormHelperText>
        )} */}
        <TextField
          name="fullName"
          label="Enter Full Name"
          required
          value={userDetails.fullName}
          onChange={handleInputChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        {/* {errors.fullName && (
          <FormHelperText error>{errors.fullName}</FormHelperText>
        )} */}
        <TextField
          name="password"
          label="Enter Password"
          required
          type={showPassword ? "text" : "password"}
          value={userDetails.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* {errors.password && (
          <FormHelperText error>{errors.password}</FormHelperText>
        )} */}
        <Typography variant="subtitle2">Select Language</Typography>
        {loading ? (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        ) : (
          <RadioGroup
            name="language"
            value={userDetails.language}
            onChange={handleLanguageChange}
            sx={{ display: "flex", flexDirection: "row" }}
            style={{ marginTop: "15px" }}
          >
            {languages
              .filter(
                (lang) =>
                  lang.languageCode === "en-US" || lang.languageCode === "ar-MR"
              )
              .map((lang) => (
                <FormControlLabel
                  key={lang.languageCode}
                  value={lang.languageCode}
                  control={<Radio />}
                  label={lang.name}
                />
              ))}
          </RadioGroup>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="end"
        justifyContent="end"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
      >
        Signup
      </LoadingButton>
    </>
  );
}
