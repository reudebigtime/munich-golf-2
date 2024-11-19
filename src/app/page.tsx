'use client'

import Navigation from '@/components/Navigation'
import ContactForm from '@/components/ContactForm'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Footer from '@/components/Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const testimonials = [
    {
      name: "Michael Schmidt",
      title: "Mitglied seit 2020",
      text: "Die Qualität der Anlagen und das professionelle Training haben mein Golfspiel auf ein neues Level gebracht. Die Community ist fantastisch!"
    },
    {
      name: "Sandra Weber",
      title: "Mitglied seit 2021",
      text: "Als Anfängerin fühlte ich mich von Anfang an willkommen. Die Trainer sind geduldig und die Atmosphäre ist sehr angenehm."
    },
    {
      name: "Thomas Müller",
      title: "Mitglied seit 2019",
      text: "Die modernste Ausstattung und die perfekt gepflegten Plätze machen jede Golfrunde zu einem besonderen Erlebnis."
    },
    {
      name: "Julia Becker",
      title: "Mitglied seit 2022",
      text: "Die Flexibilität der Trainingszeiten und die individuelle Betreuung sind genau das, was ich als Berufstätige brauche."
    },
    {
      name: "Markus Wagner",
      title: "Mitglied seit 2018",
      text: "Hier wird Golf-Tradition mit modernem Komfort verbunden. Die Anlage ist ein wahres Paradies für jeden Golf-Enthusiasten."
    },
    {
      name: "Laura Klein",
      title: "Mitglied seit 2021",
      text: "Die regelmäßigen Events und Turniere machen das Golfspielen hier zu einem echten sozialen Erlebnis."
    },
    {
      name: "Robert Fischer",
      title: "Mitglied seit 2020",
      text: "Das Preis-Leistungs-Verhältnis ist ausgezeichnet. Die Investition in die Mitgliedschaft hat sich mehr als gelohnt."
    },
    {
      name: "Anna Schneider",
      title: "Mitglied seit 2019",
      text: "Die Kombination aus Top-Trainern und erstklassigen Übungsanlagen ist unschlagbar. Hier macht jedes Training Spaß!"
    },
    {
      name: "Peter Hoffmann",
      title: "Mitglied seit 2022",
      text: "Die familiäre Atmosphäre und der exzellente Service machen jeden Besuch zu etwas Besonderem."
    }
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-dark overflow-x-hidden">
        <AnimatePresence>
          {isLoading && <LoadingAnimation />}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="gradient-bg" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent opacity-50" />
          </div>
          
          <div className="container-width relative z-10">
            <motion.div 
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div 
                className="mb-6 inline-block"
                variants={fadeInUp}
              >
                <span className="text-green-400 text-sm font-medium tracking-wider">
                  WILLKOMMEN BEI
                </span>
              </motion.div>
              <motion.h1 
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                variants={fadeInUp}
              >
                MUNICH GOLF
                <span className="block text-green-400 mt-2">IN MÜNCHEN</span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Erleben Sie Golf auf höchstem Niveau. Modernste Anlagen, professionelles Training 
                und eine exklusive Community erwarten Sie.
              </motion.p>
              <motion.div 
                className="mt-10 flex flex-wrap justify-center gap-6"
                variants={fadeInUp}
              >
                <Link href="/kurse" className="btn btn-primary">
                  Kurse entdecken
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                <button 
                  onClick={scrollToContact}
                  className="btn btn-outline"
                >
                  Kontakt aufnehmen
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-dark to-transparent" />
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-4 bg-dark-lighter">
          <div className="container-width relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              IHRE <span className="text-green-400">VORTEILE</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-green-400">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-3xl" />
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 px-4 bg-dark">
          <div className="container-width">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Was unsere <span className="text-green-400">Mitglieder</span> sagen
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Erfahren Sie aus erster Hand, wie unsere Mitglieder von unserem Angebot profitieren.
              </p>
            </motion.div>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark" />
          </div>
          
          <div className="container-width relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bereit für Ihr <span className="text-green-400">Golf-Abenteuer?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Lassen Sie uns gemeinsam Ihr Golfspiel auf das nächste Level bringen. 
                Kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-400 text-dark font-bold rounded-lg
                          hover:bg-green-500 transition-colors duration-200"
              >
                Kontakt aufnehmen
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="relative py-24 bg-dark">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

const features = [
  {
    title: 'Professionelle Trainer',
    description: 'Unsere erfahrenen PGA-Professionals bieten individuelles Training für alle Spielstärken.'
  },
  {
    title: 'Moderne Einrichtungen',
    description: 'Trainieren Sie auf unserer hochmodernen Driving Range und dem Putting Green.'
  },
  {
    title: 'Flexible Kurse',
    description: 'Von Einzelstunden bis zu Gruppenkursen - wir haben das passende Angebot für Sie.'
  }
]
