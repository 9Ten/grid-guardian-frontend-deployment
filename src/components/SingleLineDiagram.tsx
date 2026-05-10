import { Settings } from 'lucide-react'

export default function SingleLineDiagram() {
  return (
    <div className="rounded border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden" style={{ background: '#f2f3f5' }}>
      <div className="flex items-center justify-between px-3 py-2.5 bg-pea-700 rounded-t shrink-0">
        <span className="text-[13px] font-bold text-white tracking-wider uppercase">
          Single Line Diagram
        </span>
        <Settings size={14} className="text-pea-200" />
      </div>
      <div className="flex-1 flex items-center justify-center p-2 min-h-0 overflow-hidden">
        <img
          src="/adjusted-single-line-diagram.png"
          alt="Single Line Diagram"
          className="w-full h-full max-h-full object-contain"
        />
      </div>
    </div>
  )
}
