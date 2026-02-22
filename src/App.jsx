import {} from "react";
import Navbar from "./component/Navbar";
import { Route, Routes, Navigate, replace } from "react-router-dom";
import Landing from "./routes/Landing";
import About from "./routes/About";
import Pricing from "./routes/Pricing";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ForgotPassword from "./routes/ForgotPassword";
import Features from "./routes/Features";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing/>} />

        <Route path="/about" element={<About/>} />

        <Route path="/features" element={<Features/>} />

        <Route path="/pricing" element={<Pricing/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/signup" element={<Signup/>} />

        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        {/* protected route on the dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  );
}

export default App;
