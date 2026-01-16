'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Info, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import ChartCard from './ChartCard'

interface ChartWithDetailsProps {
  title: string
  description: string
  sqlQuery: string
  data: any[]
  type: 'bar' | 'line' | 'pie' | 'area'
  xKey: string
  yKey: string
  delay?: number
  insights?: string[]
}

export default function ChartWithDetails({
  title,
  description,
  sqlQuery,
  data,
  type,
  xKey,
  yKey,
  delay = 0,
  insights = [],
}: ChartWithDetailsProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showSQL, setShowSQL] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0, y: 20 }}
      animate={isMobile ? {} : { opacity: 1, y: 0 }}
      transition={isMobile ? {} : { delay: delay * 0.3 }}
      className="rounded-xl md:rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 100%)',
        backdropFilter: 'blur(32px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.22)',
        boxShadow: `
          0 12px 48px 0 rgba(0,0,0,0.5),
          inset 0 1px 0 0 rgba(255,255,255,0.3),
          0 0 0 1px rgba(255,255,255,0.15) inset,
          0 0 80px -20px rgba(139, 92, 246, 0.15)
        `,
      }}
      whileHover={isMobile ? {} : {
        scale: 1.005,
        y: -2,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
    >
      {/* Header with title and actions */}
      <div className="p-3 sm:p-4 md:p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-1.5 md:mb-2 flex items-center gap-2">
              <span className="gradient-text">{title}</span>
            </h3>
            <p className="text-gray-300/90 text-xs sm:text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: !isMobile ? 1.1 : 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 sm:p-2.5 rounded-lg md:rounded-xl transition-all relative overflow-hidden group min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{
                background: showDetails 
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)'
                  : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label={showDetails ? 'Hide details' : 'Show details'}
            >
              <Info 
                size={16} 
                className={`sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] ${showDetails ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                aria-hidden="true"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: !isMobile ? 1.1 : 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSQL(!showSQL)}
              className="p-2 sm:p-2.5 rounded-lg md:rounded-xl transition-all relative overflow-hidden group min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{
                background: showSQL 
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)'
                  : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label={showSQL ? 'Hide SQL' : 'Show SQL'}
            >
              <Code2 
                size={16} 
                className={`sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] ${showSQL ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-3 sm:p-4 md:p-6">
        <ChartCard
          title=""
          data={data}
          type={type}
          xKey={xKey}
          yKey={yKey}
          delay={0}
        />
      </div>

      {/* Expandable Details Section */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: isMobile ? 0.15 : 0.3 }}
            className="overflow-hidden border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-3.5 md:space-y-4">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <Info size={14} className="sm:w-4 sm:h-4" />
                  Key Insights
                </h4>
                {insights.length > 0 ? (
                  <ul className="space-y-1.5 sm:space-y-2">
                    {insights.map((insight, index) => (
                      <motion.li
                        key={index}
                        initial={isMobile ? false : { opacity: 0, x: -10 }}
                        animate={isMobile ? {} : { opacity: 1, x: 0 }}
                        transition={isMobile ? {} : { delay: index * 0.05 }}
                        className="text-xs sm:text-sm text-gray-300/90 flex items-start gap-1.5 sm:gap-2"
                      >
                        <span className="text-purple-400 mt-0.5 sm:mt-1">•</span>
                        <span>{insight}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-400 italic">
                    Analyzing the data reveals interesting patterns in naming conventions and textual characteristics.
                  </p>
                )}
              </div>
              
              <div className="pt-2 sm:pt-2.5 md:pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
                  This visualization helps identify trends and patterns that may not be immediately apparent from raw data.
                  Use the insights to understand naming conventions, spelling patterns, and textual characteristics across
                  different entities in the Classic Models database.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable SQL Section */}
      <AnimatePresence>
        {showSQL && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: isMobile ? 0.15 : 0.3 }}
            className="overflow-hidden border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="p-3 sm:p-4 md:p-5">
              <div className="flex items-center justify-between mb-2 sm:mb-2.5 md:mb-3 gap-2">
                <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-1.5 sm:gap-2">
                  <Code2 size={14} className="sm:w-4 sm:h-4" />
                  SQL Query
                </h4>
                <motion.button
                  whileHover={{ scale: !isMobile ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-md md:rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5 transition-all min-h-[36px] sm:min-h-[40px]"
                  style={{
                    background: copied 
                      ? 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.3) 100%)'
                      : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                  aria-label={copied ? 'SQL copied' : 'Copy SQL query'}
                >
                  {copied ? (
                    <>
                      <Check size={12} className="sm:w-3.5 sm:h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="sm:w-3.5 sm:h-3.5 text-gray-400" />
                      <span className="text-gray-300 hidden sm:inline">Copy SQL</span>
                    </>
                  )}
                </motion.button>
              </div>
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] sm:text-xs font-mono text-gray-300 p-2 sm:p-3 md:p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <code>{sqlQuery.trim()}</code>
              </motion.pre>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-2.5 md:mt-3 leading-relaxed">
                This SQL query extracts the data displayed in the chart above. It focuses on analyzing naming conventions,
                textual patterns, and characteristics within the Classic Models database.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
