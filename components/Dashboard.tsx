'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MetricCard from './MetricCard'
import ChartCard from './ChartCard'
import ChartWithDetails from './ChartWithDetails'
import { queries } from '@/lib/queries'
import { queryMetadata } from '@/lib/queryMetadata'
import { 
  Globe, 
  Users, 
  Package, 
  Building2,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react'

interface AnalyticsData {
  [key: string]: any[]
}

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsData>({})
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queries = [
          'countryNameLength',
          'customerNameLength',
          'productNameAnalysis',
          'employeeNamePatterns',
          'cityNameLength',
          'productNameStartChars',
        ]

        const results: AnalyticsData = {}
        for (const query of queries) {
          const response = await fetch(`/api/analytics?type=${query}`)
          const json = await response.json()
          results[query] = json.data || []
        }

        setData(results)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-white/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  const countryData = data.countryNameLength || []
  const customerData = data.customerNameLength || []
  const productData = data.productNameAnalysis || []
  const employeeData = data.employeeNamePatterns || []
  const cityData = data.cityNameLength || []
  const startCharsData = data.productNameStartChars || []

  return (
    <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 sm:space-y-3 md:space-y-4 relative"
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <motion.div
            className="w-1 h-8 sm:h-10 md:h-12 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #a78bfa 0%, #06b6d4 50%, #ec4899 100%)',
            }}
            animate={{
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div>
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Analytics Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-300/90 mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Comprehensive analysis of naming conventions and textual patterns
            </motion.p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <Link href="/customers" aria-label="View customer analytics">
          <MetricCard
            title="Customers"
            value={customerData.length}
            icon={Users}
            trend="+8%"
            delay={0}
          />
        </Link>
        <Link href="/products" aria-label="View product analytics">
          <MetricCard
            title="Products"
            value={productData.length}
            icon={Package}
            trend="+15%"
            delay={0.1}
          />
        </Link>
        <Link href="/offices" aria-label="View office analytics">
          <MetricCard
            title="Offices"
            value={cityData.length}
            icon={Building2}
            trend="+5%"
            delay={0.2}
          />
        </Link>
        <Link href="/employees" aria-label="View employee analytics">
          <MetricCard
            title="Employees"
            value={employeeData.length}
            icon={Users}
            trend="+12%"
            delay={0.3}
          />
        </Link>
      </div>

      {/* Quick Navigation */}
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={isMobile ? {} : { opacity: 1, y: 0 }}
        transition={isMobile ? {} : { delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4"
      >
        <Link href="/customers" aria-label="Navigate to customer analytics page">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 10 }}
            animate={isMobile ? {} : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.25 }}
            whileHover={isMobile ? {} : { scale: 1.05, x: 6, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden cursor-pointer relative min-h-[80px] sm:min-h-[100px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.25)',
            }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(6,182,212,0.25) 100%)',
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
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                <motion.div
                  className="p-2 sm:p-2.5 rounded-lg md:rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
                    boxShadow: '0 4px 16px 0 rgba(139,92,246,0.3)',
                  }}
                  whileHover={{ scale: !isMobile ? 1.15 : 1, rotate: !isMobile ? 5 : 0 }}
                >
                  <Users className="text-white sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" size={18} strokeWidth={2.5} aria-hidden="true" />
                </motion.div>
                <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Customers</span>
              </div>
              {!isMobile && (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="hidden sm:block"
                >
                  <ArrowRight className="text-gray-400 group-hover:text-white transition-colors md:w-5 md:h-5" size={18} aria-hidden="true" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </Link>
        <Link href="/products" aria-label="Navigate to product analytics page">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 10 }}
            animate={isMobile ? {} : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.3 }}
            whileHover={isMobile ? {} : { scale: 1.05, x: 6, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden cursor-pointer relative min-h-[80px] sm:min-h-[100px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.25)',
            }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.25) 100%)',
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
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                <motion.div
                  className="p-2 sm:p-2.5 rounded-lg md:rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 100%)',
                    boxShadow: '0 4px 16px 0 rgba(236,72,153,0.3)',
                  }}
                  whileHover={{ scale: !isMobile ? 1.15 : 1, rotate: !isMobile ? 5 : 0 }}
                >
                  <Package className="text-white sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" size={18} strokeWidth={2.5} aria-hidden="true" />
                </motion.div>
                <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Products</span>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="hidden sm:block"
              >
                <ArrowRight className="text-gray-400 group-hover:text-white transition-colors md:w-5 md:h-5" size={18} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </Link>
        <Link href="/offices" aria-label="Navigate to office analytics page">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 10 }}
            animate={isMobile ? {} : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.35 }}
            whileHover={isMobile ? {} : { scale: 1.05, x: 6, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden cursor-pointer relative min-h-[80px] sm:min-h-[100px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.25)',
            }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.25) 100%)',
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
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                <motion.div
                  className="p-2 sm:p-2.5 rounded-lg md:rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
                    boxShadow: '0 4px 16px 0 rgba(59,130,246,0.3)',
                  }}
                  whileHover={{ scale: !isMobile ? 1.15 : 1, rotate: !isMobile ? 5 : 0 }}
                >
                  <Building2 className="text-white sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" size={18} strokeWidth={2.5} aria-hidden="true" />
                </motion.div>
                <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Offices</span>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="hidden sm:block"
              >
                <ArrowRight className="text-gray-400 group-hover:text-white transition-colors md:w-5 md:h-5" size={18} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </Link>
        <Link href="/employees" aria-label="Navigate to employee analytics page">
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 10 }}
            animate={isMobile ? {} : { opacity: 1, y: 0 }}
            transition={isMobile ? {} : { delay: 0.4 }}
            whileHover={isMobile ? {} : { scale: 1.05, x: 6, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden cursor-pointer relative min-h-[80px] sm:min-h-[100px]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
              backdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.25)',
            }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.25) 0%, rgba(139,92,246,0.25) 100%)',
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
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                <motion.div
                  className="p-2 sm:p-2.5 rounded-lg md:rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.3) 100%)',
                    boxShadow: '0 4px 16px 0 rgba(236,72,153,0.3)',
                  }}
                  whileHover={{ scale: !isMobile ? 1.15 : 1, rotate: !isMobile ? 5 : 0 }}
                >
                  <Users className="text-white sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]" size={18} strokeWidth={2.5} aria-hidden="true" />
                </motion.div>
                <span className="text-white font-semibold text-sm sm:text-base md:text-lg">Employees</span>
              </div>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                className="hidden sm:block"
              >
                <ArrowRight className="text-gray-400 group-hover:text-white transition-colors md:w-5 md:h-5" size={18} aria-hidden="true" />
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Charts Grid */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="text-purple-400 sm:w-5 sm:h-5 md:w-6 md:h-6" size={20} />
          Key Visualizations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWithDetails
            title="Country Name Length Distribution"
            description={queryMetadata.countryNameLength?.description || "Analyzes country name lengths"}
            sqlQuery={queries.countryNameLength}
            data={countryData.slice(0, 10)}
            type="bar"
            xKey="Name"
            yKey="NameLength"
            delay={0.4}
            insights={queryMetadata.countryNameLength?.insights || []}
          />
          <ChartWithDetails
            title="Product Name Length Analysis"
            description={queryMetadata.productNameAnalysis?.description || "Analyzes product name lengths"}
            sqlQuery={queries.productNameAnalysis}
            data={productData.slice(0, 15)}
            type="line"
            xKey="productName"
            yKey="NameLength"
            delay={0.5}
            insights={queryMetadata.productNameAnalysis?.insights || []}
          />
          <ChartWithDetails
            title="Employee Name Patterns"
            description={queryMetadata.employeeNamePatterns?.description || "Analyzes employee names"}
            sqlQuery={queries.employeeNamePatterns}
            data={employeeData.slice(0, 20)}
            type="bar"
            xKey="FullName"
            yKey="TotalLength"
            delay={0.6}
            insights={queryMetadata.employeeNamePatterns?.insights || []}
          />
          <ChartWithDetails
            title="Product Name Starting Characters"
            description={queryMetadata.productNameStartChars?.description || "Analyzes starting characters"}
            sqlQuery={queries.productNameStartChars}
            data={startCharsData}
            type="bar"
            xKey="StartChar"
            yKey="Frequency"
            delay={0.7}
            insights={queryMetadata.productNameStartChars?.insights || []}
          />
        </div>
      </div>

      {/* Additional Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="group rounded-2xl p-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-cyan-300" size={24} />
              <h3 className="text-lg font-semibold text-white">Average Name Length</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300/90">Customers</span>
                <span className="font-mono text-white">
                  {customerData.length > 0
                    ? Math.round(
                        customerData.reduce(
                          (acc, item) => acc + (item.NameLength || 0),
                          0
                        ) / customerData.length
                      )
                    : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300/90">Products</span>
                <span className="font-mono text-white">
                  {productData.length > 0
                    ? Math.round(
                        productData.reduce(
                          (acc, item) => acc + (item.NameLength || 0),
                          0
                        ) / productData.length
                      )
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="group rounded-2xl p-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-purple-300" size={24} />
              <h3 className="text-lg font-semibold text-white">Text Patterns</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300/90">
                Most common starting character: <span className="text-white font-mono font-semibold">
                  {startCharsData[0]?.StartChar || 'N/A'}
                </span>
              </div>
              <div className="text-gray-300/90">
                Frequency: <span className="text-white font-mono font-semibold">
                  {startCharsData[0]?.Frequency || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="group rounded-2xl p-6 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-cyan-300" size={24} />
              <h3 className="text-lg font-semibold text-white">Employee Stats</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300/90">Total Employees</span>
                <span className="font-mono text-white">{employeeData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300/90">Avg Name Length</span>
                <span className="font-mono text-white">
                  {employeeData.length > 0
                    ? Math.round(
                        employeeData.reduce(
                          (acc, item) => acc + (item.TotalLength || 0),
                          0
                        ) / employeeData.length
                      )
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
