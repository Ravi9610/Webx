import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  return (
    <button
      className={clsx(
        'rounded font-medium transition-colors',
        {
          'bg-win11-accent hover:bg-win11-accent-hover text-white': variant === 'primary',
          'bg-white/10 hover:bg-white/20': variant === 'secondary',
          'bg-red-500/80 hover:bg-red-600': variant === 'danger',
          'px-2 py-1 text-xs': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
