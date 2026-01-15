'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  trend?: string
  delay?: number
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  delay = 0,
}: MetricCardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: !isMobile ? -16 : 0, 
        scale: !isMobile ? 1.05 : 1,
        rotate: !isMobile ? 0.5 : 0,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 100%)',
        backdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.22)',
        boxShadow: `
          0 12px 48px 0 rgba(0,0,0,0.5),
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 0 0 1px rgba(255,255,255,0.15) inset,
          0 0 80px -20px rgba(139, 92, 246, 0.15),
          0 0 120px -40px rgba(6, 182, 212, 0.1)
        `,
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.25) 50%, rgba(236,72,153,0.25) 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Glassmorphic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.4), rgba(236,72,153,0.4))',
          backgroundSize: '200% 200%',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
          <motion.div 
            className="p-2 sm:p-2.5 md:p-3.5 rounded-lg md:rounded-xl backdrop-blur-md relative overflow-hidden"
            whileHover={{ scale: !isMobile ? 1.1 : 1, rotate: !isMobile ? 5 : 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.45) 0%, rgba(6,182,212,0.45) 100%)',
              boxShadow: `
                0 6px 24px 0 rgba(139,92,246,0.5),
                inset 0 1px 0 0 rgba(255,255,255,0.4),
                0 0 30px rgba(139, 92, 246, 0.3)
              `,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className="text-white relative z-10 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" size={18} strokeWidth={2.5} />
          </motion.div>
          {trend && (
            <motion.span 
              className="text-[10px] sm:text-xs font-bold text-white px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md md:rounded-lg backdrop-blur-md flex items-center gap-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(5,150,105,0.5) 100%)',
                boxShadow: '0 2px 12px 0 rgba(16,185,129,0.4), inset 0 1px 0 0 rgba(255,255,255,0.2)',
              }}
            >
              <span>↑</span>
              {trend}
            </motion.span>
          )}
        </div>
        
        <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5">
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-300/90 font-medium tracking-wide uppercase">
            {title}
          </p>
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.1 }}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </motion.p>
        </div>
      </div>

      {/* Animated shimmer effect */}
      <motion.div 
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          width: '50%',
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle particles effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
