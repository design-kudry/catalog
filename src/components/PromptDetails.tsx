'use client'

import { Prompt, PromptVariable } from '@/types'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { useState } from 'react'
import { Copy, ArrowLeft, Zap } from 'lucide-react'
import Link from 'next/link'

interface PromptDetailsProps {
  prompt: Prompt
  onUse: () => void
}

export function PromptDetails({ prompt, onUse }: PromptDetailsProps) {
  const [copiedText, setCopiedText] = useState('')

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopiedText('copied')
    setTimeout(() => setCopiedText(''), 2000)
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.title}</h1>
        <p className="text-lg text-gray-600">{prompt.description}</p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">Роль</div>
          <div className="font-semibold text-gray-900">
            {prompt.role.charAt(0).toUpperCase() + prompt.role.slice(1)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">Уровень</div>
          <Badge
            label={
              prompt.level === 'beginner'
                ? 'Новичок'
                : prompt.level === 'intermediate'
                ? 'Средний'
                : 'Продвинутый'
            }
            size="sm"
          />
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">Формат</div>
          <div className="font-semibold text-gray-900 capitalize">{prompt.format}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600">Инструмент</div>
          <div className="font-semibold text-gray-900">{prompt.tool}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Текст промпта</h2>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap mb-4 overflow-x-auto max-h-96 overflow-y-auto">
          {prompt.content}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyPrompt}
          className={copiedText ? 'bg-green-50' : ''}
        >
          <Copy className="w-4 h-4" />
          {copiedText ? 'Скопировано!' : 'Скопировать'}
        </Button>
      </div>

      {/* Example Result */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Пример результата</h2>
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
          {prompt.exampleResult}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={onUse}
        >
          <Zap className="w-5 h-5" />
          Использовать промпт
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
        >
          Редактировать
        </Button>
      </div>
    </div>
  )
}
