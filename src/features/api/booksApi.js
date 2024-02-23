import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),

  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      keepUnusedDataFor: 500,
      providesTags: ["Books"],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useGetBookQuery,
  useDeleteBookMutation,
} = booksApi;
