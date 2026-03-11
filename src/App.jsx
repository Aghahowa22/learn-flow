import {} from "react";
import Navbar from "./component/Navbar";
import { Route, Routes, Navigate, replace, Link } from "react-router-dom";
import { BookOpenText, Calendar } from "lucide-react";
import Landing from "./routes/Landing";
import About from "./routes/About";
import Pricing from "./routes/Pricing";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ForgotPassword from "./routes/ForgotPassword";
import Features from "./routes/Features";
import Dashboard from "./routes/Dashboard";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";
import Courses from "./routes/Courses";
import Billing from "./routes/Billing";
import UserProfile from "./routes/UserProfile";
import CourseBuilder  from "./routes/CourseBuilder";
import Projects from "./routes/Projects";
import Calender from "./routes/Calender";

function App() {
  // imported state from AuthContext
  const {currentUser, loading} = useAuth();

  // loading before the app starts
  if(loading){
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex justify-center items-center text-4xl lg:5xl">
          <BookOpenText className="h-10 w-12  text-black " />
          <div className="flex items-center">
            <span className="font-bold text-black">Learn</span>
            <span className="text-amber-400 font-extrabold ">Flow</span>
          </div>
          
        </div>
      </div>
    );
  }
  // all app navigation routes
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Landing />
          }
        />

        <Route
          path="/about"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <About />
          }
        />

        <Route
          path="/features"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Features />
          }
        />

        <Route
          path="/pricing"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Pricing />
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />

        <Route
          path="/forgotpassword"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
        {/* protected route on the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className=" ">
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the courses route */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <div>
                <Courses />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the  projects */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <div>
                <Projects />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the course-builder route */}
        <Route
          path="/coursebuilder"
          element={
            <ProtectedRoute>
              <div>
                <CourseBuilder />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the calender route */}
        <Route
          path="/calender"
          element={
            <ProtectedRoute>
              <div>
                <Calender />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the user-profile route */}
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <div>
                <UserProfile />
              </div>
            </ProtectedRoute>
          }
        />
        {/* protected route on the billing route */}
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <div>
                <Billing />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
