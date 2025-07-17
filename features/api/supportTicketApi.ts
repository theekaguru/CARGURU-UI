import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const supportTicketApi = createApi({
    reducerPath:'supportTicketApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['supportTicket'],
    endpoints:(builder)=>({
        getAllVehicles:builder.query({
            query:()=>'supportTicket',
            providesTags:['supportTicket']
        })
    })
})