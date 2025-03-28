import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action async để lấy thông tin đặt vé từ API
export const fetchTicketReservation = createAsyncThunk(
    "ticketReservation/fetch",
    async (id, { rejectWithValue }) => {
        try {

            const response = await axios.get(
                `http://localhost:8080/api/ticketReservation/getReservation`,
                {
                    params: { id },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Lỗi khi lấy thông tin vé"
            );
        }
    }
);

const ticketReservationSlice = createSlice({
    name: "ticketReservation",
    initialState: {
        reservations: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicketReservation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTicketReservation.fulfilled, (state, action) => {
                state.loading = false;
                state.reservations.push(action.payload);
            })
            .addCase(fetchTicketReservation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ticketReservationSlice.reducer;
