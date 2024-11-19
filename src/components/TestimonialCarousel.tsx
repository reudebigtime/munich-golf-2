'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Testimonial {
  name: string
  title: string
  text: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
    }, 5000)

    return () => clearInterval(timer)
  }, [totalPages])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * itemsPerPage
    return testimonials.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <div className="relative w-full px-12 py-8">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-green-400 transition-colors"
        aria-label="Previous testimonials"
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-green-400 transition-colors"
        aria-label="Next testimonials"
      >
        <ChevronRightIcon className="w-8 h-8" />
      </button>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {getCurrentTestimonials().map((testimonial, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-lighter p-6 rounded-xl border border-gray-800 hover:border-green-400 transition-all duration-300 h-96"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>
              
              {/* Testimonial Content */}
              <p className="text-gray-300 mb-4">{testimonial.text}</p>
              
              {/* Author Info */}
              <div className="mt-auto">
                <p className="font-semibold text-green-400">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-green-400 w-4' : 'bg-gray-600'
            }`}
            aria-label={`Go to testimonial group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
