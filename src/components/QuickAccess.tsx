'use client'

import { ChevronRight, BookmarkIcon, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface QuickAccessProps {
  recentPrompts?: any[]
  favoritePrompts?: any[]
  templates?: any[]
}

export default function QuickAccess({ recentPrompts = [], favoritePrompts = [], templates = [] }: QuickAccessProps) {
  return (
    <div className="space-y-4">
      {/* Недавние */}
      {recentPrompts.length > 0 && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-4 h-4 text-gray-600" />
            <h3 className="font-semibold text-sm">Недавно использованные</h3>
            <Link href="/library?tab=recent" className="ml-auto text-xs text-purple-600 hover:text-purple-700">
              Все →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recentPrompts.slice(0, 4).map(prompt => (
              <Link
                key={prompt.id}
                href={`/catalog/${prompt.id}`}
                className="p-2 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition group"
              >
                <div className="font-medium text-xs truncate">{prompt.title}</div>
                <div className="text-xs text-gray-500 mt-1 group-hover:text-purple-600">
                  Использовали →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Избранное */}
      {favoritePrompts.length > 0 && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <BookmarkIcon className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-sm">Избранные промпты</h3>
            <Link href="/library?tab=favorite" className="ml-auto text-xs text-purple-600 hover:text-purple-700">
              Все →
            </Link>
          </div>
          <div className="space-y-2">
            {favoritePrompts.slice(0, 3).map(prompt => (
              <Link
                key={prompt.id}
                href={`/catalog/${prompt.id}`}
                className="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg transition"
              >
                <div>
                  <div className="font-medium text-sm">{prompt.title}</div>
                  <div className="text-xs text-gray-500">{prompt.category}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Шаблоны */}
      {templates.length > 0 && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Создать по шаблону</h3>
            <Link href="/create?templates=true" className="text-xs text-purple-600 hover:text-purple-700">
              Все →
            </Link>
          </div>
          <div className="space-y-2">
            {templates.slice(0, 3).map(template => (
              <Link
                key={template.id}
                href={`/create?template=${template.id}`}
                className="block p-2 border border-purple-200 hover:border-purple-500 hover:bg-purple-50 rounded-lg transition"
              >
                <div className="font-medium text-sm text-purple-700">{template.name}</div>
                <div className="text-xs text-gray-500 mt-1">{template.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {recentPrompts.length === 0 && favoritePrompts.length === 0 && templates.length === 0 && (
        <div className="p-6 text-center bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 mb-3">Быстрый доступ к вашим промптам появится здесь</p>
          <Link href="/catalog" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Перейти в каталог →
          </Link>
        </div>
      )}
    </div>
  )
}
