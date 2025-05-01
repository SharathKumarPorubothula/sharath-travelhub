import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/core-booking/HomePage";
import SearchResults from "./pages/core-booking/SearchResults";

// User Account Pages
import Profile from "./pages/user-account/Profile";
import Dashboard from "./pages/user-account/Dashboard";
import MyBookings from "./pages/user-account/MyBookings";
import SavedPayments from "./pages/user-account/SavedPayments";
import Login from "./pages/user-account/Auth/Login";
import Register from "./pages/user-account/Auth/Register";

// Support-Help Pages
import CancelTicket from "./pages/support-help/CancelTicket";
import Reschedule from "./pages/support-help/Reschedule";
import ShowTicket from "./pages/support-help/ShowTicket";

import SeatSelection from "./pages/core-booking/SeatSelection";
import PassengerDetails from "./pages/core-booking/PassengerDetails";
import PaymentPage from "./pages/core-booking/PaymentPage";
import ShowTicke from "./pages/support-help/ShowTicket";

import Ticket from "./pages/support-help/ticket";
import Terms from "../src/pages/footerOptions/terms"
import Privacy from "../src/pages/footerOptions/Privacy"
import Help from "./pages/footerOptions/Help";



import "./styles.css";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />

          {/* User Account Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/saved-payments" element={<SavedPayments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Support/Help Routes */}
          <Route path="/help/cancel-ticket" element={<CancelTicket />} />
          <Route path="/help/reschedule" element={<Reschedule />} />
          <Route path="/help/show-ticket" element={<ShowTicket />} />

          <Route path="/select-seat" element={<SeatSelection />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/show-ticket" element={<ShowTicke />} />
          <Route path="/ticket" element={<Ticket />} />

          <Route path="/term" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />



          {/* Catch-all Route */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
