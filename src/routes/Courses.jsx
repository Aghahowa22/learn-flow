import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  House,
  BookOpen,
  AppWindow,
  PencilLine,
  CalendarDays,
  MoveRight,
  Menu,
  X,
  PlayCircle,
  CheckCircle,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
  MoreVertical,
  Eye,
  Search,
  Download,
  Share2,
} from "lucide-react";

// repeating dashboard side nav bar UI large screen only
const Courses = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("courses");
  // all variable for link routes active state
  const isDashboard = selectedCategory === "dashboard";
  const isCourses = selectedCategory === "courses";
  const isProjects = selectedCategory === "projects";
  const isCourseBuilder = selectedCategory === "coursebuilder";
  const isCalender = selectedCategory === "calender";
  // import useAuth from auth context
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

  // Course management states
  const [activeTab, setActiveTab] = useState("enrolled");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const recentActivity = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed 'State Management with Redux'",
      course: "Advanced React Development",
      date: "2026-04-09",
      time: "14:30",
      icon: "CheckCircle",
      color: "text-green-600",
    },
    {
      id: 2,
      type: "course_enrolled",
      title: "Enrolled in 'React Native Mobile Development'",
      course: "React Native Mobile Development",
      date: "2026-04-08",
      time: "10:15",
      icon: "BookOpen",
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "certificate_earned",
      title: "Earned certificate for 'JavaScript Fundamentals'",
      course: "JavaScript Fundamentals",
      date: "2026-04-05",
      time: "16:45",
      icon: "Award",
      color: "text-yellow-600",
    },
    {
      id: 4,
      type: "quiz_completed",
      title: "Completed quiz 'DOM Manipulation' with 95%",
      course: "JavaScript Fundamentals",
      date: "2026-04-04",
      time: "11:20",
      icon: "Target",
      color: "text-purple-600",
    },
    {
      id: 5,
      type: "lesson_started",
      title: "Started lesson 'Authentication & Security'",
      course: "Node.js Backend Mastery",
      date: "2026-04-03",
      time: "09:00",
      icon: "PlayCircle",
      color: "text-indigo-600",
    },
    {
      id: 6,
      type: "project_submitted",
      title: "Submitted project 'Personal Portfolio Website'",
      course: "HTML & CSS Mastery",
      date: "2026-04-02",
      time: "15:30",
      icon: "Share2",
      color: "text-orange-600",
    },
  ];

  // Helper functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "lesson_completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "course_enrolled":
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case "certificate_earned":
        return <Award className="w-5 h-5 text-yellow-600" />;
      case "quiz_completed":
        return <Target className="w-5 h-5 text-purple-600" />;
      case "lesson_started":
        return <PlayCircle className="w-5 h-5 text-indigo-600" />;
      case "project_submitted":
        return <Share2 className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  // Helper function to check if a course matches search criteria
  const courseMatchesSearch = (title, instructor) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(searchLower) ||
      instructor.toLowerCase().includes(searchLower)
    );
  };

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
                  to="#"
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
                  to="#"
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
        <div className="ml-5 p-4 md:mt-22 md:ml-64">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              My Courses
            </h2>
            <p className="text-gray-600">
              Track your learning progress and manage your enrolled courses
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg border-gray-300 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enrolled</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border-gray-300 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border-gray-300 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg border-gray-300 p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      recentActivity.filter((activity) => {
                        const activityDate = new Date(activity.date);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return activityDate >= weekAgo;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-lg border-gray-300 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="mobile">Mobile</option>
                  <option value="data science">Data Science</option>
                  <option value="full stack">Full Stack</option>
                  <option value="tools">Tools</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg border-gray-300 mb-6">
            <div className="border-b border-gray-200">
              <nav className="md:flex">
                <button
                  onClick={() => setActiveTab("enrolled")}
                  className={`px-6 py-4 text-sm font-medium cursor-pointer border-b-2 ${
                    activeTab === "enrolled"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  All Enrolled (6)
                </button>
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-6 py-4 text-sm font-medium cursor-pointer border-b-2 ${
                    activeTab === "active"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Active Courses (3)
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-6 py-4 text-sm font-medium cursor-pointer border-b-2 ${
                    activeTab === "completed"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Completed Courses (0)
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-6 py-4 text-sm font-medium cursor-pointer border-b-2 ${
                    activeTab === "activity"
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Recent Activity
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* All Enrolled Courses Tab */}
              {activeTab === "enrolled" && (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Course 1: HTML & CSS */}
                  {courseMatchesSearch(
                    "HTML & CSS Fundamentals",
                    "Benochi Nosa",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop"
                          alt="HTML & CSS Fundamentals"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-blue-100">
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.8
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          HTML & CSS Fundamentals
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Benochi Nosa
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>8 hours</span>
                          <span>Enrolled: {formatDate("2024-01-15")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/htmlcss"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 2: JavaScript */}
                  {courseMatchesSearch(
                    "JavaScript Mastery",
                    "Yuki Promise",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop"
                          alt="JavaScript Mastery"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-gray-100">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.9
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          JavaScript Mastery
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Yuki Promise
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>12 hours</span>
                          <span>Enrolled: {formatDate("2024-01-20")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/fundamentaljs"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 3: UI/UX Design */}
                  {courseMatchesSearch(
                    "UI/UX Design Principles",
                    "EraTech",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
                          alt="UI/UX Design Principles"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-green-100">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.7
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          UI/UX Design Principles
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by EraTech
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>10 hours</span>
                          <span>Enrolled: {formatDate("2024-01-10")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/uiux"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 4: Git & GitHub */}
                  {courseMatchesSearch(
                    "Git & GitHub Essentials",
                    "Joshua Kroose",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
                          alt="Git & GitHub Essentials"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-blue-100">
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.6
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          Git & GitHub Essentials
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Joshua Kroose
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>6 hours</span>
                          <span>Enrolled: {formatDate("2024-01-25")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/github"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 5: React Native */}
                  {courseMatchesSearch(
                    "React Native Development",
                    "Amen Praise",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
                          alt="React Native Development"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-gray-100">
                            <Clock className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.8
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          React Native Development
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Amen Praise
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>15 hours</span>
                          <span>Enrolled: {formatDate("2024-02-01")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/advancedreact"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 6: Node.js */}
                  {courseMatchesSearch(
                    "Node.js Backend Development",
                    "James Iyobosa",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop"
                          alt="Node.js Backend Development"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-green-100">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-gray-600 bg-gray-100">
                            Start Learning
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.9
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          Node.js Backend Development
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by James Iyobosa
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>14 hours</span>
                          <span>Enrolled: {formatDate("2024-01-05")}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/nodejsbackend"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
                          >
                            Start Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No results message when search doesn't match any courses */}
              {activeTab === "enrolled" &&
                searchTerm &&
                !(
                  courseMatchesSearch(
                    "HTML & CSS Fundamentals",
                    "Sarah Johnson",
                  ) ||
                  courseMatchesSearch("JavaScript Mastery", "Michael Chen") ||
                  courseMatchesSearch(
                    "UI/UX Design Principles",
                    "Emily Rodriguez",
                  ) ||
                  courseMatchesSearch("Git & GitHub Essentials", "David Kim") ||
                  courseMatchesSearch(
                    "React Native Development",
                    "Lisa Wang",
                  ) ||
                  courseMatchesSearch(
                    "Node.js Backend Development",
                    "Alex Thompson",
                  )
                ) && (
                  <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                    <p className="text-gray-600 text-base">
                      No courses found matching "{searchTerm}".
                    </p>
                  </div>
                )}

              {/* Active Courses Tab */}
              {activeTab === "active" && (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Course 1: HTML & CSS (Active) */}
                  {courseMatchesSearch(
                    "HTML & CSS Fundamentals",
                    "Sarah Johnson",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=300&fit=crop"
                          alt="HTML & CSS Fundamentals"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-blue-100">
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-blue-600 bg-blue-100">
                            In Progress
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.8
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          HTML & CSS Fundamentals
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Sarah Johnson
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>8 hours</span>
                          <span>Enrolled: {formatDate("2024-01-15")}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>5%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "5%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/htmlcss"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 2: JavaScript (Active) */}
                  {courseMatchesSearch(
                    "JavaScript Mastery",
                    "Michael Chen",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop"
                          alt="JavaScript Mastery"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-blue-100">
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-blue-600 bg-blue-100">
                            In Progress
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.9
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          JavaScript Mastery
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Michael Chen
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>12 hours</span>
                          <span>Enrolled: {formatDate("2024-01-20")}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>7%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "7%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/fundamentaljs"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Course 3: UI/UX Design (Active) */}
                  {courseMatchesSearch(
                    "UI/UX Design Principles",
                    "Emily Rodriguez",
                  ) && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
                          alt="UI/UX Design Principles"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <div className="rounded-full p-2 bg-blue-100">
                            <PlayCircle className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full text-blue-600 bg-blue-100">
                            In Progress
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              4.7
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          UI/UX Design Principles
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          by Emily Rodriguez
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>10 hours</span>
                          <span>Enrolled: {formatDate("2024-01-10")}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>6%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "6%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/startingcourse/uiux"
                            className="flex-1 py-2 px-4 rounded-lg transition-colors text-sm cursor-pointer font-medium inline-flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Continue
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* No active courses message when no courses are in progress */}
              {activeTab === "active" &&
                !(
                  courseMatchesSearch(
                    "HTML & CSS Fundamentals",
                    "Sarah Johnson",
                  ) ||
                  courseMatchesSearch("JavaScript Mastery", "Michael Chen") ||
                  courseMatchesSearch(
                    "UI/UX Design Principles",
                    "Emily Rodriguez",
                  )
                ) && (
                  <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                    <p className="text-gray-600 text-base">
                      No active courses. Start learning to see your progress
                      here!
                    </p>
                  </div>
                )}

              {/* Completed Courses Tab */}
              {activeTab === "completed" && (
                <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-base font-medium">
                      Your completed courses will appear here
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Keep learning and mark courses as complete to see them
                      listed here.
                    </p>
                  </div>
                </div>
              )}

              {/* Recent Activity Tab */}
              {activeTab === "activity" && (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {activity.course}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(activity.date)} at {activity.time}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
