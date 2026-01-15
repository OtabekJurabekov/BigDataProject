'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import MobileMenuButton from '@/components/MobileMenuButton'
import ChartWithDetails from '@/components/ChartWithDetails'
import MetricCard from '@/components/MetricCard'
import { Package, TrendingUp, BarChart3, Sparkles, Layers } from 'lucide-react'
import Link from 'next/link'
import { queries } from '@/lib/queries'
import { queryMetadata } from '@/lib/queryMetadata'

export default function ProductsPage() {
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
        const productQueries = [
          'productNameAnalysis',
          'productNameStartChars',
          'productLineAnalysis',
          'vendorNameAnalysis',
          'productNamePatterns',
          'productNameCharFrequency',
          'productNameSimilarity',
          'productNameSpecialChars',
          'productNameReadability',
          'productNameYearPatterns',
          'productNameDescriptiveWords',
        ]
        
        const results: any = {}
        for (const query of productQueries) {
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
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
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
              <span className="text-white">Products</span>
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
                  Product Analysis
                </h1>
                <p className="text-gray-300/90 mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                  Deep dive into product naming conventions, patterns, and textual characteristics
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <MetricCard
              title="Total Products"
              value={data.productNameAnalysis?.length || 0}
              icon={Package}
              trend="+15%"
              delay={0}
            />
            <MetricCard
              title="Product Lines"
              value={data.productLineAnalysis?.length || 0}
              icon={Layers}
              delay={0.1}
            />
            <MetricCard
              title="Avg Name Length"
              value={
                data.productNameAnalysis?.length > 0
                  ? Math.round(
                      data.productNameAnalysis.reduce(
                        (acc: number, item: any) => acc + (item.NameLength || 0),
                        0
                      ) / data.productNameAnalysis.length
                    )
                  : 0
              }
              icon={TrendingUp}
              delay={0.2}
            />
            <MetricCard
              title="Vendors"
              value={data.vendorNameAnalysis?.length || 0}
              icon={BarChart3}
              delay={0.3}
            />
          </div>

          {/* Advanced Visualizations */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              Advanced Product Analytics
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <ChartWithDetails
                title="Product Name Length Analysis"
                description={metadata.productNameAnalysis?.description || "Analyzes product name lengths"}
                sqlQuery={queries.productNameAnalysis}
                data={data.productNameAnalysis?.slice(0, 20) || []}
                type="line"
                xKey="productName"
                yKey="NameLength"
                delay={0.4}
                insights={metadata.productNameAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Starting Characters"
                description={metadata.productNameStartChars?.description || "Analyzes starting characters"}
                sqlQuery={queries.productNameStartChars}
                data={data.productNameStartChars || []}
                type="bar"
                xKey="StartChar"
                yKey="Frequency"
                delay={0.5}
                insights={metadata.productNameStartChars?.insights || []}
              />

              <ChartWithDetails
                title="Product Line Analysis"
                description={metadata.productLineAnalysis?.description || "Analyzes product lines"}
                sqlQuery={queries.productLineAnalysis}
                data={data.productLineAnalysis || []}
                type="bar"
                xKey="productLine"
                yKey="ProductCount"
                delay={0.6}
                insights={metadata.productLineAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Vendor Name Length Distribution"
                description={metadata.vendorNameAnalysis?.description || "Analyzes vendor names"}
                sqlQuery={queries.vendorNameAnalysis}
                data={data.vendorNameAnalysis?.slice(0, 15) || []}
                type="bar"
                xKey="productVendor"
                yKey="VendorNameLength"
                delay={0.7}
                insights={metadata.vendorNameAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Similarity Patterns"
                description={metadata.productNameSimilarity?.description || "Analyzes naming similarity"}
                sqlQuery={queries.productNameSimilarity}
                data={data.productNameSimilarity || []}
                type="bar"
                xKey="productLine"
                yKey="SimilarityRatio"
                delay={0.8}
                insights={metadata.productNameSimilarity?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Descriptive Words"
                description={metadata.productNameDescriptiveWords?.description || "Analyzes descriptive words"}
                sqlQuery={queries.productNameDescriptiveWords}
                data={data.productNameDescriptiveWords || []}
                type="pie"
                xKey="Word"
                yKey="Frequency"
                delay={0.9}
                insights={metadata.productNameDescriptiveWords?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Readability Score"
                description={metadata.productNameReadability?.description || "Analyzes readability"}
                sqlQuery={queries.productNameReadability}
                data={data.productNameReadability?.slice(0, 20) || []}
                type="area"
                xKey="productName"
                yKey="Length"
                delay={1.0}
                insights={metadata.productNameReadability?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Year Patterns"
                description={metadata.productNameYearPatterns?.description || "Analyzes year patterns"}
                sqlQuery={queries.productNameYearPatterns}
                data={data.productNameYearPatterns?.filter((item: any) => item.YearFound !== 'No Year').slice(0, 15) || []}
                type="bar"
                xKey="YearFound"
                yKey="Frequency"
                delay={1.1}
                insights={metadata.productNameYearPatterns?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Special Characters"
                description={metadata.productNameSpecialChars?.description || "Analyzes special characters"}
                sqlQuery={queries.productNameSpecialChars}
                data={data.productNameSpecialChars || []}
                type="bar"
                xKey="productLine"
                yKey="HasNumbers"
                delay={1.2}
                insights={metadata.productNameSpecialChars?.insights || []}
              />

              <ChartWithDetails
                title="Product Name Pattern Categories"
                description={metadata.productNamePatterns?.description || "Analyzes pattern categories"}
                sqlQuery={queries.productNamePatterns}
                data={data.productNamePatterns?.reduce((acc: any[], item: any) => {
                  const existing = acc.find(x => x.PatternCategory === item.PatternCategory)
                  if (existing) {
                    existing.count = (existing.count || 0) + 1
                  } else {
                    acc.push({ PatternCategory: item.PatternCategory, count: 1 })
                  }
                  return acc
                }, []) || []}
                type="pie"
                xKey="PatternCategory"
                yKey="count"
                delay={1.3}
                insights={metadata.productNamePatterns?.insights || []}
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
