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
} from "firebase/auth";

import { auth } from "../../firebaseconfig";

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

  async function updateUserProfile(displayName) {
    setError("");
    try {
      return await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  // to keep user logged in when the web reloads and to get the current created/logged in user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // exporting all variables to be used all over the application

  const value = {
    currentUser,
    passwordReset,
    googleLogin,
    logout,
    signup,
    login,
    updateUserProfile,
    error,
    loading,
  };
  // component to be used in the application

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
