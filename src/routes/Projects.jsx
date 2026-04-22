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
  Code,
  Clock,
  Star,
  Filter,
  Search,
  ExternalLink,
  Github,
  Play,
  Zap,
  Target,
  Award,
  Lock,
  LockKeyhole
} from "lucide-react";

// repeating dashboard nav side bar UI large screen only
const Projects = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("projects");
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

  // ============ PROJECTS STATE ============
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Project data organized by difficulty level
  const projectsData = {
    beginner: [
      {
        id: 1,
        title: "Todo List App",
        description: "Build a simple todo list with add, edit, delete, and mark as complete functionality.",
        difficulty: "Beginner",
        estimatedTime: "2-3 hours",
        technologies: ["React", "CSS", "Local Storage"],
        features: ["Add tasks", "Mark complete", "Delete tasks", "Local storage"],
        icon: "📝",
        color: "from-green-400 to-green-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 2,
        title: "Weather App",
        description: "Create a weather application that displays current weather and forecast using a weather API.",
        difficulty: "Beginner",
        estimatedTime: "4-5 hours",
        technologies: ["React", "API Integration", "CSS"],
        features: ["Current weather", "5-day forecast", "Location search", "Responsive design"],
        icon: "🌤️",
        color: "from-blue-400 to-blue-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 3,
        title: "Calculator",
        description: "Build a fully functional calculator with basic arithmetic operations.",
        difficulty: "Beginner",
        estimatedTime: "3-4 hours",
        technologies: ["React", "CSS", "JavaScript"],
        features: ["Basic operations", "Clear function", "Decimal support", "Keyboard input"],
        icon: "🧮",
        color: "from-purple-400 to-purple-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 4,
        title: "Recipe Finder",
        description: "Create an app to search and display recipes using a recipe API.",
        difficulty: "Beginner",
        estimatedTime: "4-6 hours",
        technologies: ["React", "API Integration", "CSS"],
        features: ["Recipe search", "Ingredient filter", "Recipe details", "Favorites"],
        icon: "🍳",
        color: "from-orange-400 to-orange-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cyber Security Projects
      {
        id: 5,
        title: "Password Strength Checker",
        description: "Build a tool that analyzes password strength and provides security recommendations.",
        difficulty: "Beginner",
        estimatedTime: "3-4 hours",
        technologies: ["JavaScript", "HTML", "CSS", "Regex"],
        features: ["Password analysis", "Strength scoring", "Security tips", "Real-time feedback"],
        icon: "🔐",
        color: "from-red-400 to-red-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 6,
        title: "Basic Encryption Tool",
        description: "Create a simple encryption/decryption tool using Caesar cipher and basic algorithms.",
        difficulty: "Beginner",
        estimatedTime: "4-5 hours",
        technologies: ["Python", "Cryptography", "CLI"],
        features: ["Text encryption", "Decryption", "Multiple algorithms", "File handling"],
        icon: "🔒",
        color: "from-yellow-400 to-yellow-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cloud Computing Projects
      {
        id: 7,
        title: "File Upload to Cloud",
        description: "Build a simple file upload application that stores files in cloud storage.",
        difficulty: "Beginner",
        estimatedTime: "3-4 hours",
        technologies: ["React", "Firebase Storage", "File API"],
        features: ["File upload", "Progress tracking", "File management", "Download links"],
        icon: "☁️",
        color: "from-blue-400 to-blue-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Data Analytics Projects
      {
        id: 8,
        title: "CSV Data Visualizer",
        description: "Create a tool that reads CSV files and displays data in charts and graphs.",
        difficulty: "Beginner",
        estimatedTime: "4-6 hours",
        technologies: ["Python", "Pandas", "Matplotlib", "Tkinter"],
        features: ["CSV parsing", "Data visualization", "Basic statistics", "Export charts"],
        icon: "📊",
        color: "from-green-400 to-green-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Python Projects
      {
        id: 9,
        title: "Personal Budget Tracker",
        description: "Build a command-line application to track personal expenses and income.",
        difficulty: "Beginner",
        estimatedTime: "3-4 hours",
        technologies: ["Python", "CSV", "DateTime"],
        features: ["Expense tracking", "Income logging", "Monthly reports", "Data persistence"],
        icon: "💰",
        color: "from-emerald-400 to-emerald-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Game Development Projects
      {
        id: 10,
        title: "Snake Game",
        description: "Create the classic Snake game with score tracking and increasing difficulty.",
        difficulty: "Beginner",
        estimatedTime: "4-6 hours",
        technologies: ["Python", "Pygame"],
        features: ["Game mechanics", "Score system", "Collision detection", "Progressive difficulty"],
        icon: "🐍",
        color: "from-lime-400 to-lime-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // C++ Projects
      {
        id: 11,
        title: "Basic Calculator",
        description: "Build a console-based calculator with basic arithmetic operations.",
        difficulty: "Beginner",
        estimatedTime: "2-3 hours",
        technologies: ["C++", "Console I/O"],
        features: ["Arithmetic operations", "Input validation", "Error handling", "Menu system"],
        icon: "🔢",
        color: "from-cyan-400 to-cyan-600",
        demoUrl: "#",
        githubUrl: "#"
      }
    ],
    intermediate: [
      {
        id: 5,
        title: "E-commerce Store",
        description: "Build a complete e-commerce application with shopping cart and checkout.",
        difficulty: "Intermediate",
        estimatedTime: "10-15 hours",
        technologies: ["React", "Context API", "React Router", "CSS"],
        features: ["Product catalog", "Shopping cart", "Checkout process", "Order history"],
        icon: "🛒",
        color: "from-indigo-400 to-indigo-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 6,
        title: "Social Media Dashboard",
        description: "Create a dashboard to manage multiple social media accounts with analytics.",
        difficulty: "Intermediate",
        estimatedTime: "12-18 hours",
        technologies: ["React", "Charts.js", "API Integration", "CSS"],
        features: ["Analytics charts", "Post scheduling", "Account management", "Real-time updates"],
        icon: "📊",
        color: "from-cyan-400 to-cyan-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 7,
        title: "Task Management App",
        description: "Build a comprehensive task management app with drag-and-drop functionality.",
        difficulty: "Intermediate",
        estimatedTime: "8-12 hours",
        technologies: ["React", "React DnD", "Context API", "CSS"],
        features: ["Drag & drop", "Multiple boards", "Task assignment", "Due dates"],
        icon: "📋",
        color: "from-teal-400 to-teal-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 8,
        title: "Music Player",
        description: "Create a music player with playlist management and audio controls.",
        difficulty: "Intermediate",
        estimatedTime: "6-10 hours",
        technologies: ["React", "HTML5 Audio", "CSS", "Local Storage"],
        features: ["Audio playback", "Playlists", "Progress bar", "Volume control"],
        icon: "🎵",
        color: "from-pink-400 to-pink-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cyber Security Projects
      {
        id: 9,
        title: "Network Scanner",
        description: "Build a network scanning tool that detects active hosts and open ports.",
        difficulty: "Intermediate",
        estimatedTime: "8-12 hours",
        technologies: ["Python", "Scapy", "Socket Programming"],
        features: ["Host discovery", "Port scanning", "Service detection", "Report generation"],
        icon: "🔍",
        color: "from-red-400 to-red-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 10,
        title: "Password Manager",
        description: "Create a secure password manager with encryption and password generation.",
        difficulty: "Intermediate",
        estimatedTime: "10-15 hours",
        technologies: ["Python", "Cryptography", "SQLite", "Tkinter"],
        features: ["Password storage", "Encryption", "Password generator", "Secure vault"],
        icon: "🗝️",
        color: "from-purple-400 to-purple-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cloud Computing Projects
      {
        id: 11,
        title: "Serverless File Processor",
        description: "Build a serverless application that processes uploaded files in the cloud.",
        difficulty: "Intermediate",
        estimatedTime: "12-18 hours",
        technologies: ["AWS Lambda", "S3", "API Gateway", "Python"],
        features: ["File upload", "Serverless processing", "Cloud storage", "API endpoints"],
        icon: "⚡",
        color: "from-orange-400 to-orange-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Data Analytics Projects
      {
        id: 12,
        title: "Sales Dashboard",
        description: "Create an interactive dashboard for sales data analysis with multiple visualizations.",
        difficulty: "Intermediate",
        estimatedTime: "10-14 hours",
        technologies: ["Python", "Pandas", "Plotly", "Dash"],
        features: ["Data visualization", "Interactive charts", "Filtering", "Export reports"],
        icon: "📈",
        color: "from-blue-400 to-blue-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Machine Learning Projects
      {
        id: 13,
        title: "Image Classification App",
        description: "Build an application that classifies images using pre-trained machine learning models.",
        difficulty: "Intermediate",
        estimatedTime: "8-12 hours",
        technologies: ["Python", "TensorFlow", "Flask", "OpenCV"],
        features: ["Image upload", "Model prediction", "Confidence scores", "Web interface"],
        icon: "🖼️",
        color: "from-indigo-400 to-indigo-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Python Projects
      {
        id: 14,
        title: "Web Scraper",
        description: "Create a web scraping tool that extracts data from websites and stores it in a database.",
        difficulty: "Intermediate",
        estimatedTime: "6-10 hours",
        technologies: ["Python", "BeautifulSoup", "Requests", "SQLite"],
        features: ["Data extraction", "Multiple sites", "Data cleaning", "Database storage"],
        icon: "🕷️",
        color: "from-gray-400 to-gray-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Game Development Projects
      {
        id: 15,
        title: "2D Platformer Game",
        description: "Develop a 2D platformer game with levels, enemies, and power-ups.",
        difficulty: "Intermediate",
        estimatedTime: "15-20 hours",
        technologies: ["Python", "Pygame", "Sprite Animation"],
        features: ["Character movement", "Level design", "Enemy AI", "Power-ups"],
        icon: "🎮",
        color: "from-teal-400 to-teal-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // C++ Projects
      {
        id: 16,
        title: "File System Simulator",
        description: "Build a file system simulator with directory management and file operations.",
        difficulty: "Intermediate",
        estimatedTime: "10-15 hours",
        technologies: ["C++", "File I/O", "Data Structures"],
        features: ["Directory operations", "File management", "Search functionality", "Permissions"],
        icon: "📁",
        color: "from-amber-400 to-amber-600",
        demoUrl: "#",
        githubUrl: "#"
      }
    ],
    professional: [
      {
        id: 9,
        title: "Real-time Chat Application",
        description: "Build a full-featured chat app with real-time messaging and user authentication.",
        difficulty: "Professional",
        estimatedTime: "20-30 hours",
        technologies: ["React", "Firebase", "WebSocket", "Context API"],
        features: ["Real-time messaging", "User auth", "Chat rooms", "File sharing"],
        icon: "💬",
        color: "from-red-400 to-red-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 10,
        title: "Project Management Tool",
        description: "Create a comprehensive project management tool with team collaboration features.",
        difficulty: "Professional",
        estimatedTime: "25-35 hours",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
        features: ["Team management", "Project tracking", "Time tracking", "File collaboration"],
        icon: "🚀",
        color: "from-violet-400 to-violet-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 11,
        title: "Video Streaming Platform",
        description: "Build a video streaming platform with user uploads and video management.",
        difficulty: "Professional",
        estimatedTime: "30-40 hours",
        technologies: ["React", "Video.js", "Cloud Storage", "Authentication"],
        features: ["Video upload", "Streaming", "User profiles", "Comments system"],
        icon: "🎥",
        color: "from-emerald-400 to-emerald-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 12,
        title: "Learning Management System",
        description: "Create a complete LMS with courses, quizzes, and progress tracking.",
        difficulty: "Professional",
        estimatedTime: "35-45 hours",
        technologies: ["React", "Node.js", "Database", "Authentication"],
        features: ["Course creation", "Quiz system", "Progress tracking", "Certificate generation"],
        icon: "🎓",
        color: "from-amber-400 to-amber-600",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cyber Security Projects
      {
        id: 13,
        title: "Vulnerability Scanner",
        description: "Develop a comprehensive vulnerability scanner that checks for common security issues.",
        difficulty: "Professional",
        estimatedTime: "25-35 hours",
        technologies: ["Python", "Nmap", "OpenVAS", "PostgreSQL"],
        features: ["Vulnerability detection", "Risk assessment", "Reporting", "Automated scanning"],
        icon: "🛡️",
        color: "from-red-500 to-red-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      {
        id: 14,
        title: "Secure API Gateway",
        description: "Build a secure API gateway with authentication, rate limiting, and request validation.",
        difficulty: "Professional",
        estimatedTime: "30-40 hours",
        technologies: ["Go", "Redis", "JWT", "Docker"],
        features: ["API authentication", "Rate limiting", "Request validation", "Logging"],
        icon: "🚪",
        color: "from-purple-500 to-purple-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Cloud Computing Projects
      {
        id: 15,
        title: "Microservices Architecture",
        description: "Design and implement a microservices-based application with service discovery and orchestration.",
        difficulty: "Professional",
        estimatedTime: "40-50 hours",
        technologies: ["Kubernetes", "Docker", "Spring Boot", "RabbitMQ"],
        features: ["Service discovery", "Load balancing", "Monitoring", "CI/CD pipeline"],
        icon: "🏗️",
        color: "from-orange-500 to-orange-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Data Analytics Projects
      {
        id: 16,
        title: "Big Data Analytics Platform",
        description: "Create a big data analytics platform with real-time processing and advanced visualizations.",
        difficulty: "Professional",
        estimatedTime: "35-45 hours",
        technologies: ["Apache Spark", "Kafka", "Elasticsearch", "Kibana"],
        features: ["Real-time processing", "Data pipelines", "Advanced analytics", "Interactive dashboards"],
        icon: "📊",
        color: "from-blue-500 to-blue-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Machine Learning Projects
      {
        id: 17,
        title: "Computer Vision System",
        description: "Build an advanced computer vision system with object detection and image recognition.",
        difficulty: "Professional",
        estimatedTime: "30-40 hours",
        technologies: ["Python", "TensorFlow", "OpenCV", "CUDA"],
        features: ["Object detection", "Image recognition", "Real-time processing", "Model training"],
        icon: "👁️",
        color: "from-indigo-500 to-indigo-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Python Projects
      {
        id: 18,
        title: "Distributed Computing Framework",
        description: "Develop a distributed computing framework for parallel processing of large datasets.",
        difficulty: "Professional",
        estimatedTime: "35-45 hours",
        technologies: ["Python", "Dask", "Redis", "Docker"],
        features: ["Parallel processing", "Task scheduling", "Fault tolerance", "Scalability"],
        icon: "🔗",
        color: "from-gray-500 to-gray-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // Game Development Projects
      {
        id: 19,
        title: "3D Game Engine",
        description: "Create a custom 3D game engine with physics, rendering, and game logic systems.",
        difficulty: "Professional",
        estimatedTime: "50-60 hours",
        technologies: ["C++", "OpenGL", "Bullet Physics", "SDL"],
        features: ["3D rendering", "Physics simulation", "Game systems", "Asset management"],
        icon: "🎯",
        color: "from-teal-500 to-teal-700",
        demoUrl: "#",
        githubUrl: "#"
      },
      // C++ Projects
      {
        id: 20,
        title: "High-Performance Database",
        description: "Build a high-performance database system with indexing, transactions, and query optimization.",
        difficulty: "Professional",
        estimatedTime: "45-55 hours",
        technologies: ["C++", "B-Tree", "Memory Management", "Concurrency"],
        features: ["Database operations", "Indexing", "Transactions", "Query optimization"],
        icon: "💾",
        color: "from-amber-500 to-amber-700",
        demoUrl: "#",
        githubUrl: "#"
      }
    ]
  };

  // Get filtered projects based on selected level and search term
  const getFilteredProjects = () => {
    let allProjects = [];
    if (selectedLevel === "all") {
      allProjects = [...projectsData.beginner, ...projectsData.intermediate, ...projectsData.professional];
    } else {
      allProjects = projectsData[selectedLevel] || [];
    }

    return allProjects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const filteredProjects = getFilteredProjects();

  // Get difficulty level stats
  const getLevelStats = (level) => {
    return projectsData[level]?.length || 0;
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
                  to="#"
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
                  to="#"
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
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              {/* <Code className="text-amber-500" size={40} /> */}
              LearnFlow Project Ideas
            </h2>
            <p className="text-gray-600 text-lg">
              Master Coding with projects ranging from beginner to
              professional level
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Star className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Beginner</p>
                  <p className="text-2xl font-bold text-green-800">
                    {getLevelStats("beginner")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-green-600">
                Perfect for getting started
              </p>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Zap className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Intermediate
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {getLevelStats("intermediate")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-blue-600">Build your skills further</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Award className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    Professional
                  </p>
                  <p className="text-2xl font-bold text-purple-800">
                    {getLevelStats("professional")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-purple-600">
                Advanced real-world projects
              </p>
            </div>

            <div className="bg-linear-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Target className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-700">Total</p>
                  <p className="text-2xl font-bold text-amber-800">
                    {getLevelStats("beginner") +
                      getLevelStats("intermediate") +
                      getLevelStats("professional")}
                  </p>
                </div>
              </div>
              <p className="text-xs text-amber-600">Projects to choose from</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedLevel("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === "all"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setSelectedLevel("beginner")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === "beginner"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setSelectedLevel("intermediate")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === "intermediate"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setSelectedLevel("professional")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === "professional"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Professional
                </button>
              </div>

              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  name="text"
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Header */}
                <div
                  className={`bg-linear-to-r ${project.color} p-6 text-white`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{project.icon}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.difficulty === "Beginner"
                          ? "bg-green-500/20 text-green-100"
                          : project.difficulty === "Intermediate"
                            ? "bg-blue-500/20 text-blue-100"
                            : "bg-purple-500/20 text-purple-100"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {project.estimatedTime}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className="text-gray-500">
                          +{project.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Play size={16} />
                      Start Project
                    </button>
                    <button className="p-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                      <Github size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Code size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Project Detail Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{selectedProject.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedProject.title}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                            selectedProject.difficulty === "Beginner"
                              ? "bg-green-100 text-green-800"
                              : selectedProject.difficulty === "Intermediate"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {selectedProject.difficulty}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Project Overview
                      </h4>
                      <p className="text-gray-600">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Project Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Clock className="text-gray-400" size={20} />
                            <div>
                              <p className="font-medium text-gray-900">
                                Estimated Time
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedProject.estimatedTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Code className="text-gray-400" size={20} />
                            <div>
                              <p className="font-medium text-gray-900">
                                Difficulty
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedProject.difficulty}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sm:flex gap-3 pt-4 border-t border-gray-200 text-xs">
                      <button
                        disabled
                        className=" bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <LockKeyhole size={18} />
                        Figma soon
                      </button>
                      <div className="sm:py-0 py-3"> 
                        <button
                          disabled
                          className=" px-6  py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Lock size={18} />
                          Git resource  soon
                        </button>
                      </div>
                      <button
                        disabled
                        className="px-6 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Lock size={18} />
                        Live Demo soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
