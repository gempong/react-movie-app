import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const API_URL = "http://notflixtv.herokuapp.com/api/v1/";

export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}reviews/show`)
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const postReviews = createAsyncThunk(
    "reviews/postReviews",
    async ({id, values, token}, { rejectWithValue }) => {
        if (token) {
            try {
                const response = await axios.post(`${API_URL}reviews/${id}/create`, values, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response);
                return response.data;
            } catch (err) {
                if (!err.response) {
                    throw err;
                }
                console.log(err);
                return rejectWithValue(err.response.data);
            }
        }
    }
);

export const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: {
            data: [],
            pagination: {},
            loading: false,
            error: false,
        },
        post: {
            data: [],
            loading: false,
            error: false,
            errorMessage: false,
        },
        update: {
            data: [],
            loading: false,
            error: false,
            errorMessage: false,
        },
    },
    reducers: {},
    extraReducers: {
        // FETCH DATA REVIEWS
        [fetchReviews.pending]: (state) => {
            state.reviews.loading = true;
        },
        [fetchReviews.fulfilled]: (state, action) => {
            state.reviews.pagination = action.payload.data;
            state.reviews.data = action.payload.data.docs;
            state.reviews.loading = false;
        },
        [fetchReviews.rejected]: (state, action) => {
            state.reviews.loading = false;
            state.reviews.error = action.error.message;
        },

        // POST DATA REVIEWS
        [postReviews.pending]: (state) => {
            state.post.loading = true;
        },
        [postReviews.fulfilled]: (state, action) => {
            state.post.data = action.payload.data;
            state.post.loading = false;
        },
        [postReviews.rejected]: (state, action) => {
            state.post.loading = false;
            state.post.error = action.error.message;
            state.post.errorMessage = action.payload.message;
        },
    },
});

export default reviewsSlice.reducer;
