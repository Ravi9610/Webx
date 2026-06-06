import React, { useRef, useState } from 'react'

const MediaPlayer: React.FC<{ windowId: string }> = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause()
      else audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = parseFloat(e.target.value)
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">🎵</div>
        <div className="text-lg font-semibold">Sample Audio</div>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata}>
        <source src="/sample.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={togglePlay} className="text-4xl mb-4">{isPlaying ? '⏸️' : '▶️'}</button>
      <div className="w-full max-w-md">
        <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="w-full" />
        <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default MediaPlayer
