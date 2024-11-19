'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { images } from '@/lib/images'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useRouter } from 'next/navigation'

type Course = {
  id: number
  title: string
  description: string
  level: string
  duration: string
  price: string
  image: string
  features: string[]
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Einsteiger Grundkurs',
    description: 'Der perfekte Einstieg in die Welt des Golfsports. Lernen Sie die Grundlagen und Techniken in einer entspannten Atmosphäre.',
    level: 'Anfänger',
    duration: '4 Wochen',
    price: '299€',
    image: images.beginnerCourse,
    features: [
      'Grundlegende Schlagtechniken',
      'Regelkunde',
      'Etikette auf dem Golfplatz',
      'Praktische Übungen',
      'Kleine Gruppengrößen'
    ]
  },
  {
    id: 2,
    title: 'Fortgeschrittenen Training',
    description: 'Verfeinern Sie Ihre Technik und verbessern Sie Ihr Handicap mit unserem intensiven Fortgeschrittenenkurs.',
    level: 'Fortgeschritten',
    duration: '6 Wochen',
    price: '449€',
    image: images.advancedCourse,
    features: [
      'Fortgeschrittene Schlagtechniken',
      'Mentales Training',
      'Videoanalyse',
      'Individuelle Betreuung',
      'Turniervorbereitungen'
    ]
  },
  {
    id: 3,
    title: 'Pro Performance',
    description: 'Für ambitionierte Golfer, die ihr Spiel auf das nächste Level bringen möchten. Intensives Training mit modernster Technologie.',
    level: 'Profi',
    duration: '8 Wochen',
    price: '699€',
    image: images.proCourse,
    features: [
      'Hochmoderne Trainingsanalyse',
      'Personalisierter Trainingsplan',
      'Wettkampfstrategie',
      'Fitness & Ernährung',
      'Turnierbegleitung'
    ]
  }
]

export default function CoursesPage() {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-dark text-white pt-20">
        {/* Hero Section */}
        <div className="relative h-[40vh] overflow-hidden">
          <Image
            src={images.golfCourseWide}
            alt="Golf Kurse"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Unsere Kurse
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-white">
                Für jeden Level das passende Training
              </p>
            </motion.div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="container-width py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-dark-lighter rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => router.push(`/kurse/${course.id}`)}
              >
                <div className="relative h-[200px]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-400 text-dark px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center text-green-400">
                    <span>{course.duration}</span>
                    <span className="text-xl font-bold">{course.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-lighter rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-[300px]">
                <Image
                  src={selectedCourse.image}
                  alt={selectedCourse.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 right-4 bg-dark/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-dark transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{selectedCourse.title}</h3>
                    <span className="bg-green-400 text-dark px-3 py-1 rounded-full text-sm font-medium">
                      {selectedCourse.level}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{selectedCourse.price}</div>
                    <div className="text-gray-400">{selectedCourse.duration}</div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{selectedCourse.description}</p>
                <h4 className="font-bold mb-4 text-white">Kursinhalt:</h4>
                <ul className="space-y-3">
                  {selectedCourse.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-8 w-full bg-green-400 hover:bg-green-500 text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                  onClick={() => window.location.href = '#contact'}
                >
                  Jetzt anmelden
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
