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
      description: "Farm-fresh vegetables delivered daily",
      image: "https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg",
    },
    {
      id: 2,
      title: "Noodles & Pasta",
      description: "Instant noodles and pasta varieties",
      image:
        "https://maruzzapasta.com.au/wp-content/uploads/2025/05/pasta-vs.-Noodles.jpg",
    },
    {
      id: 3,
      title: "Spices & Masala",
      description: "Pure spices for your kitchen",
      image:
        "https://c.ndtvimg.com/2023-07/757utqg8_indian-masalas-or-spice-mixes_625x300_26_July_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738",
    },
    {
      id: 4,
      title: "Cooking Essentials",
      description: "Salt, oil, sugar and basic groceries",
      image:
        "https://www.seriouseats.com/thmb/fFdhyETX4DXRnuOErRINpL6GNMs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sea-tier-3-primary-chinese-cooking-essentials-ebrockob-001-3d4a4d233af64a3dbc31496c140e6450.jpeg",
    },
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
                    {/* Background Image with Black Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Content Container */}
                    <div className="relative h-full flex items-center justify-center px-4">
                      <div className="text-center text-white max-w-xl">
                        <motion.h1
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
                        >
                          {slide.title}
                        </motion.h1>

                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-base sm:text-lg md:text-xl text-white/90 max-w-md mx-auto"
                        >
                          {slide.description}
                        </motion.p>
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Slide Indicators - Green active dot */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-3 h-3 bg-green-500" // Active slide - green circle
                  : "w-2 h-2 bg-white/50 hover:bg-white/80" // Inactive slides
              } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
