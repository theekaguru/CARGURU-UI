import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const paymentApi = createApi({
    reducerPath:'paymentApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['payment'],
    endpoints:(builder)=>({
        getAllVehicles:builder.query({
            query:()=>'payment',
            providesTags:['payment']
        })
    })
})