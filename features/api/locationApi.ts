import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const locationApi = createApi({
    reducerPath:'locationApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['location'],
    endpoints:(builder)=>({
        getAllVehicles:builder.query({
            query:()=>'location',
            providesTags:['location']
        })
    })
})