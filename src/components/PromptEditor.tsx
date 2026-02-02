'use client'

import { PromptVariable } from '@/types'
import { Button } from './ui/Button'
import { useState } from 'react'
import { Eye, EyeOff, Copy } from 'lucide-react'

interface PromptEditorProps {
  title: string
  content: string
  variables?: PromptVariable[]
  onSave: (data: { title: string; content: string }) => void
}

export function PromptEditor({
  title: initialTitle,
  content: initialContent,
  variables,
  onSave,
}: PromptEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)

  // Replace variables in content with user values
  const getPreviewContent = () => {
    let preview = content
    Object.entries(variableValues).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value || `{{${key}}}`)
    })
    return preview
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getPreviewContent())
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Название версии
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
          placeholder="Мой промпт для..."
        />
      </div>

      {/* Variables Form */}
      {variables && variables.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Переменные</h2>
          <div className="space-y-4">
            {variables.map((variable) => (
              <div key={variable.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {variable.label}
                </label>
                {variable.type === 'select' && variable.options ? (
                  <select
                    value={variableValues[variable.name] || ''}
                    onChange={(e) =>
                      setVariableValues((prev) => ({
                        ...prev,
                        [variable.name]: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand"
                  >
                    <option value="">Выберите...</option>
                    {variable.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : variable.type === 'textarea' ? (
                  <textarea
                    value={variableValues[variable.name] || ''}
                    onChange={(e) =>
                      setVariableValues((prev) => ({
                        ...prev,
                        [variable.name]: e.target.value,
                      }))
                    }
                    placeholder={variable.placeholder}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand font-mono text-sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={variableValues[variable.name] || ''}
                    onChange={(e) =>
                      setVariableValues((prev) => ({
                        ...prev,
                        [variable.name]: e.target.value,
                      }))
                    }
                    placeholder={variable.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content & Preview */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Текст промпта
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand font-mono text-sm"
          />
        </div>

        {/* Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-900">Preview</label>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-brand hover:text-brand-dark"
            >
              {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          <div className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm text-gray-700 whitespace-pre-wrap overflow-y-auto">
            {showPreview ? getPreviewContent() : content}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 sticky bottom-0 bg-white p-4 -mx-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="md"
          onClick={handleCopy}
          className="flex-1"
        >
          <Copy className="w-4 h-4" />
          Копировать
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => onSave({ title, content })}
          className="flex-1"
        >
          Сохранить версию
        </Button>
      </div>
    </div>
  )
}
