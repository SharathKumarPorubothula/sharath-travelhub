import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSeats: [],
  bookingInfo: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },
    setBookingInfo: (state, action) => {
      state.bookingInfo = action.payload;
    },
    resetBooking: (state) => {
      state.selectedSeats = [];
      state.bookingInfo = null;
    },
  },
});

export const { selectSeats, setBookingInfo, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
