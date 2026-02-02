'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Plus, X } from 'lucide-react'
import Link from 'next/link'

export default function CreatePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSave = () => {
    if (!title || !content) {
      alert('Заполните название и текст промпта')
      return
    }
    alert('✅ Промпт создан!')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Назад
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Создать промпт</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Название промпта
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: SEO Copywriting для лендинга"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Теги
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Введите тег и нажмите Enter"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand"
              />
              <Button variant="outline" size="md" onClick={handleAddTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Текст промпта
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Введите текст вашего промпта"
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-brand font-mono text-sm"
            />
          </div>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" size="md" className="w-full">
                Отмена
              </Button>
            </Link>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSave}
            >
              Создать
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
