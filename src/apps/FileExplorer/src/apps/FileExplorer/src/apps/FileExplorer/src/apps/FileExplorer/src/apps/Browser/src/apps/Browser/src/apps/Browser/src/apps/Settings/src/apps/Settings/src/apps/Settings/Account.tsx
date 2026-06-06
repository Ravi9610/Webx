import React, { useState } from 'react'

const Account: React.FC = () => {
  const [username, setUsername] = useState('User')
  const [email, setEmail] = useState('user@webos.local')

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm mb-1">Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/10 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-win11-accent" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/10 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-win11-accent" />
      </div>
      <button className="px-4 py-2 bg-win11-accent rounded hover:bg-win11-accent-hover transition-colors">Save Changes</button>
    </div>
  )
}

export default Account
