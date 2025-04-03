import { configureStore } from "@reduxjs/toolkit";
import ticketReservationReducer from "./ticketReservationSlice"; // Import slice
import ticketReducer from "./ticketSlice";
import ticketTypeReducer from "./ticketType";
import stationAutoCompleteReducer from "./stationAutoCompleteSlice"
import stationSearchReducer from "./stationSearchSlice"
export const store = configureStore({
    reducer: {
        ticketReservation: ticketReservationReducer,
        ticket: ticketReducer,
        ticketType: ticketTypeReducer,
        stationAutoComplete: stationAutoCompleteReducer,
        stationSearch: stationSearchReducer,
        // Add other reducers here...
    },
});

