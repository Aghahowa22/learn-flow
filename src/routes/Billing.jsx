import React, { useState, useRef, useEffect } from "react";
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
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  DollarSign,
  Check,
  Lock,
  AlertCircle,
} from "lucide-react";

//  repeated dashboard side bar on the billing route large screen only
const Billing = () => {
  // dashboard active element states
  const [selectedCategory, setSelectedCategory] = useState("");
  // all variable for link routes active state
  const isDashboard = selectedCategory === "dashboard";
  const isCourses = selectedCategory === "courses";
  const isProjects = selectedCategory === "projects";
  const isCourseBuilder = selectedCategory === "coursebuilder";
  const isCalender = selectedCategory === "calender";

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

  // ============ BILLING SYSTEM STATE ============
  const [currency, setCurrency] = useState("USD");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Currency exchange rates (mock data - in production, use live API)
  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.54,
    JPY: 149.5,
    CHF: 0.88,
    INR: 83.12,
    NGR: 1377.5,
    GHA: 11.02,
    ZAR: 16.40,
    KES: 129.4,
    EGP: 53.25,
  };

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CHF: "CHF",
    INR: "₹",
    NGR: "₦",
    GHA: "₵",
    ZAR: "R",
    KES: "KSh",
    EGP: "E£",
  };

  // Available courses/products for purchase - from recommended courses
  const availableProducts = [
    {
      id: 7,
      name: "Data Structures & Algorithms in Java",
      basePrice: 189,
      icon: "📚",
      category: "Programming",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1250,
    },
    {
      id: 8,
      name: "Database Design & SQL Mastery",
      basePrice: 179,
      icon: "🗄️",
      category: "Database",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 890,
    },
    {
      id: 9,
      name: "Project Management for Software Development",
      basePrice: 179,
      icon: "📈",
      category: "Management",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 2100,
    },
    {
      id: 10,
      name: "Python for Data Science",
      basePrice: 199,
      icon: "📊",
      category: "Programming",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.6,
      students: 1500,
    },
    {
      id: 11,
      name: "C++ Programming Fundamentals",
      basePrice: 189,
      icon: "⚙️",
      category: "Programming",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.5,
      students: 900,
    },
    {
      id: 12,
      name: "Cloud Computing with AWS",
      basePrice: 199,
      icon: "☁️",
      category: "Cloud",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1200,
    },
    {
      id: 13,
      name: "Machine Learning with Python",
      basePrice: 159,
      icon: "🤖",
      category: "Data Science",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 1800,
    },
    {
      id: 14,
      name: "System Programming with C",
      basePrice: 159,
      icon: "💻",
      category: "Programming",
      duration: "9 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 950,
    },
  ];

  // Convert price based on selected currency
  const convertPrice = (basePrice) => {
    return (basePrice * exchangeRates[currency]).toFixed(2);
  };

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          convertedPrice: convertPrice(product.basePrice),
        },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.convertedPrice),
    0,
  );
  const tax = (subtotal * 0.1).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
    const estimatedYearly = subtotal.toFixed(2);
      const estimatedMonthly = (estimatedYearly / 12).toFixed(2);


  const estimatedWeekly = (estimatedMonthly / 4).toFixed(2);

  const formatPayment = (value) => `${currencySymbols[currency]}${parseFloat(value).toFixed(2)}`;

  // Handle payment
  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setPaymentError("Your cart is empty");
      return;
    }

    setProcessingPayment(true);
    setPaymentError(null);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPaymentSuccess(true);
      setCartItems([]);
      setTimeout(() => setPaymentSuccess(false), 4000);
    } catch {
      setPaymentError("Payment failed. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
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
                  onClick={removeDashBoard}
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
              <li>
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

              <li>
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
                <h5 className="mt-3 text-l font-semibold tracking-tight text-heading">
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
                <h5 className="mt-3 text-l font-semibold tracking-tight text-heading">
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Billing & Payments 
              </h2>
              <p className="text-gray-600">
                Review your payment summary for <b>recommended courses</b>, choose a currency, and select the best payment option for your purchase.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-500">Weekly Estimate</p>
                <p className="mt-3 text-2xl font-semibold text-gray-900">
                  {formatPayment(estimatedWeekly)}
                </p>
                <p className="mt-2 text-xs text-gray-500">Based on current cart total</p>
              </div>
              <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-500">Monthly Estimate</p>
                <p className="mt-3 text-2xl font-semibold text-gray-900">
                  {formatPayment(estimatedMonthly)}
                </p>
                <p className="mt-2 text-xs text-gray-500">Standard monthly view</p>
              </div>
              <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
                <p className="text-sm text-gray-500">Yearly Estimate</p>
                <p className="mt-3 text-2xl font-semibold text-gray-900">
                  {formatPayment(estimatedYearly)}
                </p>
                <p className="mt-2 text-xs text-gray-500">Annual projection</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Currency & Conversion</h3>
                  <p className="text-sm text-gray-600">
                    Choose your preferred billing currency and see all prices updated instantly.
                  </p>
                </div>
                <div className="w-full sm:w-64">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="inline-flex items-center gap-2">
                      <DollarSign size={16} /> Currency
                    </span>
                  </label>
                  <select
                  id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none focus:border-transparent"
                  >
                    {Object.keys(exchangeRates).map((curr) => (
                      <option key={curr} value={curr}>
                        {curr} - {currencySymbols[curr]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl border border-gray-200 p-5 hover:border-amber-300 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="text-3xl">{product.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3">{product.name}</h4>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-amber-600">
                        {currencySymbols[currency]}
                        {convertPrice(product.basePrice)}
                      </span>
                      <span className="text-sm text-gray-500">One-time</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white py-3 cursor-pointer font-semibold transition-colors disabled:opacity-60"
                    >
                      <Lock size={16} /> Coming soon
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Options</h3>
                  <p className="text-sm text-gray-600">Pick the method that works best for you.</p>
                </div>
                <span className="text-xs uppercase tracking-[0.18em] text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  Secure
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "card", label: "Credit/Debit Card", desc: "Fast checkout", active: paymentMethod === "card" },
                  { id: "paypal", label: "PayPal", desc: "Trusted wallet", active: paymentMethod === "paypal" },
                  { id: "transfer", label: "Bank Transfer", desc: "Manual processing", active: paymentMethod === "transfer" },
                  { id: "wallet", label: "Wallet", desc: "Save card details", active: paymentMethod === "wallet" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    type="button"
                    className={`text-left p-4 rounded-3xl border transition ${
                      option.active
                        ? "border-amber-400 bg-amber-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-semibold text-gray-900">{option.label}</span>
                      {option.active && (
                        <span className="text-amber-700 font-semibold">Selected</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200  top-24">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
                  <p className="text-sm text-gray-600">Review your cart contents and totals.</p>
                </div>
                <ShoppingCart size={24} className="text-amber-500" />
              </div>

              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-gray-200 p-6 text-center text-gray-500">
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-gray-200 p-4 bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.quantity} x</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <span>{currencySymbols[currency]}{item.convertedPrice}</span>
                        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{currencySymbols[currency]}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (10%)</span>
                  <span>{currencySymbols[currency]}{tax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold bg-amber-50 rounded-3xl p-4">
                  <span>Total</span>
                  <span>{currencySymbols[currency]}{total}</span>
                </div>
              </div>

              <div className="space-y-4">
                {paymentError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-3xl flex items-center gap-2 text-sm">
                    <AlertCircle size={16} /> {paymentError}
                  </div>
                )}
                {paymentSuccess && (
                  <div className="bg-amber-50 text-amber-700 p-3 rounded-3xl flex items-center gap-2 text-sm">
                    <Check size={16} /> Payment for recomended courses are unavilable at the moment!
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  disabled={processingPayment || cartItems.length === 0}
                  className={`w-full py-4 rounded-3xl font-semibold text-white transition ${
                    processingPayment || cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-amber-500 to-orange-500 hover:shadow-xl"
                  }`}
                >
                  {processingPayment ? (
                    <div className="inline-flex items-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 justify-center">
                      <Lock size={18} /> coming soon
                    </div>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                🔒 Secure payment processing. Your data is encrypted.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Currencies</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                {Object.entries(currencySymbols).map(([code, symbol]) => (
                  <div key={code} className="rounded-2xl border border-gray-200 p-3 bg-gray-50">
                    <span className="font-semibold text-gray-900">{code}</span>
                    <span className="ml-2">{symbol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
