'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-lighter text-white">
      <div className="container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Munich Golf</h3>
            <p className="text-gray-400">
              Ihre exklusive Golfakademie in München. Professionelles Training und modernste Ausstattung für Ihr perfektes Golfspiel.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/kurse" className="text-gray-400 hover:text-green-400 transition-colors">
                  Kurse
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-green-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-green-400 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPinIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span>
                  Leopoldstraße 128<br />
                  80802 München
                </span>
              </li>
              <li>
                <a 
                  href="tel:+498912345678" 
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <PhoneIcon className="w-6 h-6 text-green-400" />
                  +49 (89) 123 45678
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@munich-golf.de" 
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <EnvelopeIcon className="w-6 h-6 text-green-400" />
                  info@munich-golf.de
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Öffnungszeiten</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Montag - Freitag:</span>
                <span>08:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samstag:</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sonntag:</span>
                <span>10:00 - 16:00</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Munich Golf. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link href="/datenschutz" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Datenschutz
              </Link>
              <Link href="/impressum" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                Impressum
              </Link>
              <Link href="/agb" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
