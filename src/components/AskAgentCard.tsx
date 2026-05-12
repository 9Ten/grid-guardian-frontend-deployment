import { useState, useEffect, useRef } from 'react'
import { Bot, Factory, BatteryCharging, Droplets, ChevronRight } from 'lucide-react'

const PRESET_QUESTIONS = [
  {
    icon: Droplets,
    question: 'คาดว่าต้องใช้น้ำมันกี่ลิตรคืนนี้?',
    response:
      'คาดการณ์การใช้ดีเซลคืนนี้ประมาณ 13,627 ลิตร จาก Unit 1 และ Unit 2 รวมกัน คิดเป็นค่าใช้จ่ายประมาณ ฿488,416 (กรณีที่ BESS ทำงานปกติ)',
  },
  {
    icon: BatteryCharging,
    question: 'BESS จะช่วยแก้ไขอย่างไรบ้าง?',
    response:
      'BESS ถูกกำหนดให้จ่ายพลังงาน 0.8 MW ในช่วงเวลาพีค 18:00–22:00 น. ซึ่งช่วยประหยัดค่าเชื้อเพลิงดีเซลได้ประมาณ ฿3,100 ในคืนนี้',
  },
  {
    icon: Factory,
    question: 'ถ้าไม่มี Diesel Unit จะเกิดอะไร?',
    response:
      'หากไม่มี Diesel Unit กำลังการผลิตสูงสุดจะลดลงประมาณ 1.2 MW BESS จะหมดพลังงานภายใน 19:00 น. และค่าใช้จ่ายในการนำเข้าไฟฟ้าจากกริดจะเพิ่มขึ้นประมาณ ฿4,200 ต่อคืน',
  },
]

const FALLBACK_RESPONSE =
  'ขณะนี้ระบบกริดทำงานอยู่ในพารามิเตอร์ปกติ หากต้องการการวิเคราะห์เพิ่มเติม กรุณาตรวจสอบตารางการจ่ายพลังงานด้านบน'

export default function AskAgentCard() {
  const [inputValue, setInputValue] = useState('')
  const [displayed, setDisplayed] = useState('')
  const [streaming, setStreaming] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startStream(text: string) {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayed('')
    setStreaming(true)
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setStreaming(false)
      }
    }, 18)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  function handleSubmit() {
    const trimmed = inputValue.trim()
    if (!trimmed || streaming) return
    const matched = PRESET_QUESTIONS.find(q => q.question === trimmed)
    setTimeout(() => startStream(matched ? matched.response : FALLBACK_RESPONSE), 500)
    setDisplayed('')
    setStreaming(true)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col px-3 py-2.5 bg-pea-700 rounded-t">
        <div className="flex items-center gap-1.5">
          <Bot size={15} className="text-white shrink-0" />
          <span className="text-[13px] font-bold text-white tracking-wider uppercase">Ask Agent</span>
        </div>
        <span className="text-[11px] text-pea-200 mt-0.5 leading-snug">
          ถามเพิ่มเติมเกี่ยวกับสถานการณ์พลังงานตอนนี้
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Preset chips */}
      <div className="flex flex-col gap-1.5 p-2">
        {PRESET_QUESTIONS.map(({ icon: Icon, question }) => (
          <button
            key={question}
            onClick={() => setInputValue(question)}
            className="flex items-center gap-2 w-full text-left px-2 py-2 rounded border border-gray-100 hover:bg-indigo-50 hover:border-indigo-200 transition-colors group"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 group-hover:bg-indigo-200 shrink-0 transition-colors">
              <Icon size={12} className="text-pea-700" />
            </span>
            <span className="text-xs text-gray-700 flex-1 leading-snug">{question}</span>
            <ChevronRight size={12} className="text-gray-400 shrink-0" />
          </button>
        ))}
      </div>

      {/* Streaming response */}
      {(streaming || displayed) && (
        <div className="mx-2 mb-2 p-2 bg-indigo-50 border border-indigo-100 rounded flex gap-1.5">
          <Bot size={12} className="text-pea-700 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 leading-snug">
            {displayed}
            {streaming && <span className="animate-pulse">▍</span>}
          </p>
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-1.5 px-2 pb-2.5">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="พิมพ์คำถามถึง Agent…"
          className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 outline-none focus:border-pea-500 placeholder:text-gray-400"
        />
        <button
          onClick={handleSubmit}
          disabled={streaming}
          className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-3 py-1.5 rounded transition-colors shrink-0"
        >
          ASK ↗
        </button>
      </div>
    </div>
  )
}
