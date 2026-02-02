'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Copy, Save } from 'lucide-react'
import Link from 'next/link'
import { mockPrompts } from '@/data/mockData'
import { useParams } from 'next/navigation'

export default function UsePromptPage() {
  const params = useParams()
  const promptId = params.id as string
  const prompt = mockPrompts.find((p) => p.id === promptId)

  if (!prompt) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Промпт не найден</h1>
          <Link href="/catalog">
            <Button variant="primary">Вернуться в каталог</Button>
          </Link>
        </div>
      </div>
    )
  }

  const [variables, setVariables] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  // Extract variables from prompt text ({{name}})
  const variableMatches = prompt.content.match(/\{\{(\w+)\}\}/g) || []
  const uniqueVariables = Array.from(new Set(variableMatches.map((v) => v.slice(2, -2))))

  // Replace variables in preview
  let preview = prompt.content
  Object.entries(variables).forEach(([key, value]) => {
    preview = preview.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value)
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(preview)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    alert('✅ Промпт сохранён в библиотеку!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <Link href={`/catalog/${promptId}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад к промпту
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.title}</h1>
        <p className="text-gray-600 mb-8">Заполните переменные и используйте готовый промпт</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Variables Form */}
          <div className="space-y-6">
            {uniqueVariables.length > 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Переменные ({uniqueVariables.length})
                </h2>
                <div className="space-y-4">
                  {uniqueVariables.map((variable) => (
                    <div key={variable}>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        {variable}
                      </label>
                      <input
                        type="text"
                        value={variables[variable] || ''}
                        onChange={(e) =>
                          setVariables((prev) => ({
                            ...prev,
                            [variable]: e.target.value,
                          }))
                        }
                        placeholder={`Введите значение для {{${variable}}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <p className="text-blue-800">В этом промпте нет переменных. Используйте готовый текст.</p>
              </div>
            )}
          </div>

          {/* Preview */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Предпросмотр</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-64 font-mono text-sm text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                {preview}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Скопировано!' : 'Копировать'}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4" />
                  Сохранить
                </Button>
              </div>

              {/* Example */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Пример вывода</h3>
                <p className="text-xs text-gray-600">{prompt.exampleOutput}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
