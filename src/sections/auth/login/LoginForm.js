import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import request from "src/utils/request";
import { api } from "src/constants";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    username: "",
    password: "",
    fcmToken:
      "fLmZLv9FoUNMj5HQIcb4MA:APA91bFKnZtz4TXt5A3zilEn8cvyjTbBkmVi1gckSSeJxK9iBF6qriLU9FqcF5XDSd-6Aaf_TGPZDIsRC82HQcP12yd7jNLo7itBVKRSUqk-k6VKGFDtu55sGHj4kp3DxBozvqT7RxF2",
  });

  const handleSubmit = async () => {
    try {
      const response = await request.post(api.auth.login, user);
      toast.success(response?.data?.message || "Signin successful");
      localStorage.setItem('token',response?.data?.token || '');
      navigate("/dashboard", { replace: true });
    } finally {
      setUser({
        username: "",
        password: "",
        fcmToken:
          "fLmZLv9FoUNMj5HQIcb4MA:APA91bFKnZtz4TXt5A3zilEn8cvyjTbBkmVi1gckSSeJxK9iBF6qriLU9FqcF5XDSd-6Aaf_TGPZDIsRC82HQcP12yd7jNLo7itBVKRSUqk-k6VKGFDtu55sGHj4kp3DxBozvqT7RxF2",
      });
    }
    // navigate("/dashboard", { replace: true });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" label="Enter username" value={user.username}
          onChange={handleInputChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={handleInputChange}
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
      </Stack>

      <Stack
        direction="row"
        alignItems="end"
        justifyContent="end"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );
}
