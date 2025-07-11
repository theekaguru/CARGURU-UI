import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/api/userApi";


export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMidddleware) =>
        getDefaultMidddleware({
            serializableCheck:false,
        }).concat(userApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch