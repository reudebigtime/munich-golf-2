'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { images } from '@/lib/images'
import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-dark text-white pt-20">
        {/* Hero Section mit Parallax-Effekt */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={images.golfCourseHero}
            alt="Munich Golf Course"
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
                Munich Golf
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-white">
                Tradition trifft Innovation
              </p>
            </motion.div>
          </div>
        </div>

        {/* Über uns Content */}
        <div className="container-width py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Willkommen bei <span className="text-green-400">Munich Golf</span>
              </h2>
              <p className="text-white mb-6">
                Seit über zwei Jahrzehnten steht Munich Golf für erstklassigen Golfsport in der bayerischen Landeshauptstadt. Unser Ziel ist es, die Tradition des Golfsports mit modernen Trainingsmethoden zu verbinden.
              </p>
              <p className="text-white mb-6">
                Auf unserer weitläufigen Anlage bieten wir Ihnen:
              </p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Modernste Trainingseinrichtungen
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Professionelle Golflehrer
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Individuelle Kursprogramme
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Exklusive Clubatmosphäre
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src={images.golfTraining}
                alt="Golf Training"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-dark-lighter py-20">
          <div className="container-width">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '20+', label: 'Jahre Erfahrung' },
                { number: '1000+', label: 'Zufriedene Mitglieder' },
                { number: '50+', label: 'Kurse pro Monat' },
                { number: '5⭐', label: 'Durchschnittsbewertung' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container-width py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Unser <span className="text-green-400">Team</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sebastian Meyer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={images.trainer1}
                  alt="Sebastian Meyer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Sebastian Meyer</h3>
                <p className="text-gray-400">Head Coach</p>
              </div>
            </motion.div>

            {/* Sarah Schmidt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={images.trainer2}
                  alt="Sarah Schmidt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Sarah Schmidt</h3>
                <p className="text-gray-400">Pro Trainer</p>
              </div>
            </motion.div>

            {/* Michael Bauer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={images.trainer3}
                  alt="Michael Bauer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Michael Bauer</h3>
                <p className="text-gray-400">Junior Coach</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
