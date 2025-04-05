import { createSlice } from "@reduxjs/toolkit";

const seatSlice = createSlice({
  name: "seat",
  initialState: {
    selectedSeats: [], // Danh sách seatId của các ghế được chọn
  },
  reducers: {
    selectSeat: (state, action) => {
      const seatId = action.payload;
      if (state.selectedSeats.includes(seatId)) {
        state.selectedSeats = state.selectedSeats.filter((id) => id !== seatId); // Bỏ chọn
      } else {
        state.selectedSeats.push(seatId); // Chọn ghế
      }
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats = []; // Xóa tất cả ghế đã chọn
    },
  },
});

export const { selectSeat, clearSelectedSeats } = seatSlice.actions;
export default seatSlice.reducer;