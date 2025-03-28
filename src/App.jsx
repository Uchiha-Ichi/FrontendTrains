import { useState } from "react";
import { ThemeProvider } from "./config/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Infomation from "./pages/Infomation/Infomation";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="info/" element={<Infomation />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
