import { useState } from "react";
import { ThemeProvider } from "./config/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Infomation from "./pages/Infomation/Infomation";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import Booking from "./pages/Booking/Booking";
import Bookings from "./pages/Bookings/Booking";
import Trip from "./pages/Trip/Trip";
import Seat from "./pages/Seat/Seat";
import CheckTicket from "./pages/CheckTicket/CheckTicket";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="booking/" element={<Booking />} />
            <Route path="bookings/" element={<Bookings />} />
            <Route path="trips/" element={<Trip />} />
            <Route path="seats/" element={<Seat />} />
            <Route path="info/" element={<Infomation />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="check-ticket/" element={<CheckTicket />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
