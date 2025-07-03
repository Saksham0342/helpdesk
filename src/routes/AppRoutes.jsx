import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import MyTickets from "../pages/MyTickets";
import Profile from "../pages/Profile";
import NewTicket from "../pages/NewTicket";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tickets" element={<MyTickets />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/new-ticket" element={<NewTicket />} />

  </Routes>
);

export default AppRoutes;
