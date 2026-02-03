'use client'

import { useState } from 'react'
import { Search, Sparkles, Filter, X } from 'lucide-react'
import { PromptFilter } from '@/types'

interface SemanticSearchProps {
  onSearch?: (query: string, filters: PromptFilter) => void
  onClear?: () => void
}

export default function SemanticSearch({ onSearch, onClear }: SemanticSearchProps) {
  const [query, setQuery] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<PromptFilter>({
    search: '',
    sort: 'relevant',
  })

  const roles = ['marketer', 'developer', 'designer', 'writer', 'analyst']
  const levels = ['beginner', 'intermediate', 'advanced']
  const tools = ['ChatGPT', 'Claude', 'Gemini', 'Other']

  const semanticSuggestions = [
    { icon: '📝', text: 'Написать статью', query: 'помощь в написании текста' },
    { icon: '💼', text: 'Анализ данных', query: 'анализ информации и статистики' },
    { icon: '🎯', text: 'Маркетинг стратегия', query: 'разработка маркетингового плана' },
    { icon: '🐛', text: 'Отладка кода', query: 'поиск ошибок и исправление кода' },
    { icon: '🎨', text: 'Дизайн концепция', query: 'идеи для визуального дизайна' },
    { icon: '🗣️', text: 'Переговоры', query: 'подготовка к переговорам' },
  ]

  const handleSearch = () => {
    const newFilters = { ...filters, search: query }
    setFilters(newFilters)
    onSearch?.(query, newFilters)
  }

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    const newFilters = { ...filters, search: suggestion }
    setFilters(newFilters)
    onSearch?.(suggestion, newFilters)
  }

  const handleClear = () => {
    setQuery('')
    setFilters({ search: '', sort: 'relevant' })
    onClear?.()
  }

  return (
    <div className="space-y-4">
      {/* Главная поисковая строка */}
      <div className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all" />
          <div className="relative bg-white rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                placeholder="Ищу промпт для... (опиши своюзадачу, не ключевые слова)"
                className="flex-1 bg-transparent outline-none text-lg text-gray-900 placeholder-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Подсказки по смыслу */}
        {!query && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {semanticSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion.query)}
                className="p-3 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group text-left"
              >
                <div className="text-xl mb-1">{suggestion.icon}</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600">
                  {suggestion.text}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Расширенные фильтры */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition"
        >
          <Filter className="w-4 h-4" />
          Расширенные фильтры
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 border rounded-xl space-y-4 bg-gradient-to-br from-purple-50 to-transparent">
            {/* Уровень сложности */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Уровень</label>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setFilters({ ...filters, level: filters.level === level ? undefined : (level as any) })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.level === level
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Роль */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Для какой роли?</label>
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <button
                    key={role}
                    onClick={() => setFilters({ ...filters, role: filters.role === role ? undefined : role })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.role === role
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Инструмент */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Инструмент</label>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                  <button
                    key={tool}
                    onClick={() => setFilters({ ...filters, tool: filters.tool === tool ? undefined : (tool as any) })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filters.tool === tool
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-green-300'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Сортировка */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Сортировать по</label>
              <select
                value={filters.sort}
                onChange={e => setFilters({ ...filters, sort: e.target.value as any })}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="relevant">Релевантности</option>
                <option value="popular">Популярности</option>
                <option value="new">Новизне</option>
              </select>
            </div>

            {/* Кнопка очистки */}
            <button
              onClick={handleClear}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Очистить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
