"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Fresh Vegetables",
      description: "Farm-fresh vegetables delivered daily to your doorstep",
      image: "https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg",
    },
    {
      id: 2,
      title: "Noodles & Pasta",
      description: "Instant noodles and premium pasta varieties",
      image:
        "https://maruzzapasta.com.au/wp-content/uploads/2025/05/pasta-vs.-Noodles.jpg",
    },
    {
      id: 3,
      title: "Spices & Masala",
      description: "Pure and aromatic spices for your kitchen",
      image:
        "https://c.ndtvimg.com/2023-07/757utqg8_indian-masalas-or-spice-mixes_625x300_26_July_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738",
    },
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
        {/* Slides */}
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {/* Background Image with Gradient Overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    ></div>

                    {/* Gradient Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                    {/* Content Container */}
                    <div className="relative  h-full flex items-center px-6 md:px-12 lg:px-16">
                      <div className="text-white max-w-xl">
                        <motion.h1
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4"
                        >
                          {slide.title}
                        </motion.h1>

                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-lg sm:text-xl md:text-2xl text-white/95 mb-6 md:mb-8 font-light"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        >
                          Shop Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-20  bottom-0 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="absolute right-2  bottom-0 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/20"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Bottom Full Circle Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="flex flex-col items-center group"
            >
              {/* Mini Full Circle */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-green-600 border-white scale-125"
                    : "bg-transparent border-white/50 hover:border-white group-hover:scale-110"
                }`}
              ></div>

              {/* Active Slide Label */}
              {index === currentSlide && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                ></motion.div>
              )}
            </button>
          ))}

          {/* Progress Bar */}
          <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-white/20">
            <motion.div
              key={currentSlide}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
