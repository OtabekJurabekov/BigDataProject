'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import ChartWithDetails from '@/components/ChartWithDetails'
import MetricCard from '@/components/MetricCard'
import { BarChart3, TrendingUp, Sparkles, Zap, Target } from 'lucide-react'
import Link from 'next/link'
import { queries } from '@/lib/queries'

export default function AnalyticsPage() {
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
        const analyticsQueries = [
          'productNameCharFrequency',
          'customerNameComplexity',
          'productNameSimilarity',
          'employeeNameDiversity',
          'customerNameCapitalization',
          'productNameSpecialChars',
          'contactNameCorrelation',
          'productNameReadability',
          'employeeEmailPatterns',
          'customerNameGeographic',
        ]
        
        const results: any = {}
        for (const query of analyticsQueries) {
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
              <span className="text-white">Advanced Analytics</span>
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
                  Advanced Analytics
                </h1>
                <p className="text-gray-300/90 mt-2 text-lg">
                  Cross-entity analysis and deep insights into naming patterns and textual characteristics
                </p>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Analyses"
              value="30+"
              icon={BarChart3}
              delay={0}
            />
            <MetricCard
              title="Data Points"
              value="10K+"
              icon={Target}
              delay={0.1}
            />
            <MetricCard
              title="Patterns Found"
              value="50+"
              icon={Zap}
              delay={0.2}
            />
            <MetricCard
              title="Insights"
              value="100+"
              icon={Sparkles}
              delay={0.3}
            />
          </div>

          {/* Advanced Visualizations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-purple-400" size={24} />
              Cross-Entity Analysis
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartWithDetails
                title="Product Name Character Frequency"
                description="Analyzes vowel frequency (a, e, i, o, u) in product names by product line. This reveals linguistic patterns and can help understand naming aesthetics and pronunciation preferences across different product categories."
                sqlQuery={queries.productNameCharFrequency}
                data={data.productNameCharFrequency || []}
                type="bar"
                xKey="productLine"
                yKey="CharA"
                delay={0.4}
                insights={[
                  "Vowel distribution affects name pronunciation and memorability",
                  "Different product lines may have different linguistic patterns",
                  "Character frequency reveals naming style preferences"
                ]}
              />

              <ChartWithDetails
                title="Customer Name Complexity Analysis"
                description="Calculates a complexity score based on name length, word count, and capitalization. Higher scores indicate more complex naming structures that may require special handling in databases, search systems, or display interfaces."
                sqlQuery={queries.customerNameComplexity}
                data={data.customerNameComplexity?.slice(0, 20) || []}
                type="area"
                xKey="customerName"
                yKey="ComplexityScore"
                delay={0.5}
                insights={[
                  "Complexity scores help identify names needing special formatting",
                  "Higher complexity may indicate formal business entities",
                  "Complexity affects database indexing and search functionality"
                ]}
              />

              <ChartWithDetails
                title="Product Name Similarity Patterns"
                description="Measures naming similarity within product lines by comparing unique prefixes. Lower similarity ratios indicate more diverse naming, while higher ratios suggest consistent patterns that improve brand recognition."
                sqlQuery={queries.productNameSimilarity}
                data={data.productNameSimilarity || []}
                type="bar"
                xKey="productLine"
                yKey="SimilarityRatio"
                delay={0.6}
                insights={[
                  "Similarity ratios reveal naming consistency within product lines",
                  "Consistent naming improves brand recognition",
                  "Diverse naming may indicate broader product ranges"
                ]}
              />

              <ChartWithDetails
                title="Employee Name Diversity by Office"
                description="Analyzes name diversity by office location, measuring unique first and last names relative to total employees. Higher diversity indicates more multicultural teams and can reflect organizational culture and hiring practices."
                sqlQuery={queries.employeeNameDiversity}
                data={data.employeeNameDiversity || []}
                type="bar"
                xKey="city"
                yKey="FirstNameDiversity"
                delay={0.7}
                insights={[
                  "Name diversity reflects workplace multiculturalism",
                  "Higher diversity may indicate global or diverse hiring",
                  "Diversity metrics help understand organizational culture"
                ]}
              />

              <ChartWithDetails
                title="Customer Name Capitalization Patterns"
                description="Categorizes customer names by capitalization patterns (ALL_CAPS, all_lower, Title_Case, Mixed_Case). This reveals data quality, naming convention consistency, and can help identify data entry issues or standardization needs."
                sqlQuery={queries.customerNameCapitalization}
                data={data.customerNameCapitalization || []}
                type="pie"
                xKey="CapitalizationPattern"
                yKey="Frequency"
                delay={0.8}
                insights={[
                  "Capitalization patterns reveal data entry consistency",
                  "Mixed patterns may indicate data quality issues",
                  "Consistent capitalization improves data processing"
                ]}
              />

              <ChartWithDetails
                title="Product Name Special Characters"
                description="Identifies special characters (&, -, ', ., numbers) in product names by product line. This reveals naming conventions, formatting patterns, and affects search capabilities, filtering, and data processing systems."
                sqlQuery={queries.productNameSpecialChars}
                data={data.productNameSpecialChars || []}
                type="bar"
                xKey="productLine"
                yKey="HasNumbers"
                delay={0.9}
                insights={[
                  "Special characters affect search and filtering capabilities",
                  "Character usage varies by product line",
                  "Special characters may indicate specific naming conventions"
                ]}
              />

              <ChartWithDetails
                title="Contact Name Length Correlation"
                description="Analyzes the correlation between first and last name lengths by country. This reveals cultural naming patterns, contact name structures, and helps understand how different regions structure personal names in business contexts."
                sqlQuery={queries.contactNameCorrelation}
                data={data.contactNameCorrelation || []}
                type="bar"
                xKey="country"
                yKey="AvgTotalLength"
                delay={1.0}
                insights={[
                  "Name length correlations vary by geographic region",
                  "Cultural patterns affect contact name structures",
                  "Understanding patterns helps in contact management"
                ]}
              />

              <ChartWithDetails
                title="Product Name Readability Score"
                description="Calculates readability scores based on name length and word count. Higher readability indicates names that are easier to read and remember, which can improve marketing effectiveness, customer recall, and brand recognition."
                sqlQuery={queries.productNameReadability}
                data={data.productNameReadability?.slice(0, 20) || []}
                type="area"
                xKey="productName"
                yKey="Length"
                delay={1.1}
                insights={[
                  "Readable names improve customer recognition and recall",
                  "Shorter names with fewer words are generally more readable",
                  "Readability affects marketing and branding effectiveness"
                ]}
              />

              <ChartWithDetails
                title="Employee Email Prefix Patterns"
                description="Analyzes email prefix patterns (the part before @) to understand email naming conventions. This reveals organizational email policies, naming structures (first.last, firstlast, etc.), and helps identify standardization patterns."
                sqlQuery={queries.employeeEmailPatterns}
                data={data.employeeEmailPatterns?.slice(0, 15) || []}
                type="bar"
                xKey="EmailPrefix"
                yKey="Frequency"
                delay={1.2}
                insights={[
                  "Email prefixes reveal naming conventions (first.last, firstlast, etc.)",
                  "Consistent patterns indicate formal email policies",
                  "Prefix length affects email address complexity"
                ]}
              />

              <ChartWithDetails
                title="Customer Name Geographic Patterns"
                description="Examines customer name length statistics by country, including averages, min, max, and standard deviation. This reveals geographic naming patterns, data distribution characteristics, and helps understand international business naming conventions."
                sqlQuery={queries.customerNameGeographic}
                data={data.customerNameGeographic || []}
                type="bar"
                xKey="country"
                yKey="AvgNameLength"
                delay={1.3}
                insights={[
                  "Name length statistics vary significantly by country",
                  "Standard deviation reveals naming consistency within countries",
                  "Geographic patterns help in international business strategies"
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
