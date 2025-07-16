import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const vehicleApi = createApi({
    reducerPath:'vehicleApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['vehicle'],
    endpoints:(builder)=>({
        getAllVehicles:builder.query({
            query:()=>'vehicle',
            providesTags:['vehicle']
        })
    })
})