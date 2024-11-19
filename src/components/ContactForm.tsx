'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-hot-toast'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    try {
      // API-Aufruf zum Senden der E-Mail
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'info@nestler-creation.de'
        }),
      })

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Nachricht')
      }
      
      // Formular zurücksetzen
      setFormData({ name: '', email: '', subject: '', message: '' })
      recaptchaRef.current?.reset()
      
      toast.success('Nachricht erfolgreich gesendet!')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Fehler beim Senden der Nachricht')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4 bg-dark-lighter overflow-hidden">
      <div className="container-width relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            KONTAKTIEREN SIE <span className="text-green-400">UNS</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Haben Sie Fragen? Wir sind hier, um Ihnen zu helfen.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="form-input"
                placeholder="Ihr Name"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="form-input"
                placeholder="ihre@email.de"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Betreff
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="form-input"
                placeholder="Ihr Betreff"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Nachricht
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="form-input min-h-[150px]"
                placeholder="Ihre Nachricht"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                theme="dark"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird gesendet...
                </span>
              ) : (
                <>
                  Nachricht senden
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute -bottom-1/2 -left-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-3xl" />
    </section>
  )
}
