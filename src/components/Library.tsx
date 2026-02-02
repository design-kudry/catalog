'use client'

import { SavedPrompt } from '@/types'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Trash2, Edit, Copy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface LibraryProps {
  prompts: SavedPrompt[]
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

export function Library({ prompts, onDelete, onEdit }: LibraryProps) {
  const draftPrompts = prompts.filter((p) => p.isDraft)
  const savedPrompts = prompts.filter((p) => !p.isDraft)

  const PromptItem = ({
    prompt,
    isDraft,
  }: {
    prompt: SavedPrompt
    isDraft: boolean
  }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{prompt.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(prompt.updatedAt).toLocaleDateString('ru-RU')}
          </p>
        </div>
        {isDraft && (
          <Badge label="Черновик" variant="gray" size="sm" />
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {prompt.tags.map((tag) => (
          <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(prompt.id)}
        >
          <Edit className="w-4 h-4" />
          <span className="hidden sm:inline">Редактировать</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">Копировать</span>
        </Button>
        <button
          onClick={() => onDelete(prompt.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Моя библиотека</h1>
        <p className="text-gray-600 mt-2">
          {prompts.length} {prompts.length === 1 ? 'промпт' : 'промптов'}
        </p>
      </div>

      {/* Drafts Section */}
      {draftPrompts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Черновики ({draftPrompts.length})
          </h2>
          <div className="grid gap-4">
            {draftPrompts.map((prompt) => (
              <PromptItem key={prompt.id} prompt={prompt} isDraft={true} />
            ))}
          </div>
        </div>
      )}

      {/* Saved Section */}
      {savedPrompts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Сохраненные ({savedPrompts.length})
          </h2>
          <div className="grid gap-4">
            {savedPrompts.map((prompt) => (
              <PromptItem key={prompt.id} prompt={prompt} isDraft={false} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Библиотека пуста
          </h2>
          <p className="text-gray-600 mb-6">
            Начните сохранять промпты, чтобы они появились здесь
          </p>
          <Link href="/">
            <Button variant="primary">Начать</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
