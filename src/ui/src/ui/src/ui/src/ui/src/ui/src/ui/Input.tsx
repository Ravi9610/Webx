import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm mb-1">{label}</label>}
      <input
        className={clsx(
          'w-full bg-white/10 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-win11-accent transition-all',
          error && 'ring-1 ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
