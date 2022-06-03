import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import movieSlice from "./movie/movieSlice";
import reviewSlice from "./reviews/reviewSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        movie: movieSlice,
        reviews: reviewSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
