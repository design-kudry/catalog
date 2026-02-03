'use client'

import { useState } from 'react'
import { Sparkles, Loader } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AIGeneratorRequest } from '@/types'

interface AIGeneratorProps {
  onGenerate?: (prompt: string) => void
}

export default function AIGenerator({ onGenerate }: AIGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<AIGeneratorRequest>({
    goal: '',
    role: 'marketer',
    tone: 'formal',
    context: '',
  })

  const roles = ['marketer', 'developer', 'designer', 'writer', 'analyst', 'manager']
  const tones = ['formal', 'casual', 'technical', 'creative']

  const handleGenerate = async () => {
    if (!formData.goal.trim()) return

    setIsLoading(true)
    try {
      // Имитация AI генерации (в реальности - API вызов)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const generatedPrompt = `Роль: ${formData.role}\nТон: ${formData.tone}\nЦель: ${formData.goal}\n\nКонтекст: ${formData.context || 'Общий'}\n\nСгенерированный промпт:\n...[AI-контент]...`
      
      onGenerate?.(generatedPrompt)
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="lg"
        className="gap-2 bg-purple-50 border-purple-200 hover:bg-purple-100"
      >
        <Sparkles className="w-5 h-5 text-purple-600" />
        <span className="text-purple-700">AI-генератор промптов</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold">Нейро-генератор промптов</h2>
        </div>

        <div className="space-y-4">
          {/* Цель */}
          <div>
            <label className="block text-sm font-medium mb-2">Что тебе нужно?</label>
            <textarea
              value={formData.goal}
              onChange={e => setFormData({ ...formData, goal: e.target.value })}
              placeholder="Например: создать промпт для анализа конкурентов"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>

          {/* Роль */}
          <div>
            <label className="block text-sm font-medium mb-2">Твоя роль</label>
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value as any })}
              className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Тон */}
          <div>
            <label className="block text-sm font-medium mb-2">Тон</label>
            <select
              value={formData.tone}
              onChange={e => setFormData({ ...formData, tone: e.target.value as any })}
              className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {tones.map(tone => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          {/* Контекст */}
          <div>
            <label className="block text-sm font-medium mb-2">Дополнительный контекст (опционально)</label>
            <textarea
              value={formData.context}
              onChange={e => setFormData({ ...formData, context: e.target.value })}
              placeholder="Дополнительная информация для AI"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={2}
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!formData.goal.trim() || isLoading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            Сгенерировать
          </Button>
        </div>
      </div>
    </div>
  )
}
