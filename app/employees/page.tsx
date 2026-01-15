'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import MobileMenuButton from '@/components/MobileMenuButton'
import ChartWithDetails from '@/components/ChartWithDetails'
import MetricCard from '@/components/MetricCard'
import { Users, Mail, Briefcase, TrendingUp, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { queries } from '@/lib/queries'
import { queryMetadata } from '@/lib/queryMetadata'

export default function EmployeesPage() {
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
        const employeeQueries = [
          'employeeNamePatterns',
          'emailDomainAnalysis',
          'jobTitleAnalysis',
          'employeeNameDiversity',
          'employeeNameByTitle',
          'employeeEmailPatterns',
        ]
        
        const results: any = {}
        for (const query of employeeQueries) {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
              <span className="text-white">Employees</span>
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
                  Employee Analysis
                </h1>
                <p className="text-gray-300/90 mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base lg:text-lg">
                  Comprehensive analysis of employee names, job titles, and email patterns
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <MetricCard
              title="Total Employees"
              value={data.employeeNamePatterns?.length || 0}
              icon={Users}
              trend="+12%"
              delay={0}
            />
            <MetricCard
              title="Email Domains"
              value={data.emailDomainAnalysis?.length || 0}
              icon={Mail}
              delay={0.1}
            />
            <MetricCard
              title="Job Titles"
              value={data.jobTitleAnalysis?.length || 0}
              icon={Briefcase}
              delay={0.2}
            />
            <MetricCard
              title="Avg Name Length"
              value={
                data.employeeNamePatterns?.length > 0
                  ? Math.round(
                      data.employeeNamePatterns.reduce(
                        (acc: number, item: any) => acc + (item.TotalLength || 0),
                        0
                      ) / data.employeeNamePatterns.length
                    )
                  : 0
              }
              icon={TrendingUp}
              delay={0.3}
            />
          </div>

          {/* Advanced Visualizations */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              Advanced Employee Analytics
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <ChartWithDetails
                title="Employee Name Patterns"
                description={metadata.employeeNamePatterns?.description || "Analyzes employee names"}
                sqlQuery={queries.employeeNamePatterns}
                data={data.employeeNamePatterns?.slice(0, 20) || []}
                type="bar"
                xKey="FullName"
                yKey="TotalLength"
                delay={0.4}
                insights={metadata.employeeNamePatterns?.insights || []}
              />

              <ChartWithDetails
                title="Email Domain Distribution"
                description={metadata.emailDomainAnalysis?.description || "Analyzes email domains"}
                sqlQuery={queries.emailDomainAnalysis}
                data={data.emailDomainAnalysis || []}
                type="pie"
                xKey="Domain"
                yKey="EmployeeCount"
                delay={0.5}
                insights={metadata.emailDomainAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Job Title Length Analysis"
                description={metadata.jobTitleAnalysis?.description || "Analyzes job titles"}
                sqlQuery={queries.jobTitleAnalysis}
                data={data.jobTitleAnalysis || []}
                type="bar"
                xKey="jobTitle"
                yKey="TitleLength"
                delay={0.6}
                insights={metadata.jobTitleAnalysis?.insights || []}
              />

              <ChartWithDetails
                title="Employee Name Diversity by Office"
                description={metadata.employeeNameDiversity?.description || "Analyzes name diversity"}
                sqlQuery={queries.employeeNameDiversity}
                data={data.employeeNameDiversity || []}
                type="bar"
                xKey="city"
                yKey="FirstNameDiversity"
                delay={0.7}
                insights={metadata.employeeNameDiversity?.insights || []}
              />

              <ChartWithDetails
                title="Employee Name Length by Job Title"
                description={metadata.employeeNameByTitle?.description || "Analyzes names by title"}
                sqlQuery={queries.employeeNameByTitle}
                data={data.employeeNameByTitle || []}
                type="bar"
                xKey="jobTitle"
                yKey="AvgFullNameLength"
                delay={0.8}
                insights={metadata.employeeNameByTitle?.insights || []}
              />

              <ChartWithDetails
                title="Employee Email Prefix Patterns"
                description={metadata.employeeEmailPatterns?.description || "Analyzes email prefixes"}
                sqlQuery={queries.employeeEmailPatterns}
                data={data.employeeEmailPatterns?.slice(0, 15) || []}
                type="bar"
                xKey="EmailPrefix"
                yKey="Frequency"
                delay={0.9}
                insights={metadata.employeeEmailPatterns?.insights || []}
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
