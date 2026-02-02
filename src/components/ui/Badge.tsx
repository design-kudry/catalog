'use client'

interface BadgeProps {
  label: string
  variant?: 'default' | 'brand' | 'gray'
  size?: 'sm' | 'md'
}

export function Badge({ label, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    brand: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-200 text-gray-800',
  }

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span className={`rounded-full font-medium inline-block ${variants[variant]} ${sizes[size]}`}>
      {label}
    </span>
  )
}
