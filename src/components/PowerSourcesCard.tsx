import { Cpu, Battery, Zap, Sun, Fuel } from 'lucide-react'
import { powerSources } from '../data/mockDashboardData'

const iconMap: Record<string, React.ReactNode> = {
  fuel:    <Fuel size={14} className="text-yellow-600" />,
  diesel:  <Cpu size={14} className="text-red-500" />,
  bessChg: <Battery size={14} className="text-indigo-500" />,
  bessDis: <Battery size={14} className="text-indigo-400" />,
  import:  <Zap size={14} className="text-blue-600" />,
  solar:   <Sun size={14} className="text-yellow-500" />,
}

export default function PowerSourcesCard() {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col shrink-0">
      {/* Card header */}
      <div className="px-3 py-2.5 bg-pea-700 rounded-t">
        <span className="text-[13px] font-bold text-white tracking-wider uppercase">
          Energy Source Status
        </span>
      </div>

      {/* Fuel level bar */}
      <div className="px-3 pt-2.5 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-yellow-700">Diesel Fuel.</span>
          <span className="text-xs font-bold text-yellow-700">10,000 L</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-400 rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Source rows */}
      <div className="px-3 pb-2 flex flex-col divide-y divide-gray-50">
        {powerSources.filter(s => s.id !== 'fuel').map(src => (
          <div key={src.id} className="flex items-center justify-between py-2 gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="shrink-0">{iconMap[src.id]}</span>
              <span className="text-[13px] text-gray-700 truncate">{src.label}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] font-semibold text-gray-800 font-mono">
                {src.value} {src.unit}
              </span>
              {src.statusLabel && (
                <span className="flex items-center gap-0.5 text-xs text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {src.statusLabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
