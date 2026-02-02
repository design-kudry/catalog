'use client'

import { useState, useMemo } from 'react'
import { mockPrompts } from '@/data/mockData'
import { SearchInput } from '@/components/ui/SearchInput'
import { Filters } from '@/components/Filters'
import { PromptCard } from '@/components/PromptCard'
import { useSearchParams } from 'next/navigation'

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState<'relevant' | 'popular' | 'new'>('relevant')
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set())

  const filteredPrompts = useMemo(() => {
    let result = [...mockPrompts]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.goal.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        result = result.filter((prompt: any) => values.includes(prompt[key]))
      }
    })

    if (sortBy === 'popular') {
      result.sort((a, b) => b.savedCount - a.savedCount)
    } else if (sortBy === 'new') {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return result
  }, [searchQuery, filters, sortBy])

  const handleSave = (id: string) => {
    setSavedPrompts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог промптов</h1>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Поиск промптов..."
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <Filters onFilterChange={setFilters} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-brand text-sm"
            >
              <option value="relevant">Релевантные</option>
              <option value="popular">Популярные</option>
              <option value="new">Новые</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredPrompts.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Найдено {filteredPrompts.length} {
                filteredPrompts.length === 1 ? 'промпт' : 'промптов'
              }
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <a key={prompt.id} href={`/catalog/${prompt.id}`}>
                  <PromptCard
                    prompt={prompt}
                    onSave={handleSave}
                    onUse={() => {}}
                    isSaved={savedPrompts.has(prompt.id)}
                  />
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Ничего не найдено</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilters({})
              }}
              className="text-brand hover:text-brand-dark"
            >
              Очистить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
