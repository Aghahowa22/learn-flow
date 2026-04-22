import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
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
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Star,
  Award,
  BookOpen as BookIcon,
  CheckCircle,
  PlayCircle,
  Lock,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";

// main dashboard navigation bar
const Dashboard = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("dashboard");
  // all variable for link routes active state
  const isDashboard = selectedCategory === "dashboard";
  const isCourses = selectedCategory === "courses";
  const isProjects = selectedCategory === "projects";
  const isCourseBuilder = selectedCategory === "coursebuilder";
  const isCalender = selectedCategory === "calender";

  // import useAuth from auth context
  const { currentUser } = useAuth();
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

  // ============ LMS DASHBOARD STATE ============
  const [userStats, setUserStats] = useState({
    totalCourses: 12,
    completedCourses: 0,
    inProgressCourses: 3,
    totalHoursLearned: 47,
    streakDays: 7,
    certificatesEarned: 3,
  });

  // Mock user data as objects - in real app, this would come from API/database
  const userData = {
    name: currentUser?.displayName || "Student",
    preferences: [
      "React",
      "JavaScript",
      "Web Development",
      "UI/UX",
      "C++",
      "Python",
      "Mobile Development",
      "Data Science",
      "Machine Learning",
      "Cloud Computing",
      "Cybersecurity",
      "Game Development",
    ],
    joinDate: "January 2026",
  };

  // Current courses with progress
  const currentCourses = [
    {
      id: 1,
      title: "HTML & CSS Mastery",
      progress: 5,
      lastActivity: "2026-04-15",
      totalLessons: 16,
      completedLessons: 10,
      instructor: "Benochi Nosa",
      category: "Frontend",
      nextLesson: "Advanced CSS Layouts",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      progress: 7,
      lastActivity: "2026-04-14",
      totalLessons: 24,
      completedLessons: 10,
      instructor: "Yuki Promise",
      category: "Programming",
      nextLesson: "ES6+ Features",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 6,
      lastActivity: "2026-04-16",
      totalLessons: 20,
      completedLessons: 16,
      instructor: "EraTech",
      category: "Design",
      nextLesson: "Final Project Review",
    },
  ];

  // Completed courses
  const completedCourses = [
    {
      id: 4,
      title: "JavaScript Fundamentals",
      completedDate: "2026-03-15",
      certificate: true,
      rating: 5,
      instructor: "Yuki Promise",
    },
    {
      id: 5,
      title: "HTML & CSS Mastery",
      completedDate: "2026-03-01",
      certificate: true,
      rating: 4,
      instructor: "Benochi Nosa",
    },
    {
      id: 6,
      title: "Git & Version Control",
      completedDate: "2026-02-20",
      certificate: false,
      rating: 5,
      instructor: "Joshua Kroose",
    },
  ];

  // Course recommendations based on preferences
  const recommendedCourses = [
    {
      id: 7,
      title: "React Native Mobile Development",
      category: "Mobile",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1250,
      price: "$189",
      matchReason: "Based on your React interest",
    },
    {
      id: 8,
      title: "Advanced JavaScript Patterns",
      category: "Programming",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 890,
      price: "$179",
      matchReason: "Matches your JavaScript preference",
    },
    {
      id: 9,
      title: "Modern Web Development",
      category: "Full Stack",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 2100,
      price: "$159",
      matchReason: "Aligns with your web development focus",
    },
    {
      id: 10,
      title: "Python for Data Science",
      category: "Programming",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 1500,
      price: "$199",
      matchReason: "Based on your Python interest",
    },
    {
      id: 11,
      title: "C++ Programming Fundamentals",
      category: "Programming",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 900,
      price: "$189",
      matchReason: "Based on your C++ interest",
    },
    {
      id: 12,
      title: "Cloud Computing with AWS",
      category: "Cloud",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1200,
      price: "$199",
      matchReason: "Based on your cloud computing interest",
    },
    {
      id: 13,
      title: "Machine Learning with Python",
      category: "Data Science",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 1100,
      price: "$159",
      matchReason: "Based on your machine learning interest",
    },
    {
      id: 14,
      title: "Data Visualization with D3.js",
      category: "Data Science",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 800,
      price: "$179",
      matchReason: "Based on your data visualization interest",
    },
    {
      id: 15,
      title: "Cybersecurity Essentials",
      category: "Security",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 950,
      price: "$189",
      matchReason: "Based on your cybersecurity interest",
    },
    {
      id: 16,
      title: "Game Development with Unity",
      category: "Game Development",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1300,
      price: "$159",
      matchReason: "Based on your game development interest",
    },
  ];

  // Earned badges
  const earnedBadges = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first course",
      icon: "🎯",
      earnedDate: "2026-02-15",
      rarity: "Common",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "7-day learning streak",
      icon: "🔥",
      earnedDate: "2026-04-08",
      rarity: "Rare",
    },
    {
      id: 3,
      title: "Certificate Collector",
      description: "Earned 3 certificates",
      icon: "🏆",
      earnedDate: "2026-03-15",
      rarity: "Epic",
    },
    {
      id: 4,
      title: "Code Master",
      description: "Completed 5 programming courses",
      icon: "💻",
      earnedDate: "2026-04-01",
      rarity: "Legendary",
    },
  ];

  // Helper/greeting functions
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Dashboard menu component (kept from original)
  const dashBoardMenu = (
    <>
      <div>
        <aside
          id="default-sidebar"
          className="fixed top-22  left-0 z-40 max-w-60 h-full bg-gray-50  "
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-200 shadow-lg">
            <span className=" float-right cursor-pointer">
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
        <div className=" w-full bg-gray-300">
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
                  to="#"
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
      <div className="ml-5 p-4 md:mt-22 md:ml-64">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-linear-to-r from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {getGreeting()}, {userData.name}! 👋
                </h2>
                <p className="text-gray-600 text-lg">
                  Welcome back to your learning journey. You're doing amazing!
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    Member since {userData.joinDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                    <Zap size={16} />
                    {userStats.streakDays} day streak! 🔥
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <div className="text-4xl mb-2">🎓</div>
                  <p className="text-sm text-gray-600">Keep learning!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Completed Courses
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {userStats.completedCourses}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-600 font-medium">+1 this month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">
                  {userStats.inProgressCourses}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <PlayCircle className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="text-blue-500 mr-1" size={16} />
              <span className="text-blue-600 font-medium">Active learning</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Hours of Learning
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {userStats.totalHoursLearned}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Target className="text-purple-500 mr-1" size={16} />
              <span className="text-purple-600 font-medium">This month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Certificates
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {userStats.certificatesEarned}
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Award className="text-amber-600" size={24} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Trophy className="text-amber-500 mr-1" size={16} />
              <span className="text-amber-600 font-medium">Earned</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  📚 Current Courses
                </h2>
                <Link
                  to="/courses"
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
                >
                  View all <MoveRight size={16} />
                </Link>
              </div>

              <div className="space-y-4">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          by {course.instructor}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookIcon size={14} />
                            {course.completedLessons}/{course.totalLessons}{" "}
                            lessons
                          </span>
                          <span>
                            Last activity: {formatDate(course.lastActivity)}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.category === "Frontend"
                            ? "bg-blue-100 text-blue-800"
                            : course.category === "Backend"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {course.category}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm text-gray-600">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Next:{" "}
                        <span className="font-medium">{course.nextLesson}</span>
                      </p>
                      <Link
                        to="/startingcourse"
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recommended for You
                </h2>
                <span className="text-sm text-gray-500">
                  Based on your preferences
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {course.category} • {course.duration}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Star className="text-yellow-400" size={12} />
                            {course.rating}
                          </span>
                          <span>•</span>
                          <span>
                            {course.students.toLocaleString()} students
                            interested
                          </span>
                        </div>
                        <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block">
                          {course.matchReason}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : course.level === "Intermediate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-600">
                        {course.price}
                      </span>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                        <div className="flex justify-center items-center gap-1">
                          <Lock size={15} /> Coming soon
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Completed Courses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                ✅ Recently Completed
              </h3>
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-base font-medium">
                  Recently completed courses will appear here
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Keep learning and complete courses to see them listed here.
                </p>
              </div>
              <Link
                to="/courses"
                className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1"
              >
                Go to Courses <MoveRight size={16} />
              </Link>
            </div>

            {/* Earned Badges */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🏆 Your Badges
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="text-center p-3 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200"
                  >
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {badge.description}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        badge.rarity === "Common"
                          ? "bg-gray-100 text-gray-700"
                          : badge.rarity === "Rare"
                            ? "bg-blue-100 text-blue-700"
                            : badge.rarity === "Epic"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {badge.rarity}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                {earnedBadges.length} of 12 badges earned
              </p>
            </div>

            {/* Learning Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                🎯 Your Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {userData.preferences.map((preference, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                  >
                    {preference}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Recommendations are personalized based on your interests and
                learning history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
