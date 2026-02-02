'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Copy, Save, Zap } from 'lucide-react'
import Link from 'next/link'

// Расширенные роли (dropdown)
const roles = [
  'SEO Специалист',
  'Copywriter',
  'Content Manager',
  'Product Manager',
  'UX/UI Designer',
  'Data Analyst',
  'Marketing Manager',
  'Software Engineer',
  'Project Manager',
  'Business Analyst',
  'HR Specialist',
  'Менеджер продаж'
]

// Форматы ответа
const formats = [
  'Структурированный текст',
  'Список пунктов',
  'Таблица',
  'JSON',
  'CSV',
  'Markdown',
  'HTML'
]

// Переименованы в "Тон" и расширены
const tones = [
  'Профессиональный',
  'Дружелюбный',
  'Творческий',
  'Краткий',
  'Детальный',
  'Технический',
  'Простой',
  'Убедительный'
]

export default function GeneratorPage() {
  const [role, setRole] = useState('')
  const [task, setTask] = useState('')
  const [format, setFormat] = useState('')
  const [tone, setTone] = useState('')
  const [context, setContext] = useState('')
  const [constraints, setConstraints] = useState('')
  const [generated, setGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generatedPrompt = role && task ? `Ты ${role}.

Твоя задача: ${task}

${format ? `Формат ответа: ${format}` : ''}
${tone ? `Тон общения: ${tone}` : ''}
${context ? `Контекст: ${context}` : ''}
${constraints ? `Ограничения: ${constraints}` : ''}

[Сгенерированный промпт на основе указанных параметров]
` : 'Заполните параметры для генерации'

  const handleGenerate = () => {
    if (!role || !task) {
      alert('Обязательно: выберите роль и опишите задачу')
      return
    }
    setIsGenerating(true)
    // Имитация генерации
    setTimeout(() => {
      setGenerated(true)
      setIsGenerating(false)
    }, 1000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt)
    alert('✅ Промпт скопирован!')
  }

  const handleSave = () => {
    alert('✅ Промпт сохранён в библиотеку!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-brand" />
            <h1 className="text-4xl font-bold text-gray-900">Генератор промптов</h1>
          </div>
          <p className="text-gray-600">Укажите параметры, AI соберет промпт автоматически</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Parameters */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Параметры конфигурации</h2>

              {/* Role - Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Роль *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                >
                  <option value="">Выберите роль</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Task - Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Задача *
                </label>
                <textarea
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Например: Помочь написать убедительный текст для лендинга"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              {/* Format - Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Формат ответа
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                >
                  <option value="">Любой</option>
                  {formats.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone - Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Тон общения
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                >
                  <option value="">Любой</option>
                  {tones.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Context - Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Контекст (опционально)
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="На русском для интернет-магазина, B2B аудитория..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              {/* Constraints - Textarea */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Ограничения (опционально)
                </label>
                <textarea
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="Максимум 500 слов, без использования слова 'бесплатно'..."
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Zap className="w-5 h-5" />
                {isGenerating ? 'Генерируем...' : 'Сгенерировать промпт'}
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {generated ? 'Результат' : 'Предпросмотр'}
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 min-h-96 font-mono text-sm text-gray-700 whitespace-pre-wrap break-words">
                {generatedPrompt}
              </div>

              {generated && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1"
                    onClick={handleCopy}
                  >
                    <Copy className="w-4 h-4" />
                    Копировать
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
