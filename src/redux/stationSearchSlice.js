import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Gửi request tìm kiếm ga tàu 🚆
export const searchTrains = createAsyncThunk(
    "stationSearch/searchTrains",
    async ({ from, to, date }, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:8080/api/trains/search", {
                params: { from, to, date },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Lỗi khi tìm kiếm tàu");
        }
    }
);

// Tạo slice
const stationSearchSlice = createSlice({
    name: "stationSearch",
    initialState: {
        results: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchTrains.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchTrains.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchTrains.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default stationSearchSlice.reducer;
