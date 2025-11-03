import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL, ITEMS_PER_PAGE } from "../../constants/api";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (page = 1, thunkAPI) => {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const url = `${BASE_API_URL}&limit=${ITEMS_PER_PAGE}&offset=${offset}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return { books: data.docs, total: data.numFound };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    totalItems: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        // додаємо нові книги до вже наявних
        state.items = [...state.items, ...action.payload.books];
        state.totalItems = action.payload.total;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
