import React, { useState, useEffect } from 'react'
import { Cloud, Sun, Moon, CloudRain, Wind } from 'lucide-react'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

const Widgets: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000)
    // Mock weather
    setWeather({ temp: 22, condition: 'Sunny', icon: '☀️' })
    return () => clearInterval(timer)
  }, [])

  const getWeatherIcon = () => {
    switch (weather?.condition.toLowerCase()) {
      case 'sunny': return <Sun size={24} />
      case 'cloudy': return <Cloud size={24} />
      case 'rainy': return <CloudRain size={24} />
      case 'windy': return <Wind size={24} />
      default: return <Moon size={24} />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-40 flex gap-3">
      <div className="glass rounded-2xl px-4 py-2 backdrop-blur-md bg-black/30">
        <div className="text-sm opacity-70">{date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        <div className="text-2xl font-semibold">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      {weather && (
        <div className="glass rounded-2xl px-4 py-2 backdrop-blur-md bg-black/30 flex items-center gap-2">
          {getWeatherIcon()}
          <div>
            <div className="text-xl font-semibold">{weather.temp}°C</div>
            <div className="text-xs opacity-70">{weather.condition}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Widgets
