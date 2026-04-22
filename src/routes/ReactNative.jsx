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
  Star,
  Heart,
  MessageCircle,
  CheckCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  User,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";
// repeating dashboard side nav bar UI on the caourse builber route large screen only
const ReactNative = () => {
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

  // Video player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [likes, setLikes] = useState(1356);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [success, setSuccess] = useState("");
  const [courseSuccess, setCourseSuccess] = useState("");
  const [iframeSrc, setIframeSrc] = useState(
    "https://www.youtube.com/embed/0-S5a0eXPoc?rel=0",
  );
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

  // back button click handler
  const handleGoBack = () => {
    navigate(-1);
  };

  // Embedded YouTube player controls
  const togglePlay = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    const muteParam = isMuted ? "&mute=1" : "";
    const autoplayParam = nextIsPlaying ? "&autoplay=1" : "";
    setIframeSrc(
      `https://www.youtube.com/embed/0-S5a0eXPoc?rel=0${autoplayParam}${muteParam}`,
    );
  };

  const toggleMute = () => {
    const nextIsMuted = !isMuted;
    setIsMuted(nextIsMuted);
    const autoplayParam = isPlaying ? "&autoplay=1" : "";
    const muteParam = nextIsMuted ? "&mute=1" : "";
    setIframeSrc(
      `https://www.youtube.com/embed/0-S5a0eXPoc?rel=0${autoplayParam}${muteParam}`,
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setCourseSuccess(
      "Congratulations! You've completed the React Native course!",
    );
    setTimeout(() => setCourseSuccess(""), 3000);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return setCommentError("Comment cannot be empty");
    }
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
      setSuccess("Comment added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
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
          {/* Back button */}
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer space-x-2 mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Courses</span>
          </button>

          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              React Native Mastery
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium">4.9</span>
                <span>(2,890 reviews)</span>
              </div>
              <span>•</span>
              <span>8 weeks • Intermediate Level</span>
              <span>•</span>
              <span>by Amen Praise </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player Section */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl mb-6">
                <div className="relative">
                  <iframe
                    className="w-full h-96 lg:h-130"
                    src={iframeSrc}
                    title="React Native Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                  {/* Embedded Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </button>

                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX size={20} />
                          ) : (
                            <Volume2 size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* course success display */}
              <div>
                {courseSuccess && (
                  <div className="flex items-center my-4 gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-green-800 text-sm">
                      {courseSuccess}
                    </span>
                  </div>
                )}
              </div>

              {/* Course Description */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Course Overview
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Master cross-platform mobile development with React Native.
                  Build native iOS and Android apps using JavaScript and React.
                  This comprehensive course covers everything from setting up
                  your development environment to deploying production-ready
                  applications to app stores.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">32</div>
                    <div className="text-sm text-gray-600">Video Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">35M</div>
                    <div className="text-sm text-gray-600">Total Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">∞</div>
                    <div className="text-sm text-gray-600">Lifetime Access</div>
                  </div>
                </div>
              </div>

              {/* Complete Button */}
              {!isCompleted && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          Ready to Complete?
                        </h3>
                        <p className="text-blue-700">
                          Mark this lesson as completed to track your progress.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleComplete}
                      className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              )}

              {isCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-900">
                          Course Completed!
                        </h3>
                        <p className="text-green-700">
                          Congratulations on finishing this lesson.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleComplete}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Completed ✓
                    </button>
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Comments
                </h3>

                {/* Add Comment */}
                <div className="mb-6">
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        name="commentarea"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts about this course..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={handleAddComment}
                          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Error/Success Messages */}
                  {commentError && (
                    <div className="flex items-center my-4 gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="text-red-800 text-sm">
                        {commentError}
                      </span>
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center my-4 gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-green-800 text-sm">{success}</span>
                    </div>
                  )}
                </div>

                {/* Sample Comments */}
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">AJ</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          Alex Johnson
                        </span>
                        <span className="text-gray-500 text-sm">
                          3 hours ago
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Excellent course! The React Native navigation patterns
                        really helped me build my first app. Highly recommended!
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">15</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">SM</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          Sarah Mitchell
                        </span>
                        <span className="text-gray-500 text-sm">1 day ago</span>
                      </div>
                      <p className="text-gray-700">
                        The Expo setup and deployment sections were incredibly
                        helpful. Saved me so much time getting started with
                        mobile development.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">22</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">RK</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          Ryan Kim
                        </span>
                        <span className="text-gray-500 text-sm">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Great coverage of state management with Redux Toolkit.
                        The async storage and API integration examples are spot
                        on.
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">18</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Rating & Likes */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Course Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">4.9 Rating</span>
                    </div>
                    <span className="text-gray-500">2,890 reviews</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart
                        className={`w-5 h-5 ${isLiked ? "text-red-500 fill-current" : "text-gray-400"} cursor-pointer`}
                        onClick={handleLike}
                      />
                      <span className="font-medium">
                        {likes.toLocaleString()} Likes
                      </span>
                    </div>
                    <button
                      onClick={handleLike}
                      className={`px-3 py-1 rounded-full cursor-pointer text-sm font-medium ${
                        isLiked
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isLiked ? "Liked" : "Like"}
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">124 Comments</span>
                  </div>
                </div>
              </div>

              {/* Course Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Progress
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Completed Lessons</span>
                    <span>1 / 32</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Keep going! You're making great progress.
                  </p>
                </div>
              </div>

              {/* Course Instructor */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Instructor
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">AP</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Amen Praise</h4>
                    <p className="text-gray-600 text-sm">
                      Mobile App Developer
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        4.9 (1,250 reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactNative;
