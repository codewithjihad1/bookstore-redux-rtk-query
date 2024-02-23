import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "../features/api/booksApi";
import filterSlice from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    filter: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});
