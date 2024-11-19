'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-4 py-2 bg-dark-lighter border border-gray-800 rounded-lg
                 text-gray-300 placeholder-gray-500
                 focus:ring-2 focus:ring-green-400 focus:border-transparent
                 transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  )
}
