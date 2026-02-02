'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { mockPrompts } from '@/data/mockData'
import { useParams } from 'next/navigation'

export default function EditPromptPage() {
  const params = useParams()
  const promptId = params.id as string
  const prompt = mockPrompts.find((p) => p.id === promptId)

  if (!prompt) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Link href="/catalog">
          <Button>Вернуться в каталог</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Link href={`/catalog/${promptId}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Редактирование</h1>
        <div className="bg-white rounded-lg p-6 border">
          <p className="text-gray-600 mb-4">Промпт: <strong>{prompt.title}</strong></p>
          <p className="text-gray-600">Функция редактирования находится в разработке</p>
        </div>
      </div>
    </div>
  )
}
