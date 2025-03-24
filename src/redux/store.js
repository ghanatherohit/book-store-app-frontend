import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/Cart/cartSlice'
import booksApi from './features/Books/booksApi'
import ordersApi from './features/Orders/OrdersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
}) 