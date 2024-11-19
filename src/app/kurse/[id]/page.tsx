'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ClockIcon, StarIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { images } from '@/lib/images'

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

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    const courseId = parseInt(params.id)
    const foundCourse = courses.find(c => c.id === courseId)
    if (foundCourse) {
      setCourse(foundCourse)
    }
  }, [params.id])

  if (!course) {
    return null
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-dark text-white pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-8 z-10 flex items-center gap-2 text-white hover:text-green-400 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Zurück zu allen Kursen</span>
          </button>

          {/* Course Title */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-width">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-green-400 text-dark px-4 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <span className="text-gray-300">{course.duration}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{course.title}</h1>
                <p className="text-xl text-gray-300">{course.description}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="container-width py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Course Features */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Kursinhalt</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {course.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-dark-lighter rounded-lg"
                    >
                      <div className="p-2 bg-green-400/10 rounded-lg">
                        <StarIcon className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-300">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Course Schedule */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold">Kursablauf</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-6 h-6 text-green-400" />
                    <span>Flexible Trainingszeiten verfügbar</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <UserGroupIcon className="w-6 h-6 text-green-400" />
                    <span>Kleine Gruppen für optimale Betreuung</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <ChartBarIcon className="w-6 h-6 text-green-400" />
                    <span>Regelmäßige Fortschrittskontrolle</span>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Price Card */}
              <div className="bg-dark-lighter p-6 rounded-lg space-y-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-400">{course.price}</span>
                  <p className="text-gray-400">für {course.duration}</p>
                </div>
                <button
                  onClick={() => {
                    router.push('/#contact')
                  }}
                  className="w-full bg-green-400 hover:bg-green-500 text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Jetzt anmelden
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-dark-lighter p-6 rounded-lg space-y-4">
                <h3 className="font-bold text-lg">Inkludierte Leistungen:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Professionelle Ausrüstung
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Videoanalyse
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Trainingsmaterialien
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
