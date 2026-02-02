'use client'

import { useState } from 'react'
import { Button } from './ui/Button'
import { BottomSheet } from './ui/BottomSheet'
import { ChevronDown } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
}

interface FiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void
}

const filterOptions = {
  role: [
    { value: 'marketer', label: '📈 Маркетолог' },
    { value: 'developer', label: '💻 Разработчик' },
    { value: 'designer', label: '🎨 Дизайнер' },
    { value: 'writer', label: '✍️ Писатель' },
    { value: 'analyst', label: '📊 Аналитик' },
  ],
  level: [
    { value: 'beginner', label: 'Новичок' },
    { value: 'intermediate', label: 'Средний' },
    { value: 'advanced', label: 'Продвинутый' },
  ],
  format: [
    { value: 'text', label: 'Текст' },
    { value: 'table', label: 'Таблица' },
    { value: 'code', label: 'Код' },
    { value: 'checklist', label: 'Чеклист' },
  ],
  tool: [
    { value: 'ChatGPT', label: 'ChatGPT' },
    { value: 'Claude', label: 'Claude' },
    { value: 'Gemini', label: 'Gemini' },
    { value: 'Midjourney', label: 'Midjourney' },
  ],
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleToggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]

      return {
        ...prev,
        [category]: updated.length > 0 ? updated : undefined,
      }
    })
  }

  const handleApply = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (acc, val) => acc + (val?.length || 0),
    0
  )

  return (
    <>
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto"
      >
        Фильтры
        {activeFilterCount > 0 && (
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-brand rounded-full">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Фильтры"
      >
        <div className="space-y-4">
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category}>
              <button
                onClick={() =>
                  setActiveCategory(activeCategory === category ? null : category)
                }
                className="w-full flex items-center justify-between py-2 font-medium text-gray-900"
              >
                <span className="capitalize">
                  {category === 'role' && '👤 Роль'}
                  {category === 'level' && '📈 Уровень'}
                  {category === 'format' && '📄 Формат'}
                  {category === 'tool' && '🤖 Инструмент'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeCategory === category ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeCategory === category && (
                <div className="mt-2 space-y-2 pl-2">
                  {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 py-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters[category]?.includes(option.value) || false}
                        onChange={() => handleToggleFilter(category, option.value)}
                        className="w-4 h-4 text-brand rounded"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={() => {
              setSelectedFilters({})
              setActiveCategory(null)
            }}
          >
            Очистить
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={handleApply}
          >
            Применить
          </Button>
        </div>
      </BottomSheet>
    </>
  )
}
