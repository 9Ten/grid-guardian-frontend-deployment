import { SERIES_COLORS, kpiCards } from '../data/mockDashboardData'
import type { HourlyDispatch } from '../types'

const HOURS = Array.from({ length: 24 }, (_, i) => i)

interface RowDef {
  key: keyof Omit<HourlyDispatch, 'hour'>
  label: string
  colorKey: keyof typeof SERIES_COLORS
}

const ROWS: RowDef[] = [
  { key: 'gridImport',    label: 'Grid Import (MW)',            colorKey: 'gridImport'    },
  { key: 'dieselPower',   label: 'Diesel Power Generator (MW)', colorKey: 'dieselPower'   },
  { key: 'bessDischarge', label: 'BESS (Discharge) (MW)',       colorKey: 'bessDischarge' },
  { key: 'bessCharge',    label: 'BESS (Charge) (MW)',          colorKey: 'bessCharge'    },
  { key: 'solarPV',       label: 'Solar PV (MW)',               colorKey: 'solarPV'       },
]

const LEGEND_LABELS: Array<{ colorKey: keyof typeof SERIES_COLORS; label: string }> = [
  { colorKey: 'gridImport',    label: 'Grid Import'            },
  { colorKey: 'dieselPower',   label: 'Diesel Power Generator' },
  { colorKey: 'bessDischarge', label: 'BESS Discharge'         },
  { colorKey: 'bessCharge',    label: 'BESS Charge'            },
  { colorKey: 'solarPV',       label: 'Solar PV'               },
]

function Cell({ value, color }: { value: number; color: string }) {
  if (value === 0) {
    return <td className="border border-gray-100 bg-white px-0.5 py-1 text-center" />
  }
  return (
    <td className="border border-gray-100 px-0.5 py-1 text-center">
      <span
        className="inline-block rounded px-0.5 text-white font-semibold leading-tight"
        style={{ background: color, fontSize: 11, minWidth: 26 }}
      >
        {value.toFixed(1)}
      </span>
    </td>
  )
}

interface Props {
  data: HourlyDispatch[]
}

export default function RecommendedDispatchSchedule({ data }: Props) {
  const byHour: Record<number, HourlyDispatch> = {}
  data.forEach(d => { byHour[d.hour] = d })

  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0">
      {/* Purple header */}
      <div className="px-3 py-2.5 bg-pea-700 rounded-t flex justify-between items-center flex-wrap gap-1">
        <div>
          <p className="text-[13px] font-bold text-white tracking-wider uppercase">
            Recommended Dispatch Schedule
          </p>
          <p className="text-[11px] text-pea-200">OPTIMIZER OUTPUT — TODAY</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] text-pea-200">
              Est. Cost Saving vs. Unscheduled = <span className="text-white font-bold">{kpiCards.find(k => k.label === 'COST SAVING')?.value} / วัน</span>
            </p>
          </div>
          <a
            href="/kohtao_dispatch_order_17h30.pdf"
            download="kohtao_dispatch_order_17h30.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-pea-700 text-[12px] font-semibold rounded hover:bg-pea-50 transition-colors whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Generate Report PDF
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1 min-h-0">
        <table className="w-full border-collapse" style={{ minWidth: 700 }}>
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-2 py-1.5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap sticky left-0 bg-gray-50 z-10">
                Hour
              </th>
              {HOURS.map(h => (
                <th key={h} className="border border-gray-200 px-0.5 py-1.5 text-center text-xs font-semibold text-gray-600" style={{ minWidth: 30 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row.key} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-2 py-1 text-xs text-gray-700 font-medium whitespace-nowrap sticky left-0 bg-white z-10">
                  {row.label}
                </td>
                {HOURS.map(h => (
                  <Cell
                    key={h}
                    value={byHour[h][row.key]}
                    color={SERIES_COLORS[row.colorKey]}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-3 py-2 flex flex-wrap gap-3 border-t border-gray-100">
        {LEGEND_LABELS.map(l => (
          <span key={l.colorKey} className="flex items-center gap-1 text-xs text-gray-700">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: SERIES_COLORS[l.colorKey] }}
            />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  )
}
