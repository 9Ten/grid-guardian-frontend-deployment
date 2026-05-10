export interface KpiCardData {
  label: string
  value: string
  color: string
}

export interface HourlyDispatch {
  hour: number
  gridImport: number
  dieselPower: number
  bessDischarge: number
  bessCharge: number
  solarPV: number
}

export interface LoadForecastPoint {
  hour: number
  tariff: number
  load: number
  loadLow: number
  loadHigh: number
  actual?: number
  earlyWarning?: 'critical' | 'warning' | 'info'
}

export interface BessSocPoint {
  hour: number
  soc: number
}

export interface PowerSource {
  id: string
  label: string
  value: string
  unit: string
  statusLabel: string
}

export interface AlertItem {
  id: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  detail: string
  time: string
  timeLabel: string
  actionLabel?: string
}

export interface CostBreakdownItem {
  name: string
  value: number
  color: string
}
