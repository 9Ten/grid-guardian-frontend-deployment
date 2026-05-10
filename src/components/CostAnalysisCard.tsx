import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { costBreakdown } from '../data/mockDashboardData'

const TOTAL = costBreakdown.reduce((sum, item) => sum + item.value, 0)

function formatCurrency(n: number) {
  return `฿${n.toLocaleString()}`
}

function formatPct(n: number) {
  return `${((n / TOTAL) * 100).toFixed(1)}%`
}

export default function CostAnalysisCard() {
  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-3 py-2.5 bg-pea-700 rounded-t">
        <span className="text-[13px] font-bold text-white tracking-wider uppercase">
          Cost Analysis Breakdown
        </span>
      </div>

      <div className="p-3 flex gap-3 items-center">
        {/* Donut chart */}
        <div style={{ width: 120, height: 120 }} className="shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={costBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={54}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={1}
              >
                {costBreakdown.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, padding: '3px 7px' }}
                formatter={(value: number, name: string) => [
                  `${formatCurrency(value)} (${formatPct(value)})`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 flex-1">
          {costBreakdown.map(item => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-gray-700">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-gray-700 font-mono whitespace-nowrap">
                {formatCurrency(item.value)} ({formatPct(item.value)})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Total + badge */}
      <div className="px-3 pb-3 border-t border-gray-100 pt-2 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600">Total Cost</p>
          <p className="text-sm font-bold text-gray-900">{formatCurrency(TOTAL)}</p>
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded px-2 py-0.5">
          ↓ 9.2% vs last 7 days
        </span>
      </div>
    </div>
  )
}
