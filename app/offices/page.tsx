'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import ChartWithDetails from '@/components/ChartWithDetails'
import MetricCard from '@/components/MetricCard'
import { Building2, Globe, MapPin, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { queries } from '@/lib/queries'
import { queryMetadata } from '@/lib/queryMetadata'

export default function OfficesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeQueries = [
          'cityNameLength',
          'addressLengthAnalysis',
        ]
        
        const results: any = {}
        for (const query of officeQueries) {
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
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const metadata = queryMetadata

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="min-h-full flex flex-col">
            <div className="p-6 md:p-8 space-y-8">
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
              <span className="text-white">Offices</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                className="w-1 h-12 rounded-full"
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
                <h1 className="text-5xl font-extrabold gradient-text tracking-tight">
                  Office Analysis
                </h1>
                <p className="text-gray-300/90 mt-2 text-lg">
                  Analysis of office locations, cities, and address patterns
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Offices"
              value={data.cityNameLength?.length || 0}
              icon={Building2}
              trend="+3%"
              delay={0}
            />
            <MetricCard
              title="Cities"
              value={data.cityNameLength?.length || 0}
              icon={MapPin}
              delay={0.1}
            />
            <MetricCard
              title="Avg City Name Length"
              value={
                data.cityNameLength?.length > 0
                  ? Math.round(
                      data.cityNameLength.reduce(
                        (acc: number, item: any) => acc + (item.NameLength || 0),
                        0
                      ) / data.cityNameLength.length
                    )
                  : 0
              }
              icon={TrendingUp}
              delay={0.2}
            />
            <MetricCard
              title="Countries"
              value={new Set(data.cityNameLength?.map((item: any) => item.country) || []).size}
              icon={Globe}
              delay={0.3}
            />
          </div>

          {/* Advanced Visualizations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              Advanced Office Analytics
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWithDetails
                title="City Name Length Distribution"
                description={metadata.cityNameLength?.description || "Analyzes city name lengths"}
                sqlQuery={queries.cityNameLength}
                data={data.cityNameLength || []}
                type="bar"
                xKey="CityName"
                yKey="NameLength"
                delay={0.4}
                insights={metadata.cityNameLength?.insights || []}
              />

              <ChartWithDetails
                title="Address Length Analysis"
                description={metadata.addressLengthAnalysis?.description || "Analyzes address lengths"}
                sqlQuery={queries.addressLengthAnalysis}
                data={data.addressLengthAnalysis || []}
                type="line"
                xKey="city"
                yKey="AddressLength"
                delay={0.5}
                insights={metadata.addressLengthAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Office Distribution by Country"
                description="Analyzes the distribution of offices across different countries, showing geographic spread and concentration of business operations."
                sqlQuery={`
                  SELECT 
                    country,
                    COUNT(*) AS OfficeCount,
                    GROUP_CONCAT(DISTINCT city) AS Cities
                  FROM offices
                  GROUP BY country
                  ORDER BY OfficeCount DESC
                `}
                data={data.cityNameLength?.reduce((acc: any[], item: any) => {
                  const existing = acc.find(x => x.country === item.country)
                  if (existing) {
                    existing.OfficeCount = (existing.OfficeCount || 0) + (item.OfficeCount || 1)
                  } else {
                    acc.push({ country: item.country, OfficeCount: item.OfficeCount || 1 })
                  }
                  return acc
                }, []) || []}
                type="pie"
                xKey="country"
                yKey="OfficeCount"
                delay={0.6}
                insights={[
                  "Office distribution reveals geographic business strategy",
                  "Concentration in certain countries indicates market focus",
                  "Diversity shows global presence and expansion"
                ]}
              />

              <ChartWithDetails
                title="City Name Length vs Office Count"
                description="Examines the relationship between city name length and the number of offices, revealing patterns in location naming and business presence."
                sqlQuery={queries.cityNameLength}
                data={data.cityNameLength || []}
                type="area"
                xKey="CityName"
                yKey="OfficeCount"
                delay={0.7}
                insights={[
                  "Longer city names don't necessarily correlate with more offices",
                  "Office count varies independently of city name characteristics",
                  "Patterns reveal strategic location choices"
                ]}
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
