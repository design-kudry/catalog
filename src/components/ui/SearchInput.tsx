'use client'

import { Search } from 'lucide-react'

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
}

export function SearchInput({
  placeholder = 'Поиск промптов...',
  value,
  onChange,
  onSubmit,
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit?.()}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
      />
    </div>
  )
}
