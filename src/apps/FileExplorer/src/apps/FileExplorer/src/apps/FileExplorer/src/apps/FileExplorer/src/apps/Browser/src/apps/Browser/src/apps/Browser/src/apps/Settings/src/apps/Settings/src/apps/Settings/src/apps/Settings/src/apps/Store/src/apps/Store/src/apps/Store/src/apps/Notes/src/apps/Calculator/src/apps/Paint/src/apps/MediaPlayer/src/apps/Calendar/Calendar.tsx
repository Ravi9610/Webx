import React, { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

const Calendar: React.FC<{ windowId: string }> = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded hover:bg-white/10">◀</button>
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2 rounded hover:bg-white/10">▶</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekdays.map(day => <div key={day} className="text-sm opacity-70">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(monthStart.getDay()).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map(day => (
          <button
            key={day.toISOString()}
            onClick={() => setSelectedDate(day)}
            className={`p-2 rounded text-center transition-colors ${
              isSameMonth(day, currentMonth) ? 'hover:bg-white/10' : 'opacity-30'
            } ${isToday(day) ? 'bg-win11-accent' : ''} ${
              isSameMonth(selectedDate, day) && isToday(day) ? '' : (selectedDate.toDateString() === day.toDateString() ? 'bg-white/20' : '')
            }`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calendar
