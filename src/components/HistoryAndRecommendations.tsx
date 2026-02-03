'use client'

import { Clock, Lightbulb, Trash2 } from 'lucide-react'
import { UserHistory } from '@/types'
import Link from 'next/link'

interface HistoryAndRecommendationsProps {
  history?: UserHistory[]
  recommendations?: any[]
  onClearHistory?: () => void
  onRemoveFromHistory?: (id: string) => void
}

export default function HistoryAndRecommendations({
  history = [],
  recommendations = [],
  onClearHistory,
  onRemoveFromHistory,
}: HistoryAndRecommendationsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* История использования */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Недавно использованные</h3>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-gray-500 hover:text-red-600 transition"
            >
              Очистить
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-gray-500">История пока пуста</p>
        ) : (
          <div className="space-y-2">
            {history.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"
              >
                <Link
                  href={`/catalog/${item.promptId}`}
                  className="flex-1 text-sm hover:text-purple-600 transition"
                >
                  <div className="font-medium truncate">{item.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(item.usedAt).toLocaleDateString('ru-RU', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </Link>
                <button
                  onClick={() => onRemoveFromHistory?.(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Рекомендации */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold">Рекомендации для вас</h3>
        </div>

        {recommendations.length === 0 ? (
          <p className="text-sm text-gray-500">Используйте промпты, чтобы получить персонализированные рекомендации</p>
        ) : (
          <div className="space-y-3">
            {recommendations.slice(0, 4).map((rec, idx) => (
              <Link
                key={idx}
                href={`/catalog/${rec.id}`}
                className="block p-2 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
              >
                <div className="font-medium text-sm">{rec.title}</div>
                <div className="text-xs text-gray-500 mt-1">{rec.reason}</div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {rec.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
