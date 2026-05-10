import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import type { DotProps } from 'recharts'
import { loadForecastData } from '../data/mockDashboardData'
import type { LoadForecastPoint } from '../types'

const NOW_HOUR = 14

interface EarlyWarningDotProps extends DotProps {
  payload?: LoadForecastPoint
}

function EarlyWarningDot({ cx, cy, payload }: EarlyWarningDotProps) {
  if (!payload?.earlyWarning || cx == null || cy == null) return null
  if (payload.earlyWarning === 'critical') {
    return (
      <polygon
        points={`${cx},${cy - 7} ${cx - 6},${cy + 5} ${cx + 6},${cy + 5}`}
        fill="#ef4444"
        stroke="#fff"
        strokeWidth={1}
      />
    )
  }
  if (payload.earlyWarning === 'warning') {
    return (
      <polygon
        points={`${cx},${cy - 7} ${cx + 6},${cy} ${cx},${cy + 7} ${cx - 6},${cy}`}
        fill="#f59e0b"
        stroke="#fff"
        strokeWidth={1}
      />
    )
  }
  return <circle cx={cx} cy={cy} r={5} fill="#3b82f6" stroke="#fff" strokeWidth={1} />
}

export default function MainForecastChart() {
  return (
    <div className="flex-1 min-h-0 flex flex-col px-2 pt-1 pb-1">
      {/* Chart */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={loadForecastData} margin={{ top: 6, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            <YAxis
              yAxisId="load"
              orientation="left"
              domain={[5, 16]}
              tickCount={6}
              tick={{ fontSize: 9, fill: '#374151' }}
              width={28}
            />

            <XAxis
              dataKey="hour"
              tick={{ fontSize: 9, fill: '#374151' }}
              tickFormatter={h => `${h}h`}
            />

            <Tooltip
              contentStyle={{ fontSize: 10, padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 4 }}
              labelFormatter={h => `Hour ${h}:00`}
              formatter={(value: number, name: string) => [`${value} MW`, name]}
            />

            <Legend
              wrapperStyle={{ fontSize: 9, paddingTop: 2 }}
              iconSize={10}
            />

            {/* Confidence interval Interval */}
            <Area
              yAxisId="load"
              dataKey="loadHigh"
              fill="#ede9fe"
              stroke="none"
              fillOpacity={0.6}
              legendType="none"
              name="Confidence Interval (80%)"
            />
            <Area
              yAxisId="load"
              dataKey="loadLow"
              fill="#ffffff"
              stroke="none"
              fillOpacity={1}
              legendType="none"
              name=" "
            />

            {/* Load forecast line */}
            <Line
              yAxisId="load"
              dataKey="load"
              name="Load Forecast"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={<EarlyWarningDot />}
              legendType="plainline"
            />

            {/* Confidence interval legend-only entry */}
            <Area
              yAxisId="load"
              dataKey="loadHigh"
              fill="#ede9fe"
              stroke="#c4b5fd"
              strokeWidth={0.5}
              fillOpacity={0}
              name="Confidence Interval (80%)"
              legendType="square"
            />

            {/* Actual metered line (past hours only) */}
            <Line
              yAxisId="load"
              dataKey="actual"
              name="Actual Load"
              stroke="#111111"
              strokeWidth={1}
              dot={false}
              legendType="plainline"
              connectNulls={false}
            />

            {/* NOW marker */}
            <ReferenceLine
              yAxisId="load"
              x={NOW_HOUR}
              stroke="#6d28d9"
              strokeDasharray="4 3"
              strokeWidth={1.}
              label={{ value: 'Now', position: 'top', fill: '#6d28d9', fontSize: 9, fontWeight: 700 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Early warning symbol legend */}
      <div className="flex items-center gap-3 px-1 shrink-0" style={{ fontSize: 8, color: '#6b7280' }}>
        <span className="font-semibold">Early Warning:</span>
        <span className="flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 10 10">
            <polygon points="5,0 0,10 10,10" fill="#ef4444" />
          </svg>
          Critical
        </span>
        <span className="flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 10 10">
            <polygon points="5,0 10,5 5,10 0,5" fill="#f59e0b" />
          </svg>
          Warning
        </span>
        <span className="flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="4.5" fill="#3b82f6" />
          </svg>
          Advisory
        </span>
      </div>
    </div>
  )
}
