'use client'

import { useState } from 'react'
import { mockSavedPrompts } from '@/data/mockData'
import { Library } from '@/components/Library'

export default function LibraryPage() {
  const [prompts, setPrompts] = useState(mockSavedPrompts)

  const handleDelete = (id: string) => {
    if (confirm('Удалить этот промпт?')) {
      setPrompts(prompts.filter((p) => p.id !== id))
    }
  }

  const handleEdit = (id: string) => {
    alert('Открыть редактор для: ' + id)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Library
          prompts={prompts}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
