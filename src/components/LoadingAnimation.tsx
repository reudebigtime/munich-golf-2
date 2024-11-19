'use client'

import { motion } from 'framer-motion'

export const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Golf Ball */}
        <motion.div
          className="w-8 h-8 bg-white rounded-full border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          animate={{
            y: [-20, 0, -20],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Golf Ball Dimples */}
          <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
            <div className="bg-gray-100 rounded-full"></div>
            <div className="bg-gray-100 rounded-full"></div>
            <div className="bg-gray-100 rounded-full"></div>
            <div className="bg-gray-100 rounded-full"></div>
          </div>
        </motion.div>

        {/* Golf Club */}
        <motion.div
          className="absolute left-1/2 bottom-0 w-1 h-20 bg-gray-300 origin-bottom"
          style={{ translateX: '-50%' }}
          animate={{
            rotate: [-30, 30, -30]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Club Head */}
          <div className="absolute -right-3 bottom-0 w-4 h-2 bg-gray-400"></div>
        </motion.div>

        {/* Ground Line */}
        <motion.div
          className="absolute -bottom-8 left-1/2 w-20 h-0.5 bg-green-400/50"
          style={{ translateX: '-50%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-2 h-2 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-2 h-2 bg-green-400 rounded-full"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}
