'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CommandPaletteProps {
  onClose: () => void
}

const commands = [
  { id: 'overview', label: 'Go to Overview', category: 'Navigation', href: '/overview' },
  { id: 'dashboard', label: 'Go to Dashboard', category: 'Navigation', href: '/dashboard' },
  { id: 'customers', label: 'View Customers Analysis', category: 'Analysis', href: '/customers' },
  { id: 'products', label: 'View Products Analysis', category: 'Analysis', href: '/products' },
  { id: 'employees', label: 'View Employees Analysis', category: 'Analysis', href: '/employees' },
  { id: 'offices', label: 'View Offices Analysis', category: 'Analysis', href: '/offices' },
  { id: 'analytics', label: 'Advanced Analytics', category: 'Analysis', href: '/analytics' },
  { id: 'export', label: 'Export Data', category: 'Actions', href: '#' },
  { id: 'settings', label: 'Settings', category: 'Settings', href: '#' },
]

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredCommands[selectedIndex]?.href && filteredCommands[selectedIndex].href !== '#') {
          window.location.href = filteredCommands[selectedIndex].href
        }
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredCommands.length, selectedIndex, onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
        onClick={onClose}
        style={{
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-2xl border overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,30,0.98) 100%)',
            backdropFilter: 'blur(50px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: `
              0 24px 80px 0 rgba(0,0,0,0.7),
              inset 0 1px 0 0 rgba(255,255,255,0.2),
              0 0 0 1px rgba(255,255,255,0.15) inset,
              0 0 120px -20px rgba(139, 92, 246, 0.4),
              0 0 160px -40px rgba(6, 182, 212, 0.2)
            `,
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(6,182,212,0.4), rgba(236,72,153,0.4))',
              backgroundSize: '200% 200%',
              filter: 'blur(30px)',
              zIndex: -1,
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
          
          <div className="flex items-center gap-3 px-5 py-4 border-b relative" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Search className="text-purple-400" size={22} />
            </motion.div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedIndex(0)
              }}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              autoFocus
              style={{
                textShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            />
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              aria-label="Close command palette"
            >
              <X size={18} aria-hidden="true" />
            </motion.button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length > 0 ? (
              <div className="py-2">
                {filteredCommands.map((cmd, index) => (
                  <motion.a
                    key={cmd.id}
                    href={cmd.href}
                    whileHover={{ x: 4 }}
                    className={`w-full px-5 py-3.5 text-left flex items-center justify-between transition-all relative ${
                      index === selectedIndex
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    style={index === selectedIndex ? {
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
                      backdropFilter: 'blur(10px)',
                    } : {}}
                    onClick={onClose}
                    aria-label={cmd.label}
                    aria-describedby={`command-category-${cmd.id}`}
                  >
                    {index === selectedIndex && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-cyan-400"
                        layoutId="commandIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-center gap-3">
                      <Sparkles 
                        size={16} 
                        className={index === selectedIndex ? 'text-purple-300' : 'text-gray-500'}
                        aria-hidden="true"
                      />
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    <span 
                      id={`command-category-${cmd.id}`}
                      className={`text-xs px-2.5 py-1 rounded-md ${
                        index === selectedIndex 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {cmd.category}
                    </span>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center text-gray-500">
                <Sparkles size={32} className="mx-auto mb-3 opacity-50" />
                <p>No commands found</p>
              </div>
            )}
          </div>

          <div 
            className="px-5 py-3 border-t flex items-center justify-between text-xs relative"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                  ?
                </kbd>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                  ?
                </kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                  Enter
                </kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                Esc
              </kbd>
              <span>Close</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
