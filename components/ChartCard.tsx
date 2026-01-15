'use client'

import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface ChartCardProps {
  title: string
  data: any[]
  type: 'bar' | 'line' | 'pie' | 'area'
  xKey: string
  yKey: string
  delay?: number
}

const colors = [
  '#a78bfa',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#6366f1',
  '#ec4899',
  '#14b8a6',
  '#8b5cf6',
  '#3b82f6',
  '#f97316',
  '#84cc16',
  '#eab308',
  '#06b6d4',
  '#8b5cf6',
]

export default function ChartCard({
  title,
  data,
  type,
  xKey,
  yKey,
  delay = 0,
}: ChartCardProps) {
  // Truncate long labels
  const processedData = data.map((item) => ({
    ...item,
    [xKey]: item[xKey]?.length > 20 
      ? item[xKey].substring(0, 20) + '...' 
      : item[xKey],
  }))

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey={yKey}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,30,0.98) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '13px',
              }}
              itemStyle={{
                color: '#ffffff',
                fontSize: '12px',
              }}
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
            <Legend
              wrapperStyle={{ color: '#e5e7eb', fontSize: '12px' }}
            />
          </PieChart>
        )
      
      case 'area':
        return (
          <AreaChart data={processedData}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#e5e7eb"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={90}
              tick={{ fill: '#d1d5db', fontWeight: 500 }}
            />
            <YAxis stroke="#e5e7eb" fontSize={11} tick={{ fill: '#d1d5db', fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,30,0.98) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '13px',
              }}
              itemStyle={{
                color: '#ffffff',
                fontSize: '12px',
              }}
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke="#a78bfa"
              fill="url(#areaGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        )
      
      case 'line':
        return (
          <LineChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#e5e7eb"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={90}
              tick={{ fill: '#d1d5db', fontWeight: 500 }}
            />
            <YAxis stroke="#e5e7eb" fontSize={11} tick={{ fill: '#d1d5db', fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,30,0.98) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '13px',
              }}
              itemStyle={{
                color: '#ffffff',
                fontSize: '12px',
              }}
              cursor={{ stroke: 'rgba(139, 92, 246, 0.3)', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: '#a78bfa', stroke: '#fff', strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </LineChart>
        )
      
      default: // bar
        return (
          <BarChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#e5e7eb"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={90}
              tick={{ fill: '#d1d5db', fontWeight: 500 }}
            />
            <YAxis stroke="#e5e7eb" fontSize={11} tick={{ fill: '#d1d5db', fontWeight: 500 }} />
            <Tooltip
              contentStyle={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,20,30,0.98) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
              }}
              labelStyle={{
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '8px',
                fontSize: '13px',
              }}
              itemStyle={{
                color: '#ffffff',
                fontSize: '12px',
              }}
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
            <Bar dataKey={yKey} radius={[12, 12, 0, 0]}>
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        )
    }
  }

  if (title) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay }}
        className="group rounded-2xl p-6 overflow-hidden relative"
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
          scale: 1.01,
          y: -4,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
      >
        <motion.h3 
          className="text-xl font-bold mb-6 text-white relative z-10 flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.1 }}
        >
          <span className="gradient-text">{title}</span>
        </motion.h3>
        <div className="relative z-10">
          <ResponsiveContainer width="100%" height={320}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative z-10">
      <ResponsiveContainer width="100%" height={320}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}
