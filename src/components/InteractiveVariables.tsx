'use client'

import { useState } from 'react'
import { Copy, Play } from 'lucide-react'
import { Prompt } from '@/types'
import { Button } from '@/components/ui/Button'

interface InteractiveVariablesProps {
  prompt: Prompt
  onExecute?: (content: string, variables: Record<string, string>) => void
}

export default function InteractiveVariables({ prompt, onExecute }: InteractiveVariablesProps) {
  const [variables, setVariables] = useState<Record<string, string>>(
    prompt.variables?.reduce((acc, v) => ({
      ...acc,
      [v.name]: v.defaultValue || '',
    }), {}) || {}
  )

  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!prompt.variables || prompt.variables.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 text-center">
        Этот промпт не содержит интерактивных переменных
      </div>
    )
  }

  const getFilledContent = () => {
    let content = prompt.content
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })
    return content
  }

  const handleCopy = (fieldName: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Поля ввода */}
      <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold text-sm">Интерактивные переменные</h3>
        
        {prompt.variables.map(variable => (
          <div key={variable.id}>
            <label className="block text-sm font-medium mb-1">{variable.label}</label>
            
            {variable.type === 'textarea' ? (
              <textarea
                value={variables[variable.name] || ''}
                onChange={e => setVariables({ ...variables, [variable.name]: e.target.value })}
                placeholder={variable.placeholder}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            ) : variable.type === 'select' ? (
              <select
                value={variables[variable.name] || ''}
                onChange={e => setVariables({ ...variables, [variable.name]: e.target.value })}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Выберите...</option>
                {variable.options?.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={variables[variable.name] || ''}
                onChange={e => setVariables({ ...variables, [variable.name]: e.target.value })}
                placeholder={variable.placeholder}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Предпросмотр */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Предпросмотр заполненного промпта</h3>
          <button
            onClick={() => handleCopy('content', getFilledContent())}
            className="text-xs px-2 py-1 rounded hover:bg-gray-200 transition flex gap-1"
          >
            <Copy className="w-3 h-3" />
            {copiedField === 'content' ? 'Скопировано!' : 'Скопировать'}
          </button>
        </div>
        <div className="p-3 bg-gray-50 border rounded-lg text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
          {getFilledContent()}
        </div>
      </div>

      {/* Кнопка выполнения */}
      <Button
        onClick={() => onExecute?.(getFilledContent(), variables)}
        className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
      >
        <Play className="w-4 h-4" />
        Использовать этот промпт
      </Button>
    </div>
  )
}
