'use client'

import { Prompt } from '@/types'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { BookmarkPlus, BookmarkCheck, Copy, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface PromptCardProps {
  prompt: Prompt
  onSave: (id: string) => void
  onUse: (id: string) => void
  isSaved?: boolean
}

export function PromptCard({ prompt, onSave, onUse, isSaved = false }: PromptCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  const roleBadgeColors = {
    marketer: 'brand',
    developer: 'brand',
    designer: 'brand',
    writer: 'brand',
    analyst: 'brand',
  } as const

  const levelBadgeText = {
    beginner: 'Новичок',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  } as const

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{prompt.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{prompt.description}</p>
      </div>

      {/* Badges */}
      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
        <Badge
          label={prompt.role.charAt(0).toUpperCase() + prompt.role.slice(1)}
          variant={roleBadgeColors[prompt.role]}
          size="sm"
        />
        <Badge label={levelBadgeText[prompt.level]} size="sm" />
        <Badge label={prompt.format} size="sm" />
      </div>

      {/* Tags */}
      <div className="px-4 py-2 flex flex-wrap gap-1">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
        <span>💾 {prompt.savedCount}</span>
        <span>⚡ {prompt.usedCount}</span>
      </div>

      {/* Actions */}
      <div className="p-4 pt-3 border-t border-gray-100 flex gap-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onSave(prompt.id)}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Сохранено</span>
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Сохранить</span>
            </>
          )}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onUse(prompt.id)}
        >
          <span className="hidden sm:inline">Использовать</span>
          <span className="sm:hidden">Открыть</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
