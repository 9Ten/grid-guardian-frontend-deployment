import { RefreshCw, Radio } from 'lucide-react'
import { useState, useEffect } from 'react'
import KpiCard from './KpiCard'
import { kpiCards } from '../data/mockDashboardData'

const formatTimestamp = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayName = days[date.getDay()]
  const monthName = months[date.getMonth()]
  const dateNum = date.getDate()
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${dayName}, ${monthName} ${dateNum} ${year} ${hours}.${minutes}.${seconds}`
}

export default function Header() {
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setTimestamp(formatTimestamp(new Date()))
    const interval = setInterval(() => {
      setTimestamp(formatTimestamp(new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="flex items-center gap-4 px-5 bg-white border-b border-gray-200 h-[72px] shrink-0 z-10"
      style={{ boxShadow: '0 1px 8px 0 rgba(109,40,217,0.07)' }}>

      {/* ── Brand ── */}
      <div className="flex items-center gap-3 shrink-0">
        <img
          src="/PEA-Logo.png"
          alt="PEA Provincial Electricity Authority"
          className="h-9 w-auto"
        />

        {/* Divider */}
        <div className="w-px h-9 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

        <div className="leading-snug">
          <p className="text-[22px] font-bold text-gray-900 tracking-tight whitespace-nowrap">
            Grid Guardian — Koh Tao Smart EMS
          </p>
          <p className="text-xs text-gray-600 tracking-wide">
            ศูนย์ควบคุมการจ่ายไฟ — การไฟฟ้าส่วนภูมิภาคเขต 2 ภาคใต้
          </p>
        </div>
      </div>

      {/* ── KPI strip ── */}
      <div className="flex gap-2 flex-1 justify-center">
        {kpiCards.map(k => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* ── Status cluster ── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* LIVE badge */}
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[13px] font-bold px-2.5 py-1 rounded-full leading-none">
          <Radio size={11} className="animate-pulse" />
          LIVE
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Timestamp */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="flex items-center gap-1 text-[13px] text-gray-600 leading-none">
            <span className="text-gray-800 font-medium tabular-nums">{timestamp}</span>
            <button className="ml-0.5 text-gray-500 hover:text-pea-700 transition-colors" aria-label="Refresh">
              <RefreshCw size={20} />
            </button>
          </span>
        </div>
      </div>
    </header>
  )
}
