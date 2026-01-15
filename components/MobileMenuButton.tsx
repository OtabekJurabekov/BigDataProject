'use client'

import { motion } from 'framer-motion'
import { BarChart3, Sparkles } from 'lucide-react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg"
      aria-label="Toggle menu"
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <Sparkles size={20} />
        ) : (
          <BarChart3 size={20} />
        )}
      </motion.div>
    </button>
  )
}
