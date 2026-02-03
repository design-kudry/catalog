'use client'

import { useState } from 'react'
import { mockPrompts } from '@/data/mockData'
import ComparisonMode from '@/components/ComparisonMode'
import SemanticSearch from '@/components/SemanticSearch'
import ModernPromptCard from '@/components/ModernPromptCard'
import { PromptFilter } from '@/types'
import Link from 'next/link'

export default function ComparePage() {
  const [promptAId, setPromptAId] = useState(mockPrompts[0]?.id)
  const [promptBId, setPromptBId] = useState(mockPrompts[1]?.id)
  const [filters, setFilters] = useState<PromptFilter>({ search: '', sort: 'relevant' })
  const [showSelector, setShowSelector] = useState(false)

  const promptA = mockPrompts.find(p => p.id === promptAId)
  const promptB = mockPrompts.find(p => p.id === promptBId)

  if (!promptA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Промпты не найдены</p>
          <Link href="/catalog" className="text-purple-600 hover:text-purple-700">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    )
  }

  const filteredPrompts = filters.search
    ? mockPrompts.filter(
        p =>
          p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    : mockPrompts

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalog">
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-4">
              ← Вернуться в каталог
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Сравнение промптов</h1>
          <p className="text-gray-600 mt-2">
            Выбери два промпта и посмотри их различия рядом
          </p>
        </div>

        {/* Comparison Component */}
        {promptA && (
          <div className="mb-12">
            <ComparisonMode
              promptA={promptA}
              promptB={promptB}
              onSwap={() => {
                const temp = promptAId
                setPromptAId(promptBId)
                setPromptBId(temp)
              }}
            />
          </div>
        )}

        {/* Selector for B prompt */}
        <div className="border-t pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Выбери второй промпт для сравнения</h2>
            <button
              onClick={() => setShowSelector(!showSelector)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {showSelector ? 'Скрыть' : 'Показать'}
            </button>
          </div>

          {showSelector && (
            <div className="space-y-6">
              <SemanticSearch
                onSearch={(_query, newFilters) => setFilters(newFilters)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrompts.map(prompt => (
                  <div key={prompt.id} onClick={() => setPromptBId(prompt.id)}>
                    <ModernPromptCard
                      prompt={prompt}
                      variant="grid"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
