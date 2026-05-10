import { Bell } from 'lucide-react'
import { alerts } from '../data/mockDashboardData'
import type { AlertItem } from '../types'

const severityStyles: Record<AlertItem['severity'], {
  border: string; bg: string; titleColor: string; dotColor: string; btnBg: string
}> = {
  critical: {
    border:     'border-l-red-500',
    bg:         'bg-red-50',
    titleColor: 'text-red-700',
    dotColor:   'bg-red-500',
    btnBg:      'bg-red-500 hover:bg-red-600',
  },
  warning: {
    border:     'border-l-amber-500',
    bg:         'bg-amber-50',
    titleColor: 'text-amber-700',
    dotColor:   'bg-amber-500',
    btnBg:      'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    border:     'border-l-blue-500',
    bg:         'bg-blue-50',
    titleColor: 'text-blue-700',
    dotColor:   'bg-blue-500',
    btnBg:      'bg-blue-500 hover:bg-blue-600',
  },
}

export default function EarlyWarningPanel() {
  const activeCount = alerts.filter(a => a.severity !== 'info').length + 1

  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-pea-700 rounded-t">
        <div className="flex items-center gap-1.5">
          <Bell size={14} className="text-white" />
          <span className="text-[13px] font-bold text-white tracking-wider uppercase">Early Warning</span>
        </div>
        <span className="text-xs font-bold bg-red-500 text-white rounded-full px-2 py-0.5">
          {activeCount} ACTIVE
        </span>
      </div>

      {/* Alert cards */}
      <div className="flex flex-col gap-2 p-2 overflow-y-auto flex-1 min-h-0">
        {alerts.map(alert => {
          const s = severityStyles[alert.severity]
          return (
            <div
              key={alert.id}
              className={`border-l-4 ${s.border} ${s.bg} rounded-r p-2`}
            >
              <div className="flex items-start gap-1.5">
                <span className={`w-2 h-2 rounded-full mt-0.5 shrink-0 ${s.dotColor}`} />
                <p className={`text-[13px] font-semibold leading-tight ${s.titleColor}`}>
                  {alert.title}
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1 ml-3.5 leading-snug">{alert.detail}</p>
              <div className="flex items-center justify-between mt-1.5 ml-3.5">
                <span className="text-[11px] text-gray-600">
                  {alert.time} {alert.timeLabel}
                </span>
                {alert.actionLabel && (
                  <button
                    className={`text-[11px] text-white font-semibold px-2 py-0.5 rounded ${s.btnBg} transition-colors`}
                  >
                    {alert.actionLabel}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
