import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/api/userApi";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authReducer from "../features/auth/authSlice"
import {vehicleApi} from "../features/api/vehicleApi"
import {bookingApi} from "../features/api/bookingApi"

// create persist config for the authslice

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist:['user' , 'token' , 'isAuthenticated' , 'userType'] //specify which part of the state you want to persist
}

//Create a persisted reducer for the auth slice
const persistAuthReducer = persistReducer(authPersistConfig , authReducer)



export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [vehicleApi.reducerPath]:vehicleApi.reducer,
        [bookingApi.reducerPath]:bookingApi.reducer,
        //use the persisted reducer

        auth:persistAuthReducer
    },
    middleware:(getDefaultMidddleware) =>
        getDefaultMidddleware({
            serializableCheck:false,
        }).concat(userApi.middleware , vehicleApi.middleware  , bookingApi.middleware)
})

//Export the persisted store 
export const persistor =persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch