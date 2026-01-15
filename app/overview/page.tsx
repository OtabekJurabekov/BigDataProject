'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import MobileMenuButton from '@/components/MobileMenuButton'
import StructuredData from '@/components/StructuredData'
import { 
  Code, 
  Trophy, 
  Briefcase, 
  GraduationCap, 
  Target,
  Sparkles,
  Database,
  BarChart3,
  Zap,
  Users,
  Package,
  Building2,
  FileText,
  ArrowRight,
  ExternalLink,
  Linkedin,
  Instagram,
  Mail,
  Github
} from 'lucide-react'
import Link from 'next/link'

export default function OverviewPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Set sidebar open by default on desktop, closed on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
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

  const stats = [
    { label: 'Analytical Queries', value: '30+', icon: Database, color: 'from-purple-500 to-cyan-500' },
    { label: 'Visualizations', value: '40+', icon: BarChart3, color: 'from-cyan-500 to-blue-500' },
    { label: 'Data Points', value: '10K+', icon: Zap, color: 'from-blue-500 to-purple-500' },
    { label: 'Insights', value: '100+', icon: Sparkles, color: 'from-pink-500 to-purple-500' },
  ]

  const achievements = [
    { icon: Trophy, text: 'IOI 2023 (Hungary) Participant', color: 'text-yellow-400' },
    { icon: Code, text: '1400+ Algorithmic Problems Solved', color: 'text-green-400' },
    { icon: Briefcase, text: 'Back-End Developer at Asaxiy.uz', color: 'text-blue-400' },
    { icon: Target, text: 'Expert-Level Competitive Programmer', color: 'text-purple-400' },
  ]

  const features = [
    {
      title: 'Advanced Analytics',
      description: '30+ sophisticated SQL queries analyzing naming conventions, patterns, and textual characteristics across all database entities.',
      icon: BarChart3,
      color: 'from-purple-500 to-cyan-500',
    },
    {
      title: 'Interactive Visualizations',
      description: '40+ beautiful, interactive charts with glassmorphic design, smooth animations, and real-time data updates.',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Comprehensive Insights',
      description: 'Every visualization includes detailed descriptions, SQL code, and human-readable insights explaining the data patterns.',
      icon: Database,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Modern Architecture',
      description: 'Built with Next.js 14, TypeScript, MySQL, and Docker. Fully containerized for easy deployment and scalability.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/otabek-jurabekov-290302225/', icon: Linkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/otabek.jurabekov/', icon: Instagram },
    { name: 'Telegram', url: 'https://t.me/OtabekJurabekov', icon: Mail },
    { name: 'LeetCode', url: 'https://leetcode.com/u/OtabekJurabekov/', icon: Code },
    { name: 'Codeforces', url: 'https://codeforces.com/profile/OtabekJurabekov', icon: Trophy },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Classic Models Analytics Dashboard',
    description: 'Comprehensive data analytics platform exploring naming conventions, spelling patterns, and textual characteristics within the Classic Models database.',
    url: 'https://bigdata.ilmora.uz',
    applicationCategory: 'DataAnalysisApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Otabek Jurabekov',
      url: 'https://www.linkedin.com/in/otabek-jurabekov-290302225/',
      sameAs: [
        'https://www.linkedin.com/in/otabek-jurabekov-290302225/',
        'https://www.instagram.com/otabek.jurabekov/',
        'https://leetcode.com/u/OtabekJurabekov/',
        'https://codeforces.com/profile/OtabekJurabekov',
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    featureList: [
      '30+ SQL analytical queries',
      '40+ interactive visualizations',
      '10K+ data points analyzed',
      '100+ insights generated',
      'Real-time data updates',
      'Comprehensive database analysis',
    ],
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <motion.div
            animate={{ rotate: sidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {sidebarOpen ? (
              <Sparkles size={20} />
            ) : (
              <BarChart3 size={20} />
            )}
          </motion.div>
        </button>

        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto w-full">
            <div className="min-h-full flex flex-col">
              {/* Hero Section */}
              <section className="relative overflow-hidden px-4 sm:px-6 md:px-8 pt-16 sm:pt-12 pb-6 md:pb-8">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
                      filter: 'blur(80px)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      x: [0, 50, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
                      filter: 'blur(80px)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      x: [0, -40, 0],
                      y: [0, 40, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <motion.h1
                      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    >
                      <span className="gradient-text block">Classic Models</span>
                      <span className="text-white block mt-1 md:mt-2 text-2xl sm:text-3xl md:text-6xl lg:text-7xl">Analytics Dashboard</span>
                    </motion.h1>
                    <motion.p
                      className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6 px-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      A comprehensive data analytics platform exploring naming conventions, 
                      spelling patterns, and textual characteristics within the Classic Models database
                    </motion.p>
                    <motion.div
                      className="flex items-center justify-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl md:rounded-2xl relative overflow-hidden group"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.25)',
                        }}
                        whileHover={{ scale: window.innerWidth >= 768 ? 1.05 : 1, y: window.innerWidth >= 768 ? -2 : 0 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                          <motion.div
                            className="w-8 h-8 sm:w-10 sm:h-12 md:w-12 md:h-12 rounded-lg md:rounded-xl overflow-hidden relative flex-shrink-0"
                            style={{
                              border: '2px solid rgba(255,255,255,0.3)',
                              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                            }}
                            whileHover={{ scale: !isMobile ? 1.1 : 1, rotate: !isMobile ? 3 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 z-10" />
                            <img
                              src="/OtabekJurabekov.PNG"
                              alt="Otabek Jurabekov - Developer"
                              className="w-full h-full object-cover relative z-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10" />
                          </motion.div>
                          <div>
                            <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">Created by</p>
                            <p className="text-xs sm:text-sm md:text-base font-semibold text-white">Otabek Jurabekov</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {stats.map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: !isMobile ? 1.05 : 1, y: !isMobile ? -4 : 0 }}
                          className="rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 relative overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.25)',
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                          <Icon className={`text-white mb-1.5 sm:mb-2 md:mb-3 relative z-10`} size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-0.5 md:mb-1 relative z-10">{stat.value}</div>
                          <div className="text-[10px] sm:text-xs md:text-sm text-gray-300/80 relative z-10 leading-tight">{stat.label}</div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </section>

              {/* About Section */}
              <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 relative">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 md:mb-12"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                      <span className="gradient-text">About the Project</span>
                    </h2>
                    <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-gray-300/90 leading-relaxed">
                      <p>
                        This comprehensive analytics dashboard represents a deep exploration into the <strong className="text-white">naming conventions, spelling patterns, and textual characteristics</strong> within the Classic Models database. 
                        The project goes far beyond simple data visualization—it's a systematic analysis of how names, words, and text patterns are structured across different entities.
                      </p>
                      <p>
                        Through <strong className="text-white">30+ sophisticated SQL queries</strong>, we examine everything from the length distribution of country names to the complexity scores of customer names, 
                        from the vowel frequency in product names to the capitalization patterns across the database. Each analysis reveals unique insights about how textual data is organized, 
                        how naming conventions vary by geography and entity type, and how these patterns can inform database design, search optimization, and data quality initiatives.
                      </p>
                      <p>
                        The dashboard features <strong className="text-white">40+ interactive visualizations</strong>, each accompanied by detailed descriptions, the underlying SQL code, and human-readable insights. 
                        This transparency allows users to understand not just what the data shows, but how the analysis was performed and what it means in practical terms.
                      </p>
                      <p>
                        Built with modern web technologies including <strong className="text-white">Next.js 14, TypeScript, and MySQL</strong>, the entire system is containerized with Docker for easy deployment. 
                        The glassmorphic design, smooth animations, and responsive layout create an experience that feels both professional and engaging—proving that data analytics can be both powerful and beautiful.
                      </p>
                    </div>
                  </motion.div>

                  {/* Features Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ scale: !isMobile ? 1.02 : 1, y: !isMobile ? -4 : 0 }}
                          className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 relative overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                            backdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.25)',
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                              <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} opacity-80`}>
                                <Icon className="text-white" size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                              </div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{feature.title}</h3>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed">{feature.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </section>

              {/* About Me Section */}
              <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 relative">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                      backdropFilter: 'blur(30px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 20px 60px 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    {/* Animated gradient overlay */}
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
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        {/* Profile Image */}
                        <motion.div
                          className="relative group"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-cyan-400 to-pink-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                          <div
                            className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden"
                            style={{
                              border: '3px solid rgba(255,255,255,0.3)',
                              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                            }}
                          >
                            <img
                              src="/OtabekJurabekov.PNG"
                              alt="Otabek Jurabekov - Professional Profile"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                          <motion.div
                            className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 flex items-center justify-center"
                            style={{
                              border: '3px solid rgba(10,10,10,0.8)',
                              boxShadow: '0 8px 24px rgba(139, 92, 246, 0.5)',
                            }}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Trophy className="text-white" size={20} />
                          </motion.div>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3">
                            <div className="w-1 h-8 sm:h-10 md:h-12 rounded-full bg-gradient-to-b from-purple-400 via-cyan-400 to-pink-400" />
                            <div>
                              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 md:mb-2">About the Developer</h2>
                              <p className="text-gray-300/80 text-xs sm:text-sm md:text-base lg:text-lg">Otabek Jurabekov • PDP University (Group 24-303)</p>
                            </div>
                          </div>
                          <motion.div
                            className="flex items-center gap-2 mt-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="px-4 py-2 rounded-xl"
                              style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.15)',
                              }}
                            >
                              <p className="text-sm text-gray-300">
                                <span className="text-gray-400">Created by</span>{' '}
                                <span className="text-white font-semibold">Otabek Jurabekov</span>
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 md:mb-8">
                        {/* Main Bio */}
                        <motion.div
                          className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <p>
                            I'm <strong className="text-white">Otabek Jurabekov</strong>, a student at PDP University (Group 24-303) and a professional competitive programmer and mathematician. 
                            I actively combine strong theoretical foundations with real-world engineering, focusing on building scalable backend systems and solving complex algorithmic problems.
                          </p>
                          <p>
                            I am an <strong className="text-white">IOI 2023 (Hungary) participant</strong>, with extensive experience in international mathematics and informatics Olympiads. 
                            Over the years, competitive programming shaped my way of thinking — precision, performance, and correctness always come first.
                          </p>
                          <p>
                            Currently, I work as a <strong className="text-white">Back-End Developer at Asaxiy.uz</strong>, where I build and maintain high-load backend services, 
                            and as a <strong className="text-white">Laravel Back-End Developer at Revolution Group</strong>, contributing to production-grade systems with real users and real constraints.
                          </p>
                          <p>
                            I have solved <strong className="text-white">1400+ algorithmic problems</strong> across platforms and hold an Expert-level competitive programming background, 
                            with deep experience in algorithms, data structures, and problem-solving under pressure. I'm not just focused on passing tests — I focus on writing clean, 
                            efficient, and maintainable code.
                          </p>
                          <p>
                            I aim to bridge competitive programming discipline with modern software engineering, building systems that are both mathematically sound and practically robust.
                          </p>
                        </motion.div>

                        {/* Achievements & Links */}
                        <motion.div
                          className="space-y-4 sm:space-y-5 md:space-y-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                              <Trophy className="text-yellow-400" size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                              Key Achievements
                            </h3>
                            <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                              {achievements.map((achievement, index) => {
                                const Icon = achievement.icon
                                return (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl min-h-[44px]"
                                    style={{
                                      background: 'rgba(255,255,255,0.05)',
                                      backdropFilter: 'blur(10px)',
                                    }}
                                  >
                                    <Icon className={achievement.color} size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="text-xs sm:text-sm md:text-base text-gray-300">{achievement.text}</span>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                              <ExternalLink className="text-cyan-400" size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                              Connect & Profiles
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                              {socialLinks.map((link, index) => {
                                const Icon = link.icon
                                return (
                                  <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.05 }}
                                    whileHover={{ scale: !isMobile ? 1.05 : 1, y: !isMobile ? -2 : 0 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl group relative overflow-hidden min-h-[44px]"
                                    style={{
                                      background: 'rgba(255,255,255,0.08)',
                                      backdropFilter: 'blur(10px)',
                                      border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Icon className="text-gray-400 group-hover:text-white relative z-10 transition-colors" size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] flex-shrink-0" aria-hidden="true" />
                                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-300 group-hover:text-white relative z-10 transition-colors truncate">{link.name}</span>
                                  </motion.a>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Quick Navigation */}
              <section className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
                <div className="max-w-7xl mx-auto">
                  <motion.h2
                    className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="gradient-text">Explore the Dashboard</span>
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {[
                      { name: 'Dashboard', href: '/dashboard', icon: BarChart3, color: 'from-purple-500 to-cyan-500', desc: 'Overview of all analytics' },
                      { name: 'Customers', href: '/customers', icon: Users, color: 'from-cyan-500 to-blue-500', desc: 'Customer name analysis' },
                      { name: 'Products', href: '/products', icon: Package, color: 'from-purple-500 to-pink-500', desc: 'Product naming patterns' },
                      { name: 'Offices', href: '/offices', icon: Building2, color: 'from-blue-500 to-cyan-500', desc: 'Office location analysis' },
                      { name: 'Employees', href: '/employees', icon: FileText, color: 'from-pink-500 to-purple-500', desc: 'Employee name patterns' },
                      { name: 'Analytics', href: '/analytics', icon: Sparkles, color: 'from-purple-500 to-cyan-500', desc: 'Advanced cross-entity analytics' },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <Link key={item.name} href={item.href} aria-label={`Navigate to ${item.name} - ${item.desc}`}>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: !isMobile ? 1.05 : 1, y: !isMobile ? -6 : 0 }}
                            whileTap={{ scale: 0.98 }}
                            className="rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 relative overflow-hidden group cursor-pointer min-h-[120px] sm:min-h-[140px]"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                              backdropFilter: 'blur(24px) saturate(180%)',
                              border: '1px solid rgba(255,255,255,0.18)',
                              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.25)',
                            }}
                          >
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 transition-opacity`}
                              style={{
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
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                                <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} opacity-80`}>
                                  <Icon className="text-white" size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
                                </div>
                                <ArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
                              </div>
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{item.name}</h3>
                              <p className="text-[10px] sm:text-xs md:text-sm text-gray-300/80 leading-tight">{item.desc}</p>
                            </div>
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>
            <Footer />
          </main>
        </div>
        {commandPaletteOpen && (
          <CommandPalette onClose={() => setCommandPaletteOpen(false)} />
        )}
      </div>
    </>
  )
}
