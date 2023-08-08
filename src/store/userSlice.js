// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { api } from "src/constants";
import request from "src/utils/request";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export const login = (credentials) => (dispatch) => new Promise(async (resolve, reject) => {
  try {
    dispatch(setLoading(true));
    const response = await request.post(api.auth.login, credentials); // Replace with your login API call
    localStorage.setItem("token", response?.data?.token || "");
    dispatch(setUser(response?.data?.data)); // Assuming the API returns user data
    resolve(response);
  } catch (error) {
    // Handle error if needed
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
});

export const fetchMe = () => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading(true));
      const response = await request.get(api.auth.me); // Replace with your me API call
      localStorage.setItem("token", response?.data?.token || "");
      dispatch(setUser(response?.data?.data)); // Assuming the API returns user data
      resolve(response);
    } catch (error) {
      // Handle error if needed
      reject(error);
    } finally {
      dispatch(setLoading(false));
    }
  });
};

export const logout = (userId) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading(true));
      const response = await request.post(api.auth.logout, {
        userId: userId,
      });
      localStorage.removeItem("token"); // Clear token
      dispatch(clearUser()); // Assuming the API returns user data
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      dispatch(setLoading(false));
    }
  });
};
export default userSlice.reducer;
