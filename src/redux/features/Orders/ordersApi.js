import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseUrl";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: `/create-order`,
                method: 'POST',
                body: newOrder,
                credentials: 'include'
            }),  
        }),
        getOrdersByUserEmail: builder.query({
            query: (email) => ({
                url: `/get-orders/${email}`,
                method: 'GET',
                credentials: 'include'
            }), 
            providesTags: ['Order']
        })
    })  
})

export const { useCreateOrderMutation,useGetOrdersByUserEmailQuery } = ordersApi; 
export default ordersApi;