'use client'

import { mockPrompts } from '@/data/mockData'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Copy, Zap, Edit } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function CatalogPromptPage() {
  const params = useParams()
  const router = useRouter()
  const promptId = params.id as string

  const [copiedText, setCopiedText] = useState('')
  const prompt = mockPrompts.find((p) => p.id === promptId)

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Промпт не найден</p>
          <Link href="/catalog" className="text-brand hover:text-brand-dark">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    )
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopiedText('copied')
    setTimeout(() => setCopiedText(''), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/catalog">
            <button className="text-brand hover:text-brand-dark text-sm mb-4">
              ← Вернуться в каталог
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.title}</h1>
          <p className="text-lg text-gray-600">{prompt.description}</p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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
        <div className="flex flex-wrap gap-2 mb-8">
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
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Текст промпта</h2>
          <div className="bg-white rounded p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap mb-4 overflow-x-auto max-h-96 overflow-y-auto border border-gray-200">
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
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Пример результата</h2>
          <div className="bg-white rounded p-4 text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
            {prompt.exampleResult}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Link href={`/catalog/${prompt.id}/use`} className="flex-1">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 w-full gap-2"
            >
              <Zap className="w-5 h-5" />
              Использовать промпт
            </Button>
          </Link>
          <Link href={`/catalog/${prompt.id}/edit`} className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 w-full gap-2"
            >
              <Edit className="w-5 h-5" />
              Редактировать
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
