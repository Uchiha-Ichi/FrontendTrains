import { configureStore } from "@reduxjs/toolkit";
import ticketReservationReducer from "./ticketReservationSlice"; // Import slice
import ticketReducer from "./ticketSlice";
import ticketTypeReducer from "./ticketType";
export const store = configureStore({
    reducer: {
        ticketReservation: ticketReservationReducer,
        ticket: ticketReducer,
        ticketType: ticketTypeReducer,
        // Add other reducers here...
    },
});

