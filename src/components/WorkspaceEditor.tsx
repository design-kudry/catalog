'use client'

import { useState } from 'react'
import { Save, Copy, History, Trash2, Clock, Check } from 'lucide-react'
import { Prompt, PromptVersion } from '@/types'
import { Button } from '@/components/ui/Button'

interface WorkspaceEditorProps {
  prompt: Prompt
  onSave?: (content: string, changes: string) => void
}

export default function WorkspaceEditor({ prompt, onSave }: WorkspaceEditorProps) {
  const [content, setContent] = useState(prompt.content)
  const [versions, setVersions] = useState<PromptVersion[]>([
    {
      id: '1',
      promptId: prompt.id,
      version: 1,
      content: prompt.content,
      changes: 'Исходный промпт',
      createdAt: new Date(),
      createdBy: 'system',
      isPublished: true,
    },
  ])
  const [selectedVersion, setSelectedVersion] = useState('1')
  const [changeDescription, setChangeDescription] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSaveVersion = () => {
    if (!changeDescription.trim()) {
      alert('Опишите, что вы изменили')
      return
    }

    const newVersion: PromptVersion = {
      id: String(versions.length + 1),
      promptId: prompt.id,
      version: versions.length + 1,
      content,
      changes: changeDescription,
      createdAt: new Date(),
      createdBy: 'user',
      isPublished: false,
    }

    setVersions([...versions, newVersion])
    setSelectedVersion(newVersion.id)
    onSave?.(content, changeDescription)
    setChangeDescription('')
  }

  const currentVersion = versions.find(v => v.id === selectedVersion)
  const contentDiff = currentVersion?.content !== prompt.content

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Основной редактор */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header */}
        <div className="p-4 border rounded-xl bg-gradient-to-r from-purple-50 to-transparent">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{prompt.title}</h1>
          <p className="text-sm text-gray-600">{prompt.description}</p>
        </div>

        {/* Редактор */}
        <div className="border rounded-xl overflow-hidden">
          <div className="h-96 bg-gray-900 p-4">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none p-0"
              placeholder="Редактируй промпт здесь..."
            />
          </div>
        </div>

        {/* Описание изменений */}
        <div className="border rounded-xl p-4 bg-blue-50 border-blue-200">
          <label className="block text-sm font-semibold mb-2 text-gray-900">
            Что ты изменил? (опиши для истории)
          </label>
          <input
            type="text"
            value={changeDescription}
            onChange={e => setChangeDescription(e.target.value)}
            placeholder="Например: добавил переменные, улучшил структуру, расширил контекст"
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-3">
          <Button
            onClick={handleSaveVersion}
            disabled={!contentDiff || !changeDescription.trim()}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 gap-2"
          >
            <Save className="w-4 h-4" />
            Сохранить версию
          </Button>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            className="gap-2"
          >
            {showPreview ? '✕ Закрыть' : 'Превью'}
          </Button>
        </div>

        {/* Превью */}
        {showPreview && (
          <div className="border rounded-xl p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-sm font-bold mb-3 text-gray-900">Превью промпта для копирования</h3>
            <div className="p-4 bg-white rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-800 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                {content}
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(content)
                alert('Скопировано в буфер обмена!')
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
            >
              <Copy className="w-4 h-4" />
              Копировать
            </button>
          </div>
        )}
      </div>

      {/* Боковая панель - История версий */}
      <div className="space-y-4">
        {/* Переключатель */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-gray-900">История версий</span>
          </div>
          <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
            {versions.length}
          </span>
        </button>

        {/* Список версий */}
        {showHistory && (
          <div className="border rounded-xl p-3 space-y-2 max-h-96 overflow-y-auto">
            {versions
              .sort((a, b) => b.version - a.version)
              .map(version => (
                <div
                  key={version.id}
                  onClick={() => setSelectedVersion(version.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedVersion === version.id
                      ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-300'
                      : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Версия {version.version}
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5">{version.changes}</div>
                    </div>
                    {version.isPublished && (
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3" />
                    {new Date(version.createdAt).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Статистика версии */}
        {currentVersion && (
          <div className="border rounded-xl p-4 bg-gradient-to-br from-gray-50 to-transparent space-y-3">
            <h3 className="text-sm font-bold text-gray-900">Текущая версия</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Версия:</span>
                <span className="font-semibold">{currentVersion.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Символов:</span>
                <span className="font-semibold">{currentVersion.content.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Слов:</span>
                <span className="font-semibold">
                  {currentVersion.content.split(/\s+/).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Строк:</span>
                <span className="font-semibold">
                  {currentVersion.content.split('\n').length}
                </span>
              </div>
            </div>

            {/* Разница */}
            {currentVersion.id !== '1' && (
              <div className="pt-3 border-t">
                <div className="text-xs font-bold text-gray-700 mb-2">Изменено от исходного</div>
                <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                  <span className="font-semibold">+{currentVersion.content.length - versions[0].content.length}</span> символов
                </div>
              </div>
            )}
          </div>
        )}

        {/* Быстрые действия */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full gap-2 text-xs"
            onClick={() => setContent(prompt.content)}
          >
            <Trash2 className="w-4 h-4" />
            Вернуть оригинал
          </Button>
        </div>
      </div>
    </div>
  )
}
