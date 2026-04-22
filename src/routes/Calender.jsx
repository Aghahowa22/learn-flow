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
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

// repeated dashboard side navigation bar on the calender route large screen only
const Calender = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("calender");
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

  // ============ CALENDAR STATE ============
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "React Workshop",
      date: new Date(2026, 3, 15), // April 15, 2026
      time: "10:00 AM",
      location: "Online",
      description: "Learn advanced React concepts",
      type: "workshop",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Team Meeting",
      date: new Date(2026, 3, 18), // April 18, 2026
      time: "2:00 PM",
      location: "Conference Room A",
      description: "Weekly team sync",
      type: "meeting",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Project Deadline",
      date: new Date(2026, 3, 25), // April 25, 2026
      time: "11:59 PM",
      location: "Remote",
      description: "Submit final project deliverables",
      type: "deadline",
      color: "bg-red-500"
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: "",
    time: "",
    location: "",
    description: "",
    type: "meeting",
    color: "bg-blue-500"
  });

  // Calendar navigation
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get calendar data
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add previous month's days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
        events: []
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(event =>
        event.date.toDateString() === date.toDateString()
      );
      days.push({
        date,
        isCurrentMonth: true,
        events: dayEvents
      });
    }

    // Add next month's days to fill the grid
    const remainingCells = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        events: []
      });
    }

    return days;
  };

  const calendarDays = getDaysInMonth(currentDate);

  // Event management
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const openEventModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        title: event.title,
        time: event.time,
        location: event.location,
        description: event.description,
        type: event.type,
        color: event.color
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        title: "",
        time: "",
        location: "",
        description: "",
        type: "meeting",
        color: "bg-blue-500"
      });
    }
    setShowEventModal(true);
  };

  const saveEvent = () => {
    if (!eventForm.title.trim()) return;

    const eventData = {
      ...eventForm,
      date: selectedDate,
      id: editingEvent ? editingEvent.id : Date.now()
    };

    if (editingEvent) {
      setEvents(events.map(event =>
        event.id === editingEvent.id ? eventData : event
      ));
    } else {
      setEvents([...events, eventData]);
    }

    setShowEventModal(false);
    setEditingEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowEventModal(false);
  };

  const selectedDateEvents = events.filter(event =>
    event.date.toDateString() === selectedDate.toDateString()
  );

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
                  to="#"
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
                  to="#"
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
      <div className=" ml-5 p-4 md:mt-22 md:ml-64">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            {/* <CalendarDays className="text-amber-500" size={32} /> */}
            Calendar & Events
          </h2>
          <p className="text-gray-600">Manage your schedule, upcoming events and courses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-linear-to-r from-amber-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="text-xl font-bold">
                      {currentDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </h3>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 bg-gray-50 border-b">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-4 text-center font-semibold text-gray-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day.date)}
                    className={`min-h-30 p-2 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      day.date.toDateString() === selectedDate.toDateString()
                        ? 'bg-amber-50 border-amber-300'
                        : ''
                    } ${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      day.date.toDateString() === new Date().toDateString()
                        ? 'bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center'
                        : ''
                    }`}>
                      {day.date.getDate()}
                    </div>

                    {/* Events for this day */}
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {day.events.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{day.events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* Selected Date Header */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <button
                  onClick={() => openEventModal()}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Event
                </button>
              </div>

              {/* Events List */}
              <div className="space-y-3">
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarDays size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No events scheduled</p>
                  </div>
                ) : (
                  selectedDateEvents.map(event => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openEventModal(event)}
                    >
                      <div className={`w-3 h-3 rounded-full ${event.color} mb-2`}></div>
                      <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">This Month</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Events:</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meetings:</span>
                    <span className="font-medium">
                      {events.filter(e => e.type === 'meeting').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Workshops:</span>
                    <span className="font-medium">
                      {events.filter(e => e.type === 'workshop').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingEvent ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      id="text"
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        id="time"
                        type="time"
                        value={eventForm.time}
                        onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <select
                        id="type"
                        value={eventForm.type}
                        onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="workshop">Workshop</option>
                        <option value="deadline">Deadline</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter location"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-amber-500 focus:border-transparent h-20 resize-none"
                      placeholder="Enter event description"
                    />
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </p>
                    <div className="flex gap-2">
                      {[
                        'bg-blue-500', 'bg-green-500', 'bg-red-500',
                        'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'
                      ].map(color => (
                        <button
                          key={color}
                          onClick={() => setEventForm({...eventForm, color})}
                          className={`w-8 h-8 rounded-full ${color} ${
                            eventForm.color === color ? 'ring-2 ring-gray-400' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  {editingEvent && (
                    <button
                      onClick={() => deleteEvent(editingEvent.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEvent}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingEvent ? 'Update' : 'Save'} Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender;
