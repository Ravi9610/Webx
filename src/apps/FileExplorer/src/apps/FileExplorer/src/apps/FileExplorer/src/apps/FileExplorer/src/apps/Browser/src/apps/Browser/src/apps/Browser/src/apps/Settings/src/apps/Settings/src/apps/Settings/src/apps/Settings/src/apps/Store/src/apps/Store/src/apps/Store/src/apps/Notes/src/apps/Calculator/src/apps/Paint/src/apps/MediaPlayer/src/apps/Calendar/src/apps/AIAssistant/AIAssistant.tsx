import React, { useState } from 'react'

const AIAssistant: React.FC<{ windowId: string }> = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your AI assistant. How can I help you today?' }
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "I can help you manage files, open apps, or answer questions.",
        "You can ask me to open File Explorer or launch the Browser.",
        "I'm still learning, but I can assist with basic tasks."
      ]
      const reply = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-lg px-3 py-2 ${msg.role === 'user' ? 'bg-win11-accent' : 'bg-white/10'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm opacity-50">AI is thinking...</div>}
      </div>
      <div className="p-4 border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 bg-white/10 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-win11-accent"
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-win11-accent rounded hover:bg-win11-accent-hover">Send</button>
      </div>
    </div>
  )
}

export default AIAssistant
