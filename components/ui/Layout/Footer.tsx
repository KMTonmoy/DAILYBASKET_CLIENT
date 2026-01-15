'use client'
import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
  Leaf,
  Apple,
  Carrot,
  Milk,
  Fish,
  Download,
  Award,
  Heart,
  CookingPot,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    {
      name: "Fresh Fruits",
      icon: Apple,
      count: "120+ items",
      color: "text-red-500",
    },
    {
      name: "Vegetables",
      icon: Carrot,
      count: "80+ items",
      color: "text-orange-500",
    },
    {
      name: "Dairy & Eggs",
      icon: Milk,
      count: "45+ items",
      color: "text-blue-500",
    },
    {
      name: "Meat & Fish",
      icon: Fish,
      count: "60+ items",
      color: "text-rose-500",
    },
    {
      name: "Bakery",
      icon: CookingPot ,
      count: "35+ items",
      color: "text-amber-600",
    },
  ];

  const quickLinks = {
    "Shop By": [
      "All Products",
      "New Arrivals",
      "Best Sellers",
      "Weekly Offers",
      "Seasonal Picks",
    ],
    Account: [
      "My Account",
      "Order History",
      "Wishlist",
      "Track Order",
      "Rewards",
    ],
    "Help Center": [
      "FAQs",
      "Shipping Policy",
      "Return Policy",
      "Payment Methods",
      "Contact Support",
    ],
    "About Us": [
      "Our Story",
      "Quality Promise",
      "Sustainability",
      "Careers",
      "Press",
    ],
  };

  const features = [
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "Your payment information is protected",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery in select areas",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: CreditCard,
      title: "Multiple Payments",
      description: "Cash, Card, bKash, Nagad",
    },
  ];

  const socialMedia = [
    { icon: Facebook, name: "Facebook", color: "hover:bg-blue-600", href: "#" },
    {
      icon: Instagram,
      name: "Instagram",
      color: "hover:bg-pink-600",
      href: "#",
    },
    { icon: Twitter, name: "Twitter", color: "hover:bg-sky-500", href: "#" },
    { icon: Youtube, name: "YouTube", color: "hover:bg-red-600", href: "#" },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "bKash",
    "Nagad",
    "Rocket",
    "Cash on Delivery",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Top Features Banner */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 border-y border-green-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-3 rounded-xl bg-green-100">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Brand & Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    DailyBasket
                  </h2>
                  <p className="text-green-600 font-medium">
                    Bangladeshs Fresh Grocery Store
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Delivering farm-fresh produce and quality groceries to your
                doorstep across Bangladesh. Experience convenience like never
                before with our reliable service.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">+880 1234 567890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">support@dailybasket.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <span className="text-gray-700">
                    123 Fresh Street, Dhaka 1212
                    <br />
                    Bangladesh
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">
                    Daily 8:00 AM - 11:00 PM
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links Grid */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(quickLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b border-green-200">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link}>
                          <Link
                            href="#"
                            className="text-gray-600 hover:text-green-600 hover:pl-2 transition-all duration-200 flex items-center group"
                          >
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></span>
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Shop by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`p-4 rounded-2xl bg-gray-50 group-hover:bg-green-50 transition-colors ${category.color}`}
                    >
                      <category.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white"
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold">Stay Fresh & Updated!</h3>
                <p className="text-green-100">
                  Subscribe to our newsletter for exclusive deals, new arrivals,
                  and health tips.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-2xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 text-gray-900 placeholder-gray-500"
                />
                <button className="px-8 py-4 bg-white text-green-700 font-bold rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                  Subscribe
                </button>
              </div>

              <p className="text-sm text-green-200">
                Join 50,000+ happy customers. No spam, just freshness!
              </p>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Follow us:</span>
                <div className="flex items-center space-x-3">
                  {socialMedia.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl bg-gray-100 ${social.color} transition-all text-gray-700 hover:text-white`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">We accept:</span>
                <div className="flex items-center space-x-2 flex-wrap justify-center">
                  {paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-700">
                  Best Grocery Service 2024
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">
                  Eco-Friendly Packaging
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                <Download className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">
                  Get Our Mobile App
                </span>
              </div>
            </div>

            {/* Copyright & Legal */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-600">
                    © {currentYear} DailyBasket. All rights reserved.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Made with <Heart className="w-4 h-4 text-red-500 inline" />{" "}
                    in Bangladesh
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm"
                  >
                    Cookie Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 text-sm"
                  >
                    Sitemap
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
