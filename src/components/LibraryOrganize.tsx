'use client'

import { useState } from 'react'
import { FolderPlus, Tag, Lock, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface LibraryOrganizeProps {
  onCreateFolder?: (name: string) => void
  onAddTag?: (promptId: string, tag: string) => void
}

export default function LibraryOrganize({ onCreateFolder, onAddTag }: LibraryOrganizeProps) {
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [newTag, setNewTag] = useState('')
  const [folders, setFolders] = useState<any[]>([
    { id: '1', name: 'Маркетинг', color: 'blue', count: 12 },
    { id: '2', name: 'Разработка', color: 'green', count: 8 },
    { id: '3', name: 'Дизайн', color: 'purple', count: 5 },
  ])

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      onCreateFolder?.(folderName)
      setFolders([...folders, {
        id: String(folders.length + 1),
        name: folderName,
        color: 'gray',
        count: 0,
      }])
      setFolderName('')
      setShowNewFolder(false)
    }
  }

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    gray: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="space-y-6">
      {/* Папки */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Мои папки</h3>
          <Button
            onClick={() => setShowNewFolder(!showNewFolder)}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <FolderPlus className="w-4 h-4" />
            Новая папка
          </Button>
        </div>

        {showNewFolder && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={folderName}
              onChange={e => setFolderName(e.target.value)}
              placeholder="Название папки..."
              className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={e => e.key === 'Enter' && handleCreateFolder()}
            />
            <Button onClick={handleCreateFolder} size="sm" className="bg-purple-600 hover:bg-purple-700">
              Создать
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`p-3 rounded-lg cursor-pointer transition ${colorMap[folder.color]} hover:shadow-md`}
            >
              <div className="font-medium text-sm">{folder.name}</div>
              <div className="text-xs opacity-75 mt-1">{folder.count} промптов</div>
            </div>
          ))}
        </div>
      </div>

      {/* Метки */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4" />
          <h3 className="font-semibold">Метки (теги)</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="Новая метка..."
            className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={e => {
              if (e.key === 'Enter' && newTag.trim()) {
                onAddTag?.('current', newTag)
                setNewTag('')
              }
            }}
          />
          <Button
            onClick={() => {
              if (newTag.trim()) {
                onAddTag?.('current', newTag)
                setNewTag('')
              }
            }}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Добавить
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Срочное', 'Недавно используемое', 'В разработке', 'Архив', 'Избранное'].map(tag => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition group cursor-pointer"
            >
              <span>{tag}</span>
              <button className="opacity-0 group-hover:opacity-100 text-purple-500 hover:text-purple-700">
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Доступ к библиотеке */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Видимость библиотеки</h3>

        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
            <Lock className="w-5 h-5 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-sm">Только для меня (приватная)</div>
              <div className="text-xs text-gray-500">Никто не может видеть вашу библиотеку</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
            <Globe className="w-5 h-5 text-gray-600" />
            <div className="text-left">
              <div className="font-medium text-sm">Публичная</div>
              <div className="text-xs text-gray-500">Все пользователи могут видеть и копировать</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
