'use client'

import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { PromptTemplate } from '@/types'
import { Button } from '@/components/ui/Button'

interface TemplateFormProps {
  template?: PromptTemplate
  onSave?: (promptData: any) => void
  onCancel?: () => void
}

export default function TemplateForm({ template, onSave, onCancel }: TemplateFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    template?.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: '',
    }), {}) || {}
  )

  const [error, setError] = useState<string | null>(null)

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }))
    setError(null)
  }

  const handleSubmit = () => {
    // Проверка обязательных полей
    const requiredFields = template?.fields.filter(f => f.required) || []
    const missingFields = requiredFields.filter(f => !formData[f.name])

    if (missingFields.length > 0) {
      setError(`Заполните обязательные поля: ${missingFields.map(f => f.label).join(', ')}`)
      return
    }

    onSave?.({
      templateId: template?.id,
      fields: formData,
      name: `${template?.name} - ${new Date().toLocaleDateString('ru-RU')}`,
    })
  }

  if (!template) {
    return null
  }

  return (
    <div className="border rounded-lg p-6 bg-white space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{template.name}</h2>
          <p className="text-sm text-gray-600">{template.description}</p>
        </div>
        <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Поля формы */}
      <div className="space-y-4">
        {template.fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name] || ''}
                onChange={e => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.name] || ''}
                onChange={e => handleFieldChange(field.name, e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Выберите...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[field.name] === true}
                  onChange={e => handleFieldChange(field.name, e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{field.placeholder || field.label}</span>
              </label>
            ) : (
              <input
                type="text"
                value={formData[field.name] || ''}
                onChange={e => handleFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Ошибка */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Кнопки */}
      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={onCancel} variant="outline" className="flex-1">
          Отмена
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-purple-600 hover:bg-purple-700 gap-2">
          <Save className="w-4 h-4" />
          Создать промпт
        </Button>
      </div>
    </div>
  )
}
