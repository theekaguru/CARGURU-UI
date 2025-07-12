import {createSlice , type PayloadAction} from "@reduxjs/toolkit"

interface AuthState{
    user: null ;
    token: string
}

const initialState ={
    user: null , 
    token: null ,
    isAuthenticated: false ,
    userType: null 

}