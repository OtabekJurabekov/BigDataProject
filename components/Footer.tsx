'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, ExternalLink, Mail, Code, Trophy, Briefcase } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    social: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/otabek-jurabekov-290302225/', icon: Linkedin },
      { name: 'Instagram', url: 'https://www.instagram.com/otabek.jurabekov/', icon: Instagram },
      { name: 'Telegram', url: 'https://t.me/OtabekJurabekov', icon: Mail },
      { name: 'LeetCode', url: 'https://leetcode.com/u/OtabekJurabekov/', icon: Code },
      { name: 'Codeforces', url: 'https://codeforces.com/profile/OtabekJurabekov', icon: Trophy },
    ],
    navigation: [
      { name: 'Overview', href: '/' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Customers', href: '/customers' },
      { name: 'Products', href: '/products' },
      { name: 'Employees', href: '/employees' },
      { name: 'Analytics', href: '/analytics' },
    ],
  }

  return (
    <footer className="relative border-t mt-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.1) 50%, rgba(236,72,153,0.1) 100%)',
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
      
      <div className="relative z-10" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(30px) saturate(200%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <motion.h3 
                className="text-lg font-bold text-white mb-4 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="gradient-text">Classic Models Analytics</span>
              </motion.h3>
              <motion.p 
                className="text-sm text-gray-300/80 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                A comprehensive data analytics dashboard analyzing naming conventions, 
                spelling patterns, and textual characteristics within the Classic Models database.
              </motion.p>
            </div>

            {/* Navigation */}
            <div>
              <motion.h3 
                className="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Navigation
              </motion.h3>
              <ul className="space-y-2">
                {links.navigation.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <motion.h3 
                className="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Connect
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {links.social.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl transition-all group relative overflow-hidden"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon size={18} className="text-gray-400 group-hover:text-white relative z-10 transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-gray-400">
              <p>
                © {currentYear} <span className="text-white font-semibold">Otabek Jurabekov</span> • PDP University (Group 24-303)
              </p>
              <p className="text-xs mt-1 text-gray-500">
                Data Analytics Project • Classic Models Database Analysis
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Briefcase size={14} />
              <span>Built with Next.js, TypeScript & MySQL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
