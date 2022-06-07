import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const API_URL = "https://notflixtv.herokuapp.com/api/v1/";
export const TOKEN = JSON.parse(localStorage.getItem("token"));

export const auth = createAsyncThunk(
    "user/auth",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}users/login`, values);
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data.data.token));
                return response;
            } else {
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

export const getUser = createAsyncThunk(
    "user/getUser",
    async (token, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await axios.get(`${API_URL}users/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return response.data;
            } else {
                const data = [{
                    error: 'Token Not Found',
                    message: 'Token Not Found'
                }]
                return rejectWithValue(...data);
            }
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ token, values }, { rejectWithValue }) => {
        try {
            if (token) {
                let bodyFormData = new FormData();
                bodyFormData.append('first_name', values.first_name);
                bodyFormData.append('last_name', values.last_name);
                bodyFormData.append('email', values.email);
                if (values.image !== undefined) {
                    bodyFormData.append('image', values.image[0].originFileObj);
                }
                const response = await axios({
                    method: "put",
                    url: `${API_URL}users`,
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` },
                })
                return response;
            } else {
                const data = [{
                    error: 'Token Not Found',
                    message: 'Token Not Found'
                }]
                return rejectWithValue(...data);
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
        token: TOKEN || null,
        loading: false,
        error: false,
        errorMessage: null,
        success: TOKEN ? true : false,
    },
    register: {
        token: null,
        loading: false,
        error: false,
        errorMessage: null,
        success: false,
    },
    user: {
        data: null,
        loading: false,
        error: false,
        errorMessage: null,
    },
    update: {
        response: null,
        loading: false,
        error: false,
        errorMessage: null,
    },
};

export const userSlice = createSlice({
    name: "user",
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
            state.auth.token = action.payload.data.data.token;
            state.auth.success = true;
            state.auth.error = false;
            state.auth.errorMessage = null;
            state.auth.loading = false;
        },
        [auth.rejected]: (state, action) => {
            state.auth.success = false;
            state.auth.error = action.error.message;
            state.auth.errorMessage = action.payload.message
            state.auth.loading = false;
        },
        // REGISTER
        [register.pending]: (state) => {
            state.register.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.auth.token = action.payload.data.data.token;
            state.auth.success = true;

            state.register.token = action.payload.data.data.token;
            state.register.error = false;
            state.register.errorMessage = null;
            state.register.loading = false;
            state.register.success = true;
        },
        [register.rejected]: (state, action) => {
            state.register.error = action.error.message;
            state.register.errorMessage = action.payload.message
            state.register.loading = false;
            state.register.success = false;
        },
        // USER
        [getUser.pending]: (state) => {
            state.user.loading = true;
        },
        [getUser.fulfilled]: (state, action) => {
            state.user.data = action.payload.data;
            state.user.error = false;
            state.user.errorMessage = null;
            state.user.loading = false;
        },
        [getUser.rejected]: (state, action) => {
            state.user.error = action.error.message;
            state.user.errorMessage = action.payload.message
            state.user.loading = false;
        },
        // UPDATE USER
        [updateUser.pending]: (state) => {
            state.update.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.update.response = action.payload.data;
            state.update.success = true;
            state.update.error = false;
            state.update.errorMessage = null;
            state.update.loading = false;
        },
        [updateUser.rejected]: (state, action) => {
            state.update.success = false;
            state.update.error = action.error.message;
            state.update.errorMessage = action.payload.message
            state.update.loading = false;
        },
    },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
