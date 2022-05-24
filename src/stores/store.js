import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movie/movieSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        movie: movieSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
