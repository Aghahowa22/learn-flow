import React, { useState, useRef, useEffect, } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpenText,
  Menu,
  X,
  CreditCard,
  LogOut,
  EllipsisVertical,
  CircleUser,
  User,
} from "lucide-react";
import Modal from "../component/Modal";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // navigation state to mobile view
  const [click, setCLick] = useState(false);
  // navigation menu/mobile view function
  const handleClick = () => {
    setCLick(!click);
  };
  const handleLogo = () => {
    setCLick(false);
  };
  //  logout pop up states
  const [modalOpen, setModalOpen] = useState(false);

  // user dropdown profile when logged in.. function and state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (e) => {
    setIsOpen(!isOpen);
  };
  const removeDropNavbar = (e) => {
    setIsOpen(false);
  };
  //  function to remove user profile drop down when the page of the dashboard is click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle state close for drop down menu
  // const removeUserProfile = () => {
  //   setIsOpen(false);
  // };

  // imported stated from AuthContext
  const { currentUser, logout, profileImage } = useAuth();
  const navigate = useNavigate();
  // logout function
  const handleLogout = async (e) => {
    try {
      await logout();
      setIsOpen(false);
      navigate("./login");
    } catch (err) {
      console.log("failed to logout " + err.message);
    }
  };

  //  navbar content mobile view display
  const content = (
    <>
      <div
        onClick={handleClick}
        className="z-50 md:hidden block absolute top-16 w-full h-screen right-0 left-0 bg-zinc-900 transition "
      >
        <ul className="text-center text-xl p-20 ">
          <Link to="/about">
            <li className="my-0 py-4 text-amber-50 border-b border-amber-400 ">
              About
            </li>
          </Link>
          <Link to="/features">
            <li className="my-0 py-4 text-amber-50 border-b border-amber-400 ">
              Features
            </li>
          </Link>
          <Link to="/pricing">
            <li className="my-0 py-4  text-amber-50 border-b border-amber-400 ">
              Pricing
            </li>
          </Link>

          <Link to="/login">
            <li className="my-0 py-4  text-amber-50 border-b border-amber-400 ">
              Sign in
            </li>
          </Link>
          <Link to="/signup">
            <li className="my-4 py-4 text-sm bg-amber-400  rounded-full hover:opacity-85">
              Start your learning journey
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  // user profile dropdown menu icon when logged in
  const userProfile = (
    <>
      <div>
        <div className="z-10 md:w-44 bg-white absolute top-24 right-0  transition md:right-8 border-gray-200  shadow-lg ">
          <div className="px-4 py-4 border-b border-gray-300 text-sm text-heading">
            <div className="font-medium">
              {currentUser ? currentUser.displayName : null}
            </div>
            <div className="truncate mt-1">
              {currentUser ? currentUser.email : null}
            </div>
          </div>
          <ul className="p-2 text-sm text-body font-medium">
           
            <li>
              <Link
                to="/userprofile"
                className="flex items-center gap-2  w-full p-2 hover:bg-gray-300 hover:text-heading rounded-md"
                onClick={removeDropNavbar}
              >
                <CircleUser className="justify-center items-center w-4 h-4" />
                <span className="font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                className="flex items-center gap-2  w-full p-2 hover:bg-gray-300 hover:text-heading rounded-md"
                onClick={removeDropNavbar}
              >
                <CreditCard className="justify-center items-center w-4 h-4" />
                <span className="font-medium">Billing</span>
              </Link>
            </li>

            {/* modal popup display to allow user logout */}
            <li>
              <button
                onClick={(e) => setModalOpen(true)}
                className="bg-red-600 p-2 my-2 cursor-pointer text-amber-50 hover:opacity-80 hover:text-heading rounded-md"
              >
                Sign out
              </button>
            </li>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
              <div className="justify-center  items-center ">
                <div className="justify-center items-center max-w-70   text-center bg-white p-20 rounded-xl ">
                  <LogOut size={56} className="mx-auto text-red-500" />
                  <div className="mx-auto my-4 ">
                    <h3 className="text-lg font-black text-gray-800">
                      Sign out?
                    </h3>
                    <p className="text-small text-gray-500">
                      Are you sure you want to sign out
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      type="button"
                      className="cursor-pointer focus:outline-none text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </ul>
        </div>
      </div>
    </>
  );
  // navigation links
  return (
    <nav>
      <div>
        <div
          className={
            currentUser
              ? "fixed z-50 w-full  flex justify-between px-3 lg:px-5 py-4 bg-gray-100"
              : "h-10vh flex justify-between px-5 lg:px-20 py-4 bg-zinc-900"
          }
        >
          <div onClick={handleLogo} className="flex items-center ">
            <Link to="/" className="flex text-2xl ">
              <BookOpenText
                className={
                  currentUser
                    ? "h-8 w-10  text-black "
                    : "h-8 w-10  text-amber-50 "
                }
              />
              <div className="flex items-center">
                <span
                  className={
                    currentUser
                      ? "font-medium text-black"
                      : "font-medium text-amber-50"
                  }
                >
                  Learn
                </span>
                <span className="text-amber-400 font-extrabold">Flow</span>
              </div>
            </Link>
          </div>
          {/* when the user is currently logged in */}
          {currentUser ? (
            <>
              <div className="flex space-x-4 justify-center items-center overflow-x-hidden">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="bg-white p-2 rounded-xl flex items-center gap-2.5">
                    {/* user profile photo */}
                    <div className="relative">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                      )}
                      <span className="bottom-0 left-8.5 absolute  w-3 h-3 bg-green-600 border-2 border-amber-50 rounded-full"></span>
                    </div>
                    {/* user profile name */}
                    <div className="font-medium text-heading">
                      <span className="hidden text-sm md:inline">
                        {currentUser.displayName}
                      </span>{" "}
                      <div className="hidden md:block text-sm font-normal text-body">
                        student
                      </div>
                    </div>

                    {/* user profile drop down */}
                    <div>
                      <div ref={dropdownRef}>
                        <div>
                          <EllipsisVertical
                            onClick={toggleMenu}
                            className="cursor-pointer transition"
                          />
                        </div>
                        {isOpen && userProfile}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lg:flex  md:flex  items-center  font-normal hidden">
                <div className="">
                  <ul className="flex items-center text-amber-50 gap-8 lg:mr-10 md:mr-10 mr-16 ">
                    <Link to="/about">
                      <li>About</li>
                    </Link>
                    <Link to="/features">
                      <li>Features</li>
                    </Link>
                    <Link to="/pricing">
                      <li>Pricing</li>
                    </Link>
                  </ul>
                </div>
              </div>
              <div className="lg:flex  md:flex  items-center  font-normal hidden">
                <ul>
                  <Link to="/signup">
                    <li className="border border-amber-400 p-2  text-amber-400 rounded-full hover:opacity-85">
                      Start your learning journey
                    </li>
                  </Link>
                </ul>
              </div>
              {/* mobile view click */}
              <div className="md:hidden">{click && content}</div>
              <button
                onClick={handleClick}
                className="block cursor-pointer md:hidden  transition"
              >
                {click ? (
                  <X className="text-amber-50" />
                ) : (
                  <Menu className="text-amber-50" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
