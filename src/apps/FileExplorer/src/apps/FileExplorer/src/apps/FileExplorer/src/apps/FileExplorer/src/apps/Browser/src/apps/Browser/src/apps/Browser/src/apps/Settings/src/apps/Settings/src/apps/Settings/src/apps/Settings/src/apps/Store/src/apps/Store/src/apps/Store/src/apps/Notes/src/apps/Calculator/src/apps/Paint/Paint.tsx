import React, { useRef, useState, useEffect } from 'react'

const Paint: React.FC<{ windowId: string }> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const [brushSize, setBrushSize] = useState(5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#1e1e1e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const endDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    ctx.fillStyle = '#1e1e1e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-white/10 flex gap-4 items-center">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
        <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
        <button onClick={clearCanvas} className="px-3 py-1 bg-red-500/80 rounded text-sm">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="flex-1 bg-black cursor-crosshair"
      />
    </div>
  )
}

export default Paint
