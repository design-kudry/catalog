'use client'

import { useState, useMemo } from 'react'
import { mockPrompts } from '@/data/mockData'
import SemanticSearch from '@/components/SemanticSearch'
import ModernPromptCard from '@/components/ModernPromptCard'
import CategorySidebar from '@/components/CategorySidebar'
import { PromptFilter } from '@/types'
import { useSearchParams } from 'next/navigation'

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filters, setFilters] = useState<PromptFilter>({
    search: initialQuery,
    sort: 'relevant',
  })
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categoryMap: Record<string, string> = {
    'marketing': 'Маркетинг',
    'psychology': 'Психология',
    'content': 'Контент',
    'development': 'Разработка',
    'design': 'Дизайн',
    'analytics': 'Анализ',
    'business': 'Бизнес',
    'education': 'Образование',
    'productivity': 'Продуктивность',
    'seo': 'SEO',
    'personal': 'Саморазвитие',
  }

  const filteredPrompts = useMemo(() => {
    let result = [...mockPrompts]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.goal.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    if (initialCategory && categoryMap[initialCategory]) {
      const categoryName = categoryMap[initialCategory]
      result = result.filter((p) => p.category?.includes(categoryName))
    }

    if (filters.role) {
      result = result.filter((p) => p.role === filters.role)
    }

    if (filters.level) {
      result = result.filter((p) => p.level === filters.level)
    }

    if (filters.tool) {
      result = result.filter((p) => p.tool === filters.tool)
    }

    if (filters.sort === 'popular') {
      result.sort((a, b) => b.usedCount - a.usedCount)
    } else if (filters.sort === 'new') {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    return result
  }, [filters])

  const handleSearch = (query: string, newFilters: PromptFilter) => {
    setSearchQuery(query)
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilters({ search: '', sort: 'relevant' })
  }

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Каталог промптов</h1>
          <p className="text-lg text-gray-600">
            Выбери цель → найди готовый промпт → используй или редактируй
          </p>
        </div>

        {/* Main Layout with Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <CategorySidebar />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Semantic Search */}
            <div className="mb-8">
              <SemanticSearch
                onSearch={handleSearch}
                onClear={handleClearFilters}
              />
            </div>

            {/* View Toggle & Results Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {filteredPrompts.length > 0 ? (
                  <span>
                    Найдено <strong>{filteredPrompts.length}</strong> {
                      filteredPrompts.length === 1 ? 'промпт' : 'промптов'
                    }
                  </span>
                ) : (
                  <span>Ничего не найдено</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Сетка
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Список
                </button>
              </div>
            </div>

            {/* Results */}
            {filteredPrompts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6' : 'space-y-4'}>
                {filteredPrompts.map((prompt) => (
                  <ModernPromptCard
                    key={prompt.id}
                    prompt={{
                      ...prompt,
                      isSaved: savedPrompts.has(prompt.id),
                    }}
                    onSave={handleSave}
                    onCopy={(content) => {
                      navigator.clipboard.writeText(content)
                    }}
                    variant={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Промпты не найдены</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Попробуй изменить параметры поиска или используй другие ключевые слова
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
                >
                  Очистить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
