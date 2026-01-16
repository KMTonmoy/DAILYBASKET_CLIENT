"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  Home,
  Package,
  Tag,
  ChefHat,
  Info,
  Phone,
  Store,
  Truck,
  ShoppingBag,
  Percent,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("Home");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const menuItems = [
    { name: "Home", href: "/", icon: Home, color: "text-gray-700" },
    {
      name: "Products",
      href: "/products",
      icon: Package,
      color: "text-gray-700",
    },

    {
      name: "Recipes",
      href: "/recipes",
      icon: ChefHat,
      color: "text-gray-700",
    },

    { name: "About", href: "/about", icon: Info, color: "text-gray-700" },
    { name: "Contact", href: "/contact", icon: Phone, color: "text-gray-700" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Top Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Truck className="w-4 h-4 animate-pulse" />
              <span>
                🚚 <span className="font-semibold">FREE DELIVERY</span> on
                orders above ৳499
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">
                🎁 <span className="font-semibold">10% OFF</span> first order
              </span>
              <span>
                ⭐ <span className="font-semibold">Fresh</span> daily produce
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-emerald-600/30 rounded-2xl" />
                    <ShoppingBag className="w-7 h-7 text-white" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">৳</span>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-2 border-2 border-green-300/50 rounded-2xl"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    DailyBaskets
                  </span>
                  <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                    Fresh Groceries • Fast Delivery
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1 flex-1 justify-center">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.name)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                      activeItem === item.name
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="font-medium">{item.name}</span>
                    {item.highlight && (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* User Account */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors duration-200 group relative"
              >
                <User className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
              </motion.button>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 group"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                  >
                    3
                  </motion.span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen && searchInputRef.current) {
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              <button className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-green-50 hover:bg-green-100 transition-colors border border-green-100"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-green-700" />
                ) : (
                  <Menu className="w-5 h-5 text-green-700" />
                )}
              </motion.button>
            </div>
          </div>

          {/* ALWAYS VISIBLE Search Bar (Desktop) */}
          <div className="hidden lg:block pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for fruits, vegetables, dairy, meat, snacks..."
                  className="w-full px-6 py-4 pl-14 pr-24 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-0 top-0  h-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search
                </motion.button>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-32 top-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Mobile Search Bar (Toggleable) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="lg:hidden pb-4"
              >
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search groceries..."
                      className="w-full px-4 py-3 pl-12 pr-24 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-0 top-0 h-full px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" />
                      <span className="text-sm">Go</span>
                    </motion.button>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-20 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Bar REMOVED - No Shop by Category section */}
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 lg:hidden z-40"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto lg:hidden"
              >
                <div className="p-6">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                        <ShoppingBag className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          DailyBaskets
                        </h3>
                        <p className="text-sm text-gray-500">
                          Your Cart: ৳1,247.00
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* Search in Mobile Menu */}
                  <div className="mb-6">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Search products..."
                          className="w-full px-4 py-3 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 text-gray-900"
                        />
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      </div>
                    </form>
                  </div>

                  {/* User Info */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Welcome!</h4>
                          <p className="text-sm text-gray-600">
                            Sign in for offers
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                        Sign In
                      </button>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1 mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                      Navigation
                    </h4>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-1"
                    >
                      {menuItems.map((item) => (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                              activeItem === item.name
                                ? "bg-green-50 text-green-700"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  activeItem === item.name
                                    ? "bg-green-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                <item.icon
                                  className={`w-4 h-4 ${item.color}`}
                                />
                              </div>
                              <span className="font-medium">{item.name}</span>
                            </div>
                            {item.highlight && (
                              <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">
                                HOT
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center space-x-2 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Track Order
                        </span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">
                          My Offers
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Contact & Support */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-4">
                      <button className="flex flex-col items-center p-3">
                        <Phone className="w-5 h-5 text-gray-600 mb-1" />
                        <span className="text-xs text-gray-600">Support</span>
                      </button>
                      <button className="flex flex-col items-center p-3">
                        <Info className="w-5 h-5 text-gray-600 mb-1" />
                        <span className="text-xs text-gray-600">Help</span>
                      </button>
                      <button className="flex flex-col items-center p-3">
                        <Store className="w-5 h-5 text-gray-600 mb-1" />
                        <span className="text-xs text-gray-600">Stores</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
