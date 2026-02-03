'use client'

import { useState } from 'react'
import { Copy, Heart, Share2, Eye, TrendingUp, Zap } from 'lucide-react'
import { Prompt } from '@/types'
import Link from 'next/link'

interface ModernPromptCardProps {
  prompt: Prompt
  onSave?: (id: string) => void
  onCopy?: (content: string) => void
  variant?: 'grid' | 'list'
}

export default function ModernPromptCard({
  prompt,
  onSave,
  onCopy,
  variant = 'grid',
}: ModernPromptCardProps) {
  const [isSaved, setIsSaved] = useState(prompt.isSaved || false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setIsCopied(true)
    onCopy?.(prompt.content)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(prompt.id)
  }

  const levelColors = {
    beginner: 'from-green-50 to-emerald-50 border-green-200',
    intermediate: 'from-blue-50 to-cyan-50 border-blue-200',
    advanced: 'from-purple-50 to-violet-50 border-purple-200',
  }

  const levelBadges = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-blue-100 text-blue-700',
    advanced: 'bg-purple-100 text-purple-700',
  }

  if (variant === 'list') {
    return (
      <Link href={`/catalog/${prompt.id}`}>
        <div className="group p-4 border rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-white to-gray-50 hover:from-purple-50 hover:to-white">
          <div className="flex items-start justify-between gap-4">
            {/* Левая часть */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-purple-600 transition">
                  {prompt.title}
                </h3>
                {prompt.level === 'advanced' && (
                  <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {prompt.description}
              </p>

              {/* Метаинформация */}
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                  {prompt.role}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelBadges[prompt.level]}`}>
                  {prompt.level}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {prompt.usedCount.toLocaleString()}
                </span>
              </div>

              {/* Теги */}
              <div className="flex gap-2 flex-wrap">
                {prompt.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition"
                  >
                    {tag}
                  </span>
                ))}
                {prompt.tags.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">+{prompt.tags.length - 3}</span>
                )}
              </div>
            </div>

            {/* Правая часть - Действия */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={e => {
                  e.preventDefault()
                  handleCopy()
                }}
                className="p-2 rounded-lg hover:bg-purple-100 transition group/copy"
                title="Копировать промпт"
              >
                <Copy className={`w-4 h-4 ${isCopied ? 'text-green-600' : 'text-gray-600 group-hover/copy:text-purple-600'}`} />
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  handleSave()
                }}
                className="p-2 rounded-lg hover:bg-red-100 transition"
                title={isSaved ? 'Убрать из сохраненных' : 'Добавить в сохраненные'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-red-600'}`} />
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                }}
                className="p-2 rounded-lg hover:bg-blue-100 transition group/share"
                title="Поделиться"
              >
                <Share2 className="w-4 h-4 text-gray-600 group-hover/share:text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid вариант
  return (
    <Link href={`/catalog/${prompt.id}`}>
      <div className={`group h-full rounded-2xl border overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${levelColors[prompt.level]}`}>
        {/* Header с категорией */}
        <div className="p-4 border-b bg-white/40 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <div className={`text-xs font-bold px-2 py-1 rounded-lg w-fit mb-2 ${levelBadges[prompt.level]}`}>
                {prompt.level}
              </div>
              <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition">
                {prompt.title}
              </h3>
            </div>
            {prompt.level === 'advanced' && (
              <Zap className="w-5 h-5 text-amber-500 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-700 line-clamp-3">
            {prompt.description}
          </p>

          {/* Инструмент и формат */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-white/60 text-gray-700 px-2.5 py-1 rounded-full font-medium">
              {prompt.tool}
            </span>
            <span className="text-xs bg-white/60 text-gray-700 px-2.5 py-1 rounded-full font-medium">
              {prompt.format}
            </span>
          </div>

          {/* Теги */}
          <div className="flex gap-1.5 flex-wrap">
            {prompt.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-xs bg-purple-100/70 text-purple-700 px-2 py-0.5 rounded-full hover:bg-purple-200 transition"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-0.5">+{prompt.tags.length - 2}</span>
            )}
          </div>

          {/* Рейтинг и статистика */}
          <div className="pt-2 border-t border-white/40 flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {prompt.usedCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                {prompt.savedCount.toLocaleString()}
              </span>
            </div>
            <span className="flex items-center gap-1 font-medium text-purple-600">
              <TrendingUp className="w-3.5 h-3.5" />
              {Math.round(prompt.usedCount / 100)}%
            </span>
          </div>
        </div>

        {/* Footer - Действия */}
        <div className="px-4 py-3 border-t bg-white/30 backdrop-blur-sm flex gap-2">
          <button
            onClick={e => {
              e.preventDefault()
              handleCopy()
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium text-sm transition-all group/copy shadow-md hover:shadow-lg"
            title="Копировать промпт"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">{isCopied ? 'Скопировано!' : 'Копировать'}</span>
          </button>
          <button
            onClick={e => {
              e.preventDefault()
              handleSave()
            }}
            className="p-2 rounded-lg hover:bg-red-100 transition group/heart"
            title={isSaved ? 'Убрать из сохраненных' : 'Добавить в сохраненные'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover/heart:text-red-600'}`} />
          </button>
        </div>
      </div>
    </Link>
  )
}
