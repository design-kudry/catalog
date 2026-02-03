'use client'

import { useState } from 'react'
import { Copy, ChevronRight, ArrowRightLeft } from 'lucide-react'
import { Prompt } from '@/types'

interface ComparisonModeProps {
  promptA: Prompt
  promptB?: Prompt
  onSwap?: () => void
}

export default function ComparisonMode({ promptA, promptB, onSwap }: ComparisonModeProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const ComparisonColumn = ({
    prompt,
  }: {
    prompt: Prompt
  }) => {
    const levelColors = {
      beginner: 'from-green-50 to-emerald-50',
      intermediate: 'from-blue-50 to-cyan-50',
      advanced: 'from-purple-50 to-violet-50',
    }

    const levelBadges = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-blue-100 text-blue-700',
      advanced: 'bg-purple-100 text-purple-700',
    }

    return (
      <div className={`flex-1 rounded-2xl border overflow-hidden bg-gradient-to-br ${levelColors[prompt.level]}`}>
        {/* Header */}
        <div className="p-6 border-b bg-white/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{prompt.description}</p>

          {/* Мета-информация */}
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${levelBadges[prompt.level]}`}>
              {prompt.level}
            </span>
            <span className="text-xs bg-white/60 text-gray-700 px-3 py-1 rounded-full font-medium">
              {prompt.role}
            </span>
            <span className="text-xs bg-white/60 text-gray-700 px-3 py-1 rounded-full font-medium">
              {prompt.tool}
            </span>
          </div>
        </div>

        {/* Основной контент */}
        <div className="p-6 space-y-4">
          {/* Статистика */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-white/60 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{prompt.usedCount.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Использовано</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600">{prompt.savedCount.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-1">Сохранено</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(prompt.usedCount / 100)}%</div>
              <div className="text-xs text-gray-600 mt-1">Популярность</div>
            </div>
          </div>

          {/* Теги */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map(tag => (
                <span key={tag} className="text-xs bg-purple-100/70 text-purple-700 px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Промпт */}
          <div>
            <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase">Текст промпта</h3>
            <div className="p-4 bg-white/60 rounded-xl border border-gray-200 max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {prompt.content}
              </p>
            </div>
          </div>

          {/* Пример результата */}
          {prompt.exampleResult && (
            <div>
              <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase">Пример результата</h3>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 max-h-32 overflow-y-auto">
                <p className="text-sm text-gray-800 whitespace-pre-wrap text-xs leading-relaxed">
                  {prompt.exampleResult}
                </p>
              </div>
            </div>
          )}

          {/* Переменные */}
          {prompt.variables && prompt.variables.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-700 mb-2 uppercase">Переменные</h3>
              <div className="space-y-2">
                {prompt.variables.map(v => (
                  <div key={v.id} className="p-2 bg-white/60 rounded-lg border border-gray-200">
                    <div className="text-xs font-medium text-gray-900">{v.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{'{' + v.name + '}'}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - кнопка копирования */}
        <div className="p-4 border-t bg-white/40 backdrop-blur-sm">
          <button
            onClick={() => handleCopy(prompt.id, prompt.content)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Copy className="w-4 h-4" />
            {copiedId === prompt.id ? 'Скопировано!' : 'Скопировать промпт'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Сравнение промптов</h1>
        <p className="text-gray-600">Посмотри различия между версиями и выбери лучшую</p>
      </div>

      {/* Сравнение */}
      <div className="flex gap-4 items-stretch">
        {/* Левая колонна */}
        <ComparisonColumn prompt={promptA} />

        {/* Стрелка посередине */}
        {promptB && (
          <div className="flex items-center justify-center">
            <button
              onClick={onSwap}
              className="p-3 bg-white border-2 border-purple-300 rounded-full hover:bg-purple-50 hover:border-purple-500 transition-all shadow-lg"
              title="Поменять местами"
            >
              <ArrowRightLeft className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        )}

        {/* Правая колонна */}
        {promptB && <ComparisonColumn prompt={promptB} />}

        {/* Если нет второго промпта */}
        {!promptB && (
          <div className="flex-1 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center p-8">
            <div className="text-center">
              <ChevronRight className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Выберите второй промпт для сравнения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
