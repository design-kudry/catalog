'use client'

import { useState } from 'react'
import { Copy, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react'
import { PromptExample } from '@/types'
import { Button } from '@/components/ui/Button'

interface ResultsShowcaseProps {
  promptId: string
  examples?: PromptExample[]
}

export default function ResultsShowcase({ promptId, examples = [] }: ResultsShowcaseProps) {
  const [expandedId, setExpandedId] = useState<string | null>(examples[0]?.id || null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const mockExamples: PromptExample[] = examples.length > 0 ? examples : [
    {
      id: '1',
      promptId,
      input: 'Напиши заголовок для статьи про AI. Целевая аудитория: маркетологи. Тон: профессиональный',
      output:
        'AI в маркетинге: как автоматизация трансформирует стратегию привлечения клиентов\n\nАльтернативные варианты:\n1. От творчества к алгоритмам: как маркетологам адаптироваться к эпохе AI\n2. Зачем маркетологу нейросеть: 5 инструментов для работы\n3. AI как конкурентное преимущество: инструменты маркетолога 2025',
      model: 'GPT-4',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      promptId,
      input: 'Напиши заголовок для статьи про AI. Целевая аудитория: новички. Тон: доступный, интересный',
      output:
        'Что такое AI и почему его уже используют все (даже ты)\n\nДругие варианты:\n1. 5 способов, как AI упрощает жизнь (и почему это важно)\n2. AI для начинающих: что нужно знать прямо сейчас\n3. Искусственный интеллект просто: с чего начать',
      model: 'GPT-4',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      promptId,
      input: 'Напиши заголовок для статьи про AI. Целевая аудитория: разработчики. Тон: технический',
      output:
        'Интеграция LLM в микросервисную архитектуру: best practices и optimization patterns\n\nАльтернативы:\n1. Zero-shot learning в production: как реализовать adaptive prompting\n2. RAG pipeline optimization: от retrieval до response generation\n3. Fine-tuning vs prompt engineering: выбор стратегии для enterprise',
      model: 'GPT-4 Turbo',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  ]

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="p-6 border rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Примеры результатов</h2>
        <p className="text-gray-600">
          Посмотри, как работает промпт на практике. Это поможет понять, сработает ли он на твой случай.
        </p>
      </div>

      {/* Examples Grid */}
      <div className="space-y-4">
        {mockExamples.map(example => (
          <div
            key={example.id}
            className="border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all"
          >
            {/* Header примера */}
            <button
              onClick={() => setExpandedId(expandedId === example.id ? null : example.id)}
              className="w-full p-4 flex items-start justify-between hover:bg-gray-50 transition"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                    {example.model}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(example.timestamp).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2 text-left">
                  Пример: {example.input.slice(0, 80)}...
                </h3>
              </div>
              {expandedId === example.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>

            {/* Развернутый контент */}
            {expandedId === example.id && (
              <div className="border-t space-y-4 p-4">
                {/* Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900">Что ввели в промпт:</h4>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {example.input}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="text-gray-400 text-sm font-medium">↓</div>
                </div>

                {/* Output */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900">Что вернул AI:</h4>
                    <button
                      onClick={() => handleCopy(example.id, example.output)}
                      className="text-xs flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedId === example.id ? 'Скопировано!' : 'Скопировать'}
                    </button>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 max-h-64 overflow-y-auto">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {example.output}
                    </p>
                  </div>
                </div>

                {/* Скриншот если есть */}
                {example.screenshotUrl && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-900">Скриншот:</h4>
                    <div className="p-3 bg-gray-100 rounded-xl border border-gray-300 flex items-center justify-center h-32">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Вердикт */}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-xs font-bold text-yellow-900 mb-1">✓ Результат</div>
                  <div className="text-sm text-yellow-800">
                    Промпт сработал хорошо. Качество вывода высокое, структура понятна, варианты разнообразные.
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA для добавления своего примера */}
      <div className="p-6 border-2 border-dashed border-purple-300 rounded-2xl bg-purple-50 text-center">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Тебя не убедил пример?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Отправь свой промпт и посмотри, как AI ответит на него
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          Протестировать промпт
        </Button>
      </div>
    </div>
  )
}
