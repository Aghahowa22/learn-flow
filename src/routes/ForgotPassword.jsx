import React from "react";
import { useState } from "react";
import { BookOpenText, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import SwiperHook from "../component/SwiperHook";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  // all input states
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { passwordReset } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      return setError(" Enter email ");
    }

    try {
      setSuccess("");
      setLoading(true);
      await passwordReset(email);
      setSuccess(
        "Successfully sent to your email, check your inbox or spam folder for reset link",
      );
      setTimeout(() => setSuccess(), 4000);
      setEmail("");
    } catch (err) {
      setError("Failed to send link to email: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex  items-center justify-center bg-gray-100 ">
        <div className="container  mx-auto px-4 py-8">
          {/* form */}
          <div className="lg:flex lg:justify-items-center lg:items-center gap-20 ">
            {/* form section */}
            <div className="w-full shadow-xl lg:w-1/2 border border-gray-300 p-3 rounded-md my-2">
              {/* learnflow logo */}

              <div className="flex items-center ">
                <Link to="/" className="flex text-2xl ">
                  <BookOpenText className="h-8 w-10  text-black " />
                  <div className="flex items-center">
                    <span className="font-medium text-black">Learn</span>
                    <span className="text-amber-500 font-extrabold">Flow</span>
                  </div>
                </Link>
              </div>
              {/* form heading */}

              <div className="mt-1">
                <p>Enter your account email to reset your password!</p>
              </div>
              <form onSubmit={handleSubmit}>
                {/* error message didsplay */}
                {error && (
                  <div className="flex items-center my-4 gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span className="text-red-800 text-sm">{error}</span>
                  </div>
                )}

                {/* displayed success message */}
                {success && (
                  <div className="flex items-center my-4 gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-800 text-sm">{success}</span>
                  </div>
                )}

                <div className="space-y-2 mt-2">
                  {/* email input */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 "
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="flex items-center relative">
                      <Mail className="h-5 w-4 text-gray-500 absolute left-2 " />
                      <input
                        id="email"
                        type="email"
                        className="w-full px-7 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-black  placeholder:top-1/2 placeholder:text-gray-500"
                        placeholder="You@example"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* submit button */}
                  <div className="mt-4">
                    <button
                      className="w-full bg-black text-white py-2
                      rounded-md hover:opacity-80 transition-colors focus:outline-none
                      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50
                      disabled:cursor-not-allowed mt-4 cursor-pointer"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex justify-center items-center gap-1">
                          {" "}
                          <ClipLoader color="#ffff" size={20} loading={true} />
                          <p>Sending link to your email...</p>
                        </div>
                      ) : (
                        "Reset password"
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-center text-sm py-2">
                    <Link
                      to="/login"
                      className="text-amber-500 font-bold hover:underline px-1 hover:opacity-70"
                    >
                      Sign In
                    </Link>
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="text-amber-500 font-bold hover:underline px-1 hover:opacity-70"
                    >
                      Enroll Now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            {/* image section */}
            <div className="hidden lg:block">
              <div>
                <SwiperHook />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword;
