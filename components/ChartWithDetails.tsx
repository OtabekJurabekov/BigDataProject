'use client'

import { useState } from 'react'
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl overflow-hidden"
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
      whileHover={{
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
      <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="gradient-text">{title}</span>
            </h3>
            <p className="text-gray-300/90 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDetails(!showDetails)}
              className="p-2.5 rounded-xl transition-all relative overflow-hidden group"
              style={{
                background: showDetails 
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)'
                  : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Info 
                size={18} 
                className={showDetails ? 'text-white' : 'text-gray-400 group-hover:text-white'} 
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSQL(!showSQL)}
              className="p-2.5 rounded-xl transition-all relative overflow-hidden group"
              style={{
                background: showSQL 
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)'
                  : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Code2 
                size={18} 
                className={showSQL ? 'text-white' : 'text-gray-400 group-hover:text-white'} 
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                  <Info size={16} />
                  Key Insights
                </h4>
                {insights.length > 0 ? (
                  <ul className="space-y-2">
                    {insights.map((insight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-gray-300/90 flex items-start gap-2"
                      >
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{insight}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Analyzing the data reveals interesting patterns in naming conventions and textual characteristics.
                  </p>
                )}
              </div>
              
              <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <p className="text-xs text-gray-400 leading-relaxed">
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Code2 size={16} />
                  SQL Query
                </h4>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all"
                  style={{
                    background: copied 
                      ? 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(5,150,105,0.3) 100%)'
                      : 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-gray-400" />
                      <span className="text-gray-300">Copy SQL</span>
                    </>
                  )}
                </motion.button>
              </div>
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-mono text-gray-300 p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <code>{sqlQuery.trim()}</code>
              </motion.pre>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
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
