import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  House,
  BookOpen,
  AppWindow,
  PencilLine,
  CalendarDays,
  MoveRight,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
// repeating dashboard side nav bar UI on the caourse builber route large screen only
const StartingCourse = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("");
  // all variable for link routes active state
  const isDashboard = selectedCategory === "dashboard";
  const isCourses = selectedCategory === "courses";
  const isProjects = selectedCategory === "projects";
  const isCourseBuilder = selectedCategory === "coursebuilder";
  const isCalender = selectedCategory === "calender";
  // import useAuth from auth context
  const { currentUser } = useAuth();
  // useNavigate hook for back navigation
  const navigate = useNavigate();

  // back button click handler
  const handleGoBack = () => {
    navigate(-1);
  };
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
              <li
                onClick={() => setSelectedCategory("dashboard")}
                className={`categories ${isDashboard ? "bg-gray-300 rounded-lg" : ""}`}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center px-2 py-2 text-body rounded-lg hover:bg-gray-300"
                  onClick={removeDashBoard}
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
                  onClick={removeDashBoard}
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
                  onClick={removeDashBoard}
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
                  onClick={removeDashBoard}
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
                  onClick={removeDashBoard}
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
            className="  md:hidden font-medium leading-5  rounded-base  mt-22 text-sm py-3 px-2 cursor-pointer inline-flex"
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
                onClick={() => setSelectedCategory("coursebuilber")}
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
      <div>
        <div className=" ml-5 p-4 md:mt-22 md:ml-64">
          <div>
            {/* Back button */}
            <button
              onClick={handleGoBack}
              className="flex items-center cursor-pointer space-x-2 mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Previous Page</span>
            </button>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Starting your Course
              </h2>
              <p className="text-gray-600 ">
                Welcome to your new course! We're excited to have you on board.
                we expect you to have a great learning experience. and spend a
                lot of time learning and growing. at least 3 to 5 hours per day
                coding and following our tutorial videos. people who code
                daily tend to progress faster. as a beginner it is advisable to
                start with html and css before moving on to more advanced courses
                like JavaScript.you can always ask for help if you get stuck,
                research and jot down notes while watching the videos. click any of
                your enrolled course below to get started.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Your Enrolled Courses</h3>

              {/* Course 1: Html and Css Mastery */}
              <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      🌐
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        HTML and CSS Mastery
                      </h4>
                      <p className="text-sm text-gray-600">
                        Frontend • 6 weeks • Beginner
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-500">(1,250 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: Benochi Nosa
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Build responsive websites with HTML and CSS. Learn modern
                  layout techniques and design principles.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Web
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      Mobile
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/htmlcss"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>

              {/* Course 2: JavaScript Fundamentals */}
              <div className="bg-Linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-500 text-white p-2 rounded-full">
                      JS
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        JavaScript Fundamentals
                      </h4>
                      <p className="text-sm text-gray-600">
                        Programming • 6 weeks • Beginner
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-500">(890 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: Yuki Promise
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Master the basics of JavaScript including variables,
                  functions, arrays, and objects.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      JS
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      Bgn
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/fundamentaljs"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>

              {/* Course 3: UI/UX Design Princples */}
              <div className="bg-Linear-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 text-white p-2 rounded-full">
                      🎨
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        UI/UX Design Principles
                      </h4>
                      <p className="text-sm text-gray-600">
                        Design • 8 weeks • Beginner
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.7</span>
                      <span className="text-gray-500">(2,100 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: EraTech
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Learn the fundamentals of UI/UX design including user
                  research, wireframing, and prototyping.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Design
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                      Bgn
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/uiux"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>

              {/* Course 4: Git and GitHub */}
              <div className="bg-Linear-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 text-white p-2 rounded-full">
                      🗂️
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Git and GitHub (Version Control)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Version Control • 6 weeks • Beginner
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.6</span>
                      <span className="text-gray-500">(1,500 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: Joshua Kroose
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Learn the fundamentals of Git and GitHub for version control.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      Git
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      GitHub
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/github"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>

              {/* Course 5: Advanced React Development */}
              <div className="bg-linear-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white p-2 rounded-full">
                      ⚛️
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Advanced React Development
                      </h4>
                      <p className="text-sm text-gray-600">
                        Programming • 12 weeks • Beginner
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.5</span>
                      <span className="text-gray-500">(900 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: Amen Praise
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Master advanced React concepts including hooks, context,
                  performance optimization, and testing.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      React
                    </span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                      Adv
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/advancedreact"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>

              {/* Course 6: Node.js Backend Mastery*/}
              <div className="bg-linear-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-cyan-500 text-white p-2 rounded-full">
                      🛠️
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        Node.js Backend Mastery
                      </h4>
                      <p className="text-sm text-gray-600">
                        Backend • 10 weeks • Intermediate
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-500">(1,200 students)</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      by: James Iyobosa
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Learn Node.js backend development, Express, MongoDB, and build
                  scalable backend applications.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      B-End
                    </span>
                  </div>
                  <Link
                    to="/startingcourse/nodejsbackend"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Course
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartingCourse;
