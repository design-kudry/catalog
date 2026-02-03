'use client'

import { mockPrompts } from '@/data/mockData'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Copy, Zap, Edit, Heart, Share2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import InteractiveVariables from '@/components/InteractiveVariables'
import ResultsShowcase from '@/components/ResultsShowcase'
import Reviews from '@/components/Reviews'
import HistoryAndRecommendations from '@/components/HistoryAndRecommendations'

export default function CatalogPromptPage() {
  const params = useParams()
  const router = useRouter()
  const promptId = params.id as string

  const [copiedText, setCopiedText] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'examples' | 'reviews' | 'recommendations'>('overview')
  const prompt = mockPrompts.find((p) => p.id === promptId)

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-gray-600 mb-4 text-lg font-semibold">Промпт не найден</p>
          <Link href="/catalog" className="text-purple-600 hover:text-purple-700 font-medium">
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/catalog">
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
              ← Вернуться в каталог
            </button>
          </Link>
        </div>

        {/* Header Card */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{prompt.title}</h1>
              <p className="text-lg text-gray-700">{prompt.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-lg transition ${
                  isSaved
                    ? 'bg-red-100 text-red-600'
                    : 'bg-white text-gray-400 hover:text-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-lg bg-white text-gray-400 hover:text-blue-600 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-600 font-semibold uppercase">Роль</div>
              <div className="font-bold text-gray-900 mt-1">{prompt.role}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-600 font-semibold uppercase">Уровень</div>
              <div className="font-bold text-gray-900 mt-1 capitalize">{prompt.level}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-600 font-semibold uppercase">Формат</div>
              <div className="font-bold text-gray-900 mt-1 capitalize">{prompt.format}</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-xs text-gray-600 font-semibold uppercase">Инструмент</div>
              <div className="font-bold text-gray-900 mt-1">{prompt.tool}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 5 && (
              <span className="px-3 py-1 text-xs text-gray-600">+{prompt.tags.length - 5}</span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['overview', 'examples', 'reviews', 'recommendations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm transition border-b-2 ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && 'Обзор'}
              {tab === 'examples' && 'Примеры'}
              {tab === 'reviews' && 'Отзывы'}
              {tab === 'recommendations' && 'Рекомендации'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Интерактивные переменные */}
            {prompt.variables && prompt.variables.length > 0 && (
              <div className="mb-8">
                <InteractiveVariables
                  prompt={prompt}
                  onExecute={(content) => {
                    navigator.clipboard.writeText(content)
                    alert('Промпт скопирован в буфер обмена!')
                  }}
                />
              </div>
            )}

            {/* Основной контент - если нет переменных */}
            {!prompt.variables || prompt.variables.length === 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-2xl overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                    <h3 className="font-bold text-gray-900">Текст промпта</h3>
                  </div>
                  <div className="p-6 bg-gray-900 text-gray-100 font-mono text-sm max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{prompt.content}</pre>
                  </div>
                  <div className="p-4 border-t bg-white">
                    <button
                      onClick={handleCopyPrompt}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedText ? 'Скопировано!' : 'Копировать промпт'}
                    </button>
                  </div>
                </div>

                <div className="border rounded-2xl overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <h3 className="font-bold text-gray-900">Пример результата</h3>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 max-h-96 overflow-y-auto">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {prompt.exampleResult}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/catalog/${prompt.id}/use`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 gap-2 py-3">
                  <Zap className="w-5 h-5" />
                  Использовать промпт
                </Button>
              </Link>
              <Link href={`/workspace?prompt=${prompt.id}`} className="flex-1">
                <Button variant="outline" className="w-full gap-2 py-3">
                  <Edit className="w-5 h-5" />
                  Редактировать в Workspace
                </Button>
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <ResultsShowcase promptId={promptId} />
        )}

        {activeTab === 'reviews' && (
          <Reviews promptId={promptId} />
        )}

        {activeTab === 'recommendations' && (
          <HistoryAndRecommendations />
        )}
      </div>
    </div>
  )
}
