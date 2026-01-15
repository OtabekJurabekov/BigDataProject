'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Building2, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/overview', color: 'from-purple-500 to-cyan-500' },
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard', color: 'from-purple-500 to-cyan-500' },
  { icon: Users, label: 'Customers', href: '/customers', color: 'from-cyan-500 to-blue-500' },
  { icon: Package, label: 'Products', href: '/products', color: 'from-purple-500 to-pink-500' },
  { icon: Building2, label: 'Offices', href: '/offices', color: 'from-blue-500 to-cyan-500' },
  { icon: FileText, label: 'Employees', href: '/employees', color: 'from-pink-500 to-purple-500' },
  { icon: Sparkles, label: 'Analytics', href: '/analytics', color: 'from-purple-500 to-cyan-500' },
]

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative border-r overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)',
        backdropFilter: 'blur(40px) saturate(200%)',
        borderColor: 'rgba(255,255,255,0.25)',
        boxShadow: `
          inset -1px 0 0 0 rgba(255,255,255,0.15),
          12px 0 48px 0 rgba(0,0,0,0.5),
          0 0 0 1px rgba(255,255,255,0.1) inset,
          0 0 80px -20px rgba(139, 92, 246, 0.2)
        `,
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.2) 50%, rgba(236,72,153,0.2) 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="flex h-full flex-col relative z-10">
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {isOpen && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text flex items-center gap-2"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Sparkles size={20} className="text-purple-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
              </motion.div>
              <span className="text-glow">Classic Models</span>
            </motion.h1>
          )}
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl transition-all text-white/80 hover:text-white relative overflow-hidden group"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isOpen}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              {isOpen ? <ChevronLeft size={20} aria-hidden="true" /> : <ChevronRight size={20} aria-hidden="true" />}
            </div>
          </motion.button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href} aria-label={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? ''
                      : 'hover:bg-white/5'
                  }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(6,182,212,0.4) 100%)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    boxShadow: `
                      0 12px 40px 0 rgba(139, 92, 246, 0.5),
                      inset 0 1px 0 0 rgba(255,255,255,0.4),
                      0 0 30px rgba(139, 92, 246, 0.3),
                      0 0 60px -20px rgba(139, 92, 246, 0.2)
                    `,
                  } : {
                    border: '1px solid transparent',
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Animated gradient overlay for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.color.replace('from-', 'rgba(').replace('to-', '), ').replace('-', ', ')}0.2)`,
                        backgroundSize: '200% 200%',
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
                  )}
                  
                  <motion.div
                    className={`p-2 rounded-lg relative z-10 ${
                      isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon
                      size={20}
                      className={isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                      strokeWidth={isActive ? 2.5 : 2}
                      aria-hidden="true"
                    />
                  </motion.div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`font-semibold relative z-10 ${
                          isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Shimmer effect on hover */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 border-t relative"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          {isOpen ? (
            <>
              <div className="flex items-center gap-2 text-xs text-gray-300/80 mb-4">
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                  ⌘
                </kbd>
                <span>+</span>
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/90 font-mono text-[10px] border border-white/20">
                  K
                </kbd>
                <span className="ml-2">for commands</span>
              </div>
              <motion.div
                className="flex items-center gap-3 p-3 rounded-xl relative overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="relative w-10 h-10 rounded-xl overflow-hidden z-10"
                  style={{
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-cyan-400/20" />
                  <img
                    src="/OtabekJurabekov.PNG"
                    alt="Otabek Jurabekov"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>
                <div className="flex-1 relative z-10">
                  <p className="text-xs text-gray-400 mb-0.5">Created by</p>
                  <p className="text-sm font-semibold text-white">Otabek Jurabekov</p>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.a
                href="/overview"
                className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer relative"
                style={{
                  border: '2px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                whileHover={{ rotate: 5 }}
                aria-label="View profile - Otabek Jurabekov"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 z-10" />
                <img
                  src="/OtabekJurabekov.PNG"
                  alt="Otabek Jurabekov"
                  className="w-full h-full object-cover relative z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
              </motion.a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  )
}
