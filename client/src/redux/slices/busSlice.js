import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buses: [],
  loading: false,
};

const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    setBuses: (state, action) => {
      state.buses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setBuses, setLoading } = busSlice.actions;
export default busSlice.reducer;
