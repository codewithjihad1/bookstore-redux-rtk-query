import { createSlice } from "@reduxjs/toolkit";

// initial State
const initialState = {
  books: [],
  filterBooks: [],
};

// create slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    getBooks: (state, action) => {
      state.books = action.payload;
      state.filterBooks = action.payload;
    },
    filterFeatured: (state, action) => {
      state.filterBooks = state.books.filter((book) => {
        if (action.payload === "featured") {
          return book.featured;
        }
        return book;
      });
    },
    filterBySearch: (state, action) => {
      state.filterBooks = state.books.filter((book) => {
        let queryString = action.payload?.toLowerCase();
        let title = book.name?.toLowerCase();
        if (action.payload !== "") {
          return title?.includes(queryString);
        }

        return book;
      });
    },
  },
});

export default filterSlice;
export const { getBooks, filterFeatured, filterBySearch } = filterSlice.actions;
