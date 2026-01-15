'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import MobileMenuButton from '@/components/MobileMenuButton'
import ChartWithDetails from '@/components/ChartWithDetails'
import MetricCard from '@/components/MetricCard'
import { Users, Globe, TrendingUp, BarChart3, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { queries } from '@/lib/queries'
import { queryMetadata } from '@/lib/queryMetadata'

export default function CustomersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        if (window.innerWidth < 768) {
          setSidebarOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerQueries = [
          'customerNameLength',
          'countryNameLength',
          'contactNamePatterns',
          'customerNameWordCount',
          'customerNameEndings',
          'customerNameComplexity',
          'customerNameCapitalization',
          'customerNameGeographic',
          'customerNameAbbreviations',
          'customerNameUniqueness',
          'contactNameCorrelation',
        ]
        
        const results: any = {}
        for (const query of customerQueries) {
          try {
            const response = await fetch(`/api/analytics?type=${query}`)
            const json = await response.json()
            results[query] = json.data || []
          } catch (err) {
            console.error(`Error fetching ${query}:`, err)
            results[query] = []
          }
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
      <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
        <MobileMenuButton isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 sm:h-28 md:h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const metadata = queryMetadata

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
      <MobileMenuButton isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto w-full">
          <div className="min-h-full flex flex-col">
            <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 relative"
          >
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Customers</span>
            </div>
            <div className="flex items-center gap-4">
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text tracking-tight">
                  Customer Analysis
                </h1>
                <p className="text-gray-300/90 mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                  Comprehensive analysis of customer naming conventions, patterns, and textual characteristics
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <MetricCard
              title="Total Customers"
              value={data.customerNameLength?.length || 0}
              icon={Users}
              trend="+8%"
              delay={0}
            />
            <MetricCard
              title="Countries"
              value={data.countryNameLength?.length || 0}
              icon={Globe}
              trend="+5%"
              delay={0.1}
            />
            <MetricCard
              title="Avg Name Length"
              value={
                data.customerNameLength?.length > 0
                  ? Math.round(
                      data.customerNameLength.reduce(
                        (acc: number, item: any) => acc + (item.NameLength || 0),
                        0
                      ) / data.customerNameLength.length
                    )
                  : 0
              }
              icon={TrendingUp}
              delay={0.2}
            />
            <MetricCard
              title="Contact Patterns"
              value={data.contactNamePatterns?.length || 0}
              icon={BarChart3}
              delay={0.3}
            />
          </div>

          {/* Advanced Visualizations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              Advanced Analytics
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Customer Name Length Distribution */}
              <ChartWithDetails
                title="Customer Name Length Distribution"
                description={metadata.customerNameLength?.description || "Analyzes customer name lengths"}
                sqlQuery={queries.customerNameLength}
                data={data.customerNameLength?.slice(0, 20) || []}
                type="bar"
                xKey="customerName"
                yKey="NameLength"
                delay={0.4}
                insights={metadata.customerNameLength?.insights || []}
              />

              {/* Country Name Length */}
              <ChartWithDetails
                title="Country Name Length Analysis"
                description={metadata.countryNameLength?.description || "Analyzes country name lengths"}
                sqlQuery={queries.countryNameLength}
                data={data.countryNameLength || []}
                type="bar"
                xKey="Name"
                yKey="NameLength"
                delay={0.5}
                insights={metadata.countryNameLength?.insights || []}
              />

              {/* Customer Name Word Count */}
              <ChartWithDetails
                title="Customer Name Word Count Analysis"
                description={metadata.customerNameWordCount?.description || "Analyzes word count in customer names"}
                sqlQuery={queries.customerNameWordCount}
                data={data.customerNameWordCount?.slice(0, 20) || []}
                type="line"
                xKey="customerName"
                yKey="WordCount"
                delay={0.6}
                insights={metadata.customerNameWordCount?.insights || []}
              />

              {/* Customer Name Endings */}
              <ChartWithDetails
                title="Customer Name Ending Patterns"
                description={metadata.customerNameEndings?.description || "Analyzes common ending patterns"}
                sqlQuery={queries.customerNameEndings}
                data={data.customerNameEndings || []}
                type="bar"
                xKey="Ending"
                yKey="Frequency"
                delay={0.7}
                insights={metadata.customerNameEndings?.insights || []}
              />

              {/* Customer Name Complexity */}
              <ChartWithDetails
                title="Customer Name Complexity Score"
                description={metadata.customerNameComplexity?.description || "Analyzes name complexity"}
                sqlQuery={queries.customerNameComplexity}
                data={data.customerNameComplexity?.slice(0, 20) || []}
                type="area"
                xKey="customerName"
                yKey="ComplexityScore"
                delay={0.8}
                insights={metadata.customerNameComplexity?.insights || []}
              />

              {/* Customer Name Capitalization */}
              <ChartWithDetails
                title="Customer Name Capitalization Patterns"
                description={metadata.customerNameCapitalization?.description || "Analyzes capitalization patterns"}
                sqlQuery={queries.customerNameCapitalization}
                data={data.customerNameCapitalization || []}
                type="pie"
                xKey="CapitalizationPattern"
                yKey="Frequency"
                delay={0.9}
                insights={metadata.customerNameCapitalization?.insights || []}
              />

              {/* Geographic Name Patterns */}
              <ChartWithDetails
                title="Customer Name Geographic Patterns"
                description={metadata.customerNameGeographic?.description || "Analyzes geographic naming patterns"}
                sqlQuery={queries.customerNameGeographic}
                data={data.customerNameGeographic || []}
                type="bar"
                xKey="country"
                yKey="AvgNameLength"
                delay={1.0}
                insights={metadata.customerNameGeographic?.insights || []}
              />

              {/* Customer Name Abbreviations */}
              <ChartWithDetails
                title="Business Abbreviation Patterns"
                description={metadata.customerNameAbbreviations?.description || "Analyzes business abbreviations"}
                sqlQuery={queries.customerNameAbbreviations}
                data={data.customerNameAbbreviations || []}
                type="pie"
                xKey="AbbreviationType"
                yKey="Frequency"
                delay={1.1}
                insights={metadata.customerNameAbbreviations?.insights || []}
              />

              {/* Contact Name Correlation */}
              <ChartWithDetails
                title="Contact Name Length Correlation"
                description={metadata.contactNameCorrelation?.description || "Analyzes contact name correlations"}
                sqlQuery={queries.contactNameCorrelation}
                data={data.contactNameCorrelation || []}
                type="bar"
                xKey="country"
                yKey="AvgTotalLength"
                delay={1.2}
                insights={metadata.contactNameCorrelation?.insights || []}
              />

              {/* Customer Name Uniqueness */}
              <ChartWithDetails
                title="Customer Name Uniqueness by Country"
                description={metadata.customerNameUniqueness?.description || "Analyzes name uniqueness"}
                sqlQuery={queries.customerNameUniqueness}
                data={data.customerNameUniqueness || []}
                type="bar"
                xKey="country"
                yKey="UniquenessRatio"
                delay={1.3}
                insights={metadata.customerNameUniqueness?.insights || []}
              />
            </div>
          </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
      {commandPaletteOpen && (
        <CommandPalette onClose={() => setCommandPaletteOpen(false)} />
      )}
    </div>
  )
}
