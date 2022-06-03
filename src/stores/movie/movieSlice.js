import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const API_URL = "http://notflixtv.herokuapp.com/api/v1/";
export const TOKEN = JSON.parse(localStorage.getItem("token"));

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (page) => {
        try {
            const response = await axios.get(`${API_URL}movies?page=${page}`);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const fetchPopularMovies = createAsyncThunk(
    "movies/fetchPopularMovies",
    async () => {
        try {
            const response = await axios.get(`${API_URL}movies`);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const fetchDetailMovies = createAsyncThunk(
    "movies/fetchDetailMovies",
    async (id) => {
        try {
            const response = await axios.get(`${API_URL}movies/${id}`);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const fetchAllGenres = createAsyncThunk(
    "movies/fetchAllGenres",
    async () => {
        try {
            const response = await axios.get(`${API_URL}movies/genres`);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const fetchGenres = createAsyncThunk(
    "movies/fetchGenres",
    async (params) => {
        const { genre, page } = params;
        try {
            const response = await axios.get(
                `${API_URL}movies?genre=${genre}&page=${page}`
            );
            console.log(page);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const searchMovie = createAsyncThunk(
    "movies/searchMovie",
    async (params) => {
        const { search, page } = params;
        try {
            const response = await axios.get(
                `${API_URL}movies?search=${search}&page=${page}`
            );
            console.log(response);
            return response;
        } catch (err) {
            return err;
        }
    }
);

export const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: {
            data: [],
            pagination: {},
            loading: false,
            error: false,
        },
        popular: {
            data: [],
            loading: false,
            error: false,
        },
        movie: {
            data: [],
            loading: false,
            error: false,
        },
        allgenre: {
            data: [],
            loading: false,
            error: false,
        },
        moviesbygenre: {
            data: [],
            pagination: {},
            loading: false,
            error: false,
        },
        searchmovie: {
            data: [],
            pagination: {},
            loading: false,
            error: false,
        },
    },
    reducers: {},
    extraReducers: {
        // FETCH DATA MOVIE
        [fetchMovies.pending]: (state) => {
            state.movies.loading = true;
        },
        [fetchMovies.fulfilled]: (state, action) => {
            state.movies.pagination = action.payload.data.data;
            state.movies.data = action.payload.data.data.docs;
            state.movies.loading = false;
        },
        [fetchMovies.rejected]: (state, action) => {
            state.movies.loading = false;
            state.movies.error = action.error.message;
        },

        // FETCH DATA POPULAR MOVIE
        [fetchPopularMovies.pending]: (state) => {
            state.popular.loading = true;
        },
        [fetchPopularMovies.fulfilled]: (state, action) => {
            state.popular.data = action.payload.data.data.docs;
            state.popular.loading = false;
        },
        [fetchPopularMovies.rejected]: (state, action) => {
            state.popular.loading = false;
            state.popular.error = action.error.message;
        },

        // FETCH DATA DETAIL MOVIE
        [fetchDetailMovies.pending]: (state) => {
            state.movie.loading = true;
        },
        [fetchDetailMovies.fulfilled]: (state, action) => {
            state.movie.data = action.payload.data.data;
            state.movie.loading = false;
        },
        [fetchDetailMovies.rejected]: (state, action) => {
            state.movie.loading = false;
            state.movie.error = action.error.message;
        },

        // FETCH DATA GENRE
        [fetchAllGenres.pending]: (state) => {
            state.allgenre.loading = true;
        },
        [fetchAllGenres.fulfilled]: (state, action) => {
            state.allgenre.data = action.payload.data.data;
            state.allgenre.loading = false;
        },
        [fetchAllGenres.rejected]: (state, action) => {
            state.allgenre.loading = false;
            state.allgenre.error = action.error.message;
        },

        // FETCH DATA MOVIES BY GENRE
        [fetchGenres.pending]: (state) => {
            state.moviesbygenre.loading = true;
        },
        [fetchGenres.fulfilled]: (state, action) => {
            state.moviesbygenre.pagination = action.payload.data.data;
            state.moviesbygenre.data = action.payload.data.data.docs;
            state.moviesbygenre.loading = false;
        },
        [fetchGenres.rejected]: (state, action) => {
            state.moviesbygenre.loading = false;
            state.moviesbygenre.error = action.error.message;
        },

        // FETCH DATA MOVIES BY GENRE
        [searchMovie.pending]: (state) => {
            state.searchmovie.loading = true;
        },
        [searchMovie.fulfilled]: (state, action) => {
            state.searchmovie.pagination = action.payload.data.data;
            state.searchmovie.data = action.payload.data.data.docs;
            state.searchmovie.loading = false;
        },
        [searchMovie.rejected]: (state, action) => {
            state.searchmovie.loading = false;
            state.searchmovie.error = action.error.message;
        },
    },
});

export default movieSlice.reducer;
