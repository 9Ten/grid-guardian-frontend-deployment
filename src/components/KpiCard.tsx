import type { KpiCardData } from '../types'

export default function KpiCard({ label, value, color }: KpiCardData) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 bg-white rounded border border-gray-200 shadow-sm min-w-[150px]">
      <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase whitespace-nowrap">
        {label}
      </span>
      <span className={`text-lg font-bold mt-0.5 whitespace-nowrap ${color}`}>{value}</span>
    </div>
  )
}
