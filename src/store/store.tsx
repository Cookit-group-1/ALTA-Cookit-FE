import { configureStore } from "@reduxjs/toolkit"
import likeButtonReducer from "./features/likeButtonSlice"

const store = configureStore({
    reducer: {
        likeButton: likeButtonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
