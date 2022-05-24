import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const axios = require("axios");
const API_URL = "http://notflixtv.herokuapp.com/api/v1/";

export const auth = createAsyncThunk(
    "user/auth",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}users/login`, values);
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                return response;
            } else {
                console.log(response);
                rejectWithValue(response);
            }
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}users`, values);
            if (response.status === 201) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                return response;
            } else {
                console.log(response);
                rejectWithValue(response);
            }
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const logOut = createAsyncThunk(
    "user/logOut",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}users`, values);
            if (response.status === 201) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                return response;
            } else {
                console.log(response);
                rejectWithValue(response);
            }
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    auth: {
        data: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: false,
        errorMessage: null,
        success: JSON.parse(localStorage.getItem("user")) ? true : false,
    },
    register: {
        data: null,
        loading: false,
        error: false,
        errorMessage: null,
        success: false,
    },
};

export const userSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: {
        // AUTH
        [auth.pending]: (state) => {
            state.auth.loading = true;
        },
        [auth.fulfilled]: (state, action) => {
            state.auth.success = true;
            state.auth.data = action.payload.data.data;
            state.auth.error = false;
            state.auth.errorMessage = null;
            state.auth.loading = false;
        },
        [auth.rejected]: (state, action) => {
            state.auth.success = false;
            console.log("payload", action.payload);
            state.auth.error = action.error.message;
            state.auth.errorMessage = action.payload.error.errors
                ? action.payload.error.errors
                : action.payload.error;
            state.auth.loading = false;
        },

        // REGISTER
        [register.pending]: (state) => {
            state.register.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            console.log("payload", action.payload);
            state.auth.data = action.payload.data.data;
            state.auth.success = true;

            state.register.data = action.payload.data.data;
            state.register.error = false;
            state.register.errorMessage = null;
            state.register.loading = false;
            state.register.success = true;
        },
        [register.rejected]: (state, action) => {
            console.log("payload", action.payload);
            state.register.error = action.error.message;
            state.register.errorMessage = action.payload.error.error
                ? action.payload.error.error
                : action.payload.error.message
                    ? action.payload.error.message
                    : action.payload.error;
            state.register.loading = false;
            state.register.success = false;
        },
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
