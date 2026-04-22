import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseconfig";

import UserDetailsCard from "../component/UserDetailsCard";
import UserDetailsForm from "../component/UserDetailsForm";
import ProfilePicture from "../component/ProfilePicture";
import CoverPhotoUpload from "../component/CoverPhotoUpload";

import {
  House,
  BookOpen,
  AppWindow,
  PencilLine,
  CalendarDays,
  MoveRight,
  Menu,
  X,
  CloudCheck,
  StickyNote,
  SquarePen,
  Upload,
  Loader,
  User,
  Mail,
  Lock,
  Shield,
  Settings,
  AlertCircle,
  CheckCircle2,
  Save,
  Camera,
} from "lucide-react";

// repeating dashboard nav side bar on the user profile route large screen only
const UserProfile = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("");
  // all variable for link routes active state
  const isDashboard = selectedCategory === "dashboard";
  const isCourses = selectedCategory === "courses";
  const isProjects = selectedCategory === "projects";
  const isCourseBuilder = selectedCategory === "coursebuilder";
  const isCalender = selectedCategory === "calender";

  // import useAuth from auth context
  const {
    currentUser,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    photoError,
    photoSuccess,
    uploading,
    profileImage,
    handleProfilePhotoUpload,
  } = useAuth();
  // dashboard menu toggle mobile view states and function
  const [dashBoardClick, setDashBoardClick] = useState(false);
  const dropdownRef = useRef(null);

  const handleDashboardClick = () => {
    setDashBoardClick(!dashBoardClick);
  };
  const removeDashBoard = () => {
    setDashBoardClick(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDashBoardClick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // user profile states and UI when uploading profile photo
  // Fetch existing profile photo on component mount from the auth context

  // user name update states and function
  const [nameLoading, setNameLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  // email update states and function
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  // password update states and function
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // updating user name

  const handleUpdateProfileUserName = async (event) => {
    event.preventDefault();

    if (!displayName) {
      return setError("Enter new username");
    }

    setNameLoading(true);
    try {
      await updateUserProfile(displayName, null);
      // Profile updated successfully
      setSuccess("Username updated successfully!");
      setTimeout(() => setSuccess(), 4000);
      setDisplayName("");
      setError(null);
    } catch (err) {
      setError("failed to update username:  ", err.message);
    } finally {
      setNameLoading(false);
    }
  };

  // update email handler
  const handleUpdateEmail = async (event) => {
    event.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);

    if (!newEmail || !emailPassword) {
      setEmailError("Enter new email and current password");
      return;
    }

    if (newEmail === currentUser?.email) {
      setEmailError("New email must be different from current email");
      return;
    }

    setEmailLoading(true);
    try {
      await updateUserEmail(newEmail, emailPassword);
      setEmailSuccess("Email updated successfully!");
      setNewEmail("");
      setEmailPassword("");
      setTimeout(() => setEmailSuccess(null), 4000);
    } catch (err) {
      setEmailError(err.message || " :Failed to update email");
    } finally {
      setEmailLoading(false);
    }
  };

  // update password handler
  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    setPasswordLoading(true);
    try {
      await updateUserPassword(newPassword, currentPassword);
      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(null), 4000);
    } catch (err) {
      setPasswordError(err.message || " :Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // user details states and function to fetch user details from firestore and display on the user profile page
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);
  const [notes, setNotes] = useState([]);
  

  useEffect(() => {
    setUserLoading(true);

    const notesQuery = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(notesQuery, (querySnapshot) => {
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      notesData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });

      setNotes(notesData);
      setUserLoading(false)
    },(err) => {
        console.error("Error fetching user details", err)
        setUserError("failed to fetch user details")
        setUserLoading(false);

    }

    );

    return () => unsubscribe();
  }, [currentUser.uid]);

  

  // dashboard sideBar
  const dashBoardMenu = (
    <>
      <div>
        <aside
          id="default-sidebar"
          className="fixed top-22  left-0 z-40 max-w-60 h-full bg-gray-50  "
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-200 shadow-lg">
            <span className="float-right cursor-pointer">
              <X size={25} onClick={removeDashBoard} />
            </span>
            <ul className="space-y-3 py-8 font-medium">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                  onClick={removeDashBoard}
                >
                  <House size={20} />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                >
                  <BookOpen size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
                  <span className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded-sm">
                    Bgn
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300 "
                >
                  <AppWindow size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Projects
                  </span>
                  <span className="inline-flex items-center justify-center p-0.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">
                    10+
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/coursebuilder"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                >
                  <PencilLine size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Course buildier
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/calender"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300 "
                >
                  <CalendarDays size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Calender
                  </span>
                </Link>
              </li>
            </ul>
            {/* dashboard quote section */}
            <div className=" block max-w-sm border border-gray-200 rounded-lg shadow-lg">
              <div className="p-5 text-center">
                <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                  <svg
                    className="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
                <h5 className="mt-3 text-lg font-semibold tracking-tight text-heading">
                  Good programmers write codes humans can understand
                </h5>

                <Link
                  to="#"
                  className="inline-flex my-2 items-center text-white bg-amber-500  hover:opacity-80  shadow-xs font-medium  rounded-lg text-sm px-4 py-2 "
                >
                  Read more
                  <MoveRight className="px-1 " />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );

  return (
    <div>
      {/* dashboard side navigation links */}
      <div ref={dropdownRef}>
        <div className="w-full bg-gray-300">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className=" md:hidden font-medium leading-5  rounded-base  mt-22 text-sm py-3 px-2 cursor-pointer inline-flex"
            onClick={handleDashboardClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu />
          </button>
        </div>
        <div className=" md:hidden">{dashBoardClick && dashBoardMenu}</div>
      </div>
      <div className="lg:flex md:flex hidden">
        <aside
          id="default-sidebar"
          className="fixed top-22  left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-200 shadow-lg">
            <ul className="space-y-4 font-medium">
              <li
                onClick={() => setSelectedCategory("dashboard")}
                className={`categories ${isDashboard ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                >
                  <House size={20} />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li
                onClick={() => setSelectedCategory("courses")}
                className={`categories ${isCourses ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/courses"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                >
                  <BookOpen size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
                  <span className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded-sm">
                    Bgn
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setSelectedCategory("projects")}
                className={`categories ${isProjects ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/projects"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300 "
                >
                  <AppWindow size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Projects
                  </span>
                  <span className="inline-flex items-center justify-center p-0.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">
                    10+
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setSelectedCategory("coursebuilder")}
                className={`categories ${isCourseBuilder ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/coursebuilder"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                >
                  <PencilLine size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Course buildier
                  </span>
                </Link>
              </li>

              <li
                onClick={() => setSelectedCategory("calender")}
                className={`categories ${isCalender ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/calender"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300 "
                >
                  <CalendarDays size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Calender
                  </span>
                </Link>
              </li>
            </ul>
            {/* dashboard quote section */}
            <div className="my-10 block max-w-sm border border-gray-200 rounded-lg shadow-lg">
              <div className="p-5 text-center">
                <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                  <svg
                    className="w-3 h-3 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
                    />
                  </svg>
                  Trending
                </span>
                <h5 className="mt-3 text-lg font-semibold tracking-tight text-heading">
                  Good programmers write codes humans can understand
                </h5>

                <Link
                  to="#"
                  className="inline-flex my-2 items-center text-white bg-amber-500  hover:opacity-80  shadow-xs font-medium  rounded-lg text-sm px-4 py-2 "
                >
                  Read more
                  <MoveRight className="px-1 " />
                </Link>
              </div>
            </div>
          </div>
        </aside>
        {/* dashdoard body */}
      </div>
      {/* user profile body */}
      <div className="ml-5 p-4 md:mt-22 md:ml-64">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h2>
          <p className="text-gray-600">
            Manage your account settings and personal information
          </p>
        </div>

        {/* Profile Header Card */}
        <div className=" rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative">
            <CoverPhotoUpload />
            {/* <div className="absolute -bottom-16 left-8">
              <ProfilePicture />
            </div> */}
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentUser?.displayName || "User"}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{currentUser?.email}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Verified
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <div className="flex gap-3 ">
                  {/* <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </button> */}
                  <button className=" items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg ">
                    <div className="flex justify-center items-center gap-2">
                      <CloudCheck className="w-4 h-4 " />
                      Account Status
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Management Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Camera className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Photo
              </h3>
              <p className="text-sm text-gray-600">
                Update your profile picture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Profile Photo Display */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              )}
            </div>

            {/* Upload Section */}
            <div className="flex-1">
              <label
                htmlFor="profile-photo"
                className="inline-flex text-sm md:text-base items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Change Photo
                <input
                  type="file"
                  id="profile-photo"
                  accept="image/png, image/jpeg, image/gif, image/webp, image/jpg, image/avif"
                  onChange={handleProfilePhotoUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG, GIF, WebP, AVIF up to 40MB
              </p>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {(photoError || photoSuccess) && (
          <div className="mb-6">
            {photoError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-red-800 text-sm">{photoError}</span>
              </div>
            )}
            {photoSuccess && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-green-800 text-sm">{photoSuccess}</span>
              </div>
            )}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update your display name and basic information
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleUpdateProfileUserName}
                className="space-y-6"
              >
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span className="text-red-800 text-sm">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-800 text-sm">{success}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="currentUserName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Current Username
                    </label>
                    <input
                      id="currentUserName"
                      type="text"
                      value={currentUser?.displayName || ""}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newUserName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      New Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="newUserName"
                      type="text"
                      placeholder="Enter new username"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-black focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={nameLoading}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    {nameLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {nameLoading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
            {/* Security Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Security Settings
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your email and password
                  </p>
                </div>
              </div>

              {/* Email Update Form */}
              <div className="mb-8">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Update Email Address
                </h4>
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  {emailError && (
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="text-red-800 text-sm">{emailError}</span>
                    </div>
                  )}

                  {emailSuccess && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-green-800 text-sm">
                        {emailSuccess}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="currentEmail"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Current Email
                      </label>
                      <input
                        id="currentEmail"
                        type="email"
                        value={currentUser?.email || ""}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newEmail"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        New Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="newEmail"
                        type="email"
                        placeholder="Enter new email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Current Password (for verification){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      value={emailPassword}
                      onChange={(e) => setEmailPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={emailLoading}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      {emailLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      {emailLoading ? "Updating..." : "Update Email"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Password Update Form */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">
                  Change Password
                </h4>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  {passwordError && (
                    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span className="text-red-800 text-sm">
                        {passwordError}
                      </span>
                    </div>
                  )}

                  {passwordSuccess && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-green-800 text-sm">
                        {passwordSuccess}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="currentPasswordVerification"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Current Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="currentPasswordVerification"
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm New Password{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                      {passwordLoading ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      {passwordLoading ? "Updating..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Right Column - Additional Information */}
          <div className="space-y-8">
            {/* Additional Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Additional Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add your personal details
                  </p>
                </div>
              </div>

              <div className=" space-y-6">
                <UserDetailsForm />

                {userError && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span className="text-red-800 text-sm">{userError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* User Details Display Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Details
                  </h3>
                  <p className="text-sm text-gray-600">
                    View and manage your information
                  </p>
                </div>
              </div>

              {userLoading ? (
                <div className="text-center py-8">
                  <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-3" />
                  <p className="text-gray-500">Loading user details...</p>
                </div>
              ) : notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <UserDetailsCard key={note.id} note={note} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
                  <StickyNote className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <h4 className="text-lg font-medium text-gray-900 mb-1">
                    No details added yet
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add your personal information above to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default UserProfile;
