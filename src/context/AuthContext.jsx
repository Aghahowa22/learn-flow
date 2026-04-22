import React, { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../firebaseconfig";
import { supabase } from "../../supabaseClient" // Make sure you have this configured


const AuthContext = createContext();

// useAuth to be used all over the application
export function useAuth() {
  return useContext(AuthContext);
}

// authentication function

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // signup function

  async function signup(email, password) {
    setError("");

    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // login function

  async function login(email, password) {
    setError("");

    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // google login servie from firebase
  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
  }

  // password reset function

  async function passwordReset(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  // send user verification email after user created
  async function verifyUserEmail() {
    return await sendEmailVerification(auth.currentUser);
  }

  // signout from dashboard functon

  async function logout() {
    setError("");

    try {
      return await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // updating user profile display name immediately after user creation

  async function updateUserProfile(displayName, photoURL) {
    setError("");
    try {
      return await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // reauthenticate user with email and password
  async function reauthenticateUser(currentPassword) {
    setError("");
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      return await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // update user email after reauthentication
  async function updateUserEmail(newEmail, currentPassword) {
    setError("");
    try {
      // First reauthenticate
      await reauthenticateUser(currentPassword);
      // Then update email
      await updateEmail(auth.currentUser, newEmail);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // update user password after reauthentication
  async function updateUserPassword(newPassword, currentPassword) {
    setError("");
    try {
      // First reauthenticate
      await reauthenticateUser(currentPassword);
      // Then update password
      await updatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // user profile states and UI when uploading profile photo
  // Fetch existing profile photo on component mount
  // update user name state and function when user already signed in
  // user profile photo upload states
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoSuccess, setPhotoSuccess] = useState(null);
  const [photoError, setPhotoError] = useState(null);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setProfileImage(currentUser.photoURL);
    }
  }, [currentUser]);

  // Function to upload profile photo to Supabase and update the user's profile photo
  const handleProfilePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const maxSize = 40 * 1024 * 1024; // 40MB

    // Validate file
    if (!file) return;

    if (file.size > maxSize) {
      setPhotoError("File size exceeds 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please upload an image file");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${currentUser.uid}-${Date.now()}.${fileExt}`;
      const filePath = `profile-photos/${currentUser.uid}/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("Avater") // Make sure this bucket exists
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } =  supabase.storage
        .from("Avater")
        .getPublicUrl(filePath);

      const photoURL = publicUrlData.publicUrl;

      // Update user profile with photo URL
      await updateUserProfile(null, photoURL);

      setProfileImage(photoURL);
      setPhotoSuccess("Profile photo updated successfully!");
      setTimeout(() => setPhotoSuccess(null), 3000);
    } catch (err) {
      setPhotoError(err.message || "Failed to upload profile photo");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // function to allow user remove profile photo
  // const handleRemovePhoto = async () => {
  //   try {
  //     setUploading(true);

  //     // Update user profile to remove photo
  //     await updateUserProfile(null, null);

  //     setProfileImage(null);
  //     setSuccess("Profile photo removed");
  //     setTimeout(() => setSuccess(null), 3000);
  //   } catch (err) {
  //     setError("Failed to remove profile photo");
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // to keep user logged in when the web reloads and to get the current created/logged in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // user profiler picture

  // exporting all variables to be used all over the application

  const value = {
    currentUser,
    profileImage,
    uploading,
    photoSuccess,
    photoError,
    handleProfilePhotoUpload,
    verifyUserEmail,
    passwordReset,
    googleLogin,
    logout,
    signup,
    login,
    updateUserProfile,
    reauthenticateUser,
    updateUserEmail,
    updateUserPassword,
    error,
    loading,
  };
  // component to be used in the application

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
