import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';

const url = "https://randomuser.me/api/?results=5";

export const fetchUser = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw isRejectedWithValue(error);
  }
});

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;

