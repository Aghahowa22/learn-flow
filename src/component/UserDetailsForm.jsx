import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuth } from "../context/AuthContext";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Essential for flags and layout
import { CloudCheck,AlertCircle,CheckCircle2 } from "lucide-react";

const UserDetailsForm = () => {
  // State variables to hold user input for phone number, address, and occupation
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  // state variable for loading, success and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get the current user from the authentication context
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!phoneNumber.trim() || !address.trim() || !occupation.trim()) {
      return setError("All fields are required");
    }

    try {
      // Add a new document to the "users" collection in Firestore with the user's details
      await addDoc(collection(db, "users"), {
        uid: currentUser.uid,
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        occupation: occupation.trim(),
      });

      setPhoneNumber("");
      setAddress("");
      setOccupation("");
      setSuccess("User details saved successfully!");
      setTimeout(() => setSuccess(), 4000);
    } catch (err) {
      setError("Failed to save user details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom input styled with Tailwind
  // const CustomInput = ({ className, ...props }) => (
  //   <input
  //     {...props}
  //     className="w-full my-2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-black  placeholder:text-gray-500"
  //   />
  // );

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* error message didsplay */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        {/* displayed success message */}
        {success && (
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            <span className="text-green-800 text-sm">{success}</span>
          </div>
        )}
        <div className="">
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <PhoneInput
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Number"
              className="w-full my-2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-black  placeholder:text-gray-500"
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              defaultCountry="US"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
              className="w-full my-2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-black  placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              placeholder="Occupation"
              autoComplete="off"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full my-2 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-black  placeholder:text-gray-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center disabled:cursor-not-allowed gap-2 bg-amber-500 my-2 py-2 px-6 rounded-md text-amber-50 cursor-pointer hover:opacity-80"
          disabled={loading}
        >
          <CloudCheck size={20} />
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
