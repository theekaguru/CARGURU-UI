import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const vehicleSpecApi = createApi({
    reducerPath:'vehicleSpecApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['vehicleSpec'],
    endpoints:(builder)=>({
        getAllVehicles:builder.query({
            query:()=>'vehicleSpec',
            providesTags:['vehicleSpec']
        })
    })
})