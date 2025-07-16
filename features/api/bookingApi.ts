import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const bookingApi = createApi({
    reducerPath:'bookingApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/'}),
    tagTypes:['booking'],
    endpoints:(builder)=>({
        getAllbooking:builder.query({
            query:()=>'booking',
            providesTags:['booking']
        }),
        createBooking:builder.mutation({
            query:(createBookingPayload)=>({
                url:'booking',
                method:'POST',
                body:createBookingPayload
            }),
            invalidatesTags:['booking']
        })
    })
})