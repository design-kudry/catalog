'use client'

import { useState } from 'react'
import { mockPrompts, mockSavedPrompts } from '@/data/mockData'
import { PromptDetails } from '@/components/PromptDetails'
import { PromptEditor } from '@/components/PromptEditor'
import { useParams, useRouter } from 'next/navigation'

export default function PromptPage() {
  const params = useParams()
  const router = useRouter()
  const promptId = params.id as string

  const [screen, setScreen] = useState<'details' | 'editor'>('details')

  const prompt = mockPrompts.find((p) => p.id === promptId)

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Промпт не найден</p>
          <button
            onClick={() => router.push('/')}
            className="text-brand hover:text-brand-dark"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    )
  }

  const handleUsePrompt = () => {
    setScreen('editor')
  }

  const handleSaveVersion = (data: { title: string; content: string }) => {
    alert('✅ Версия сохранена в библиотеку!')
    router.push('/library')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {screen === 'details' && (
          <PromptDetails prompt={prompt} onUse={handleUsePrompt} />
        )}

        {screen === 'editor' && (
          <PromptEditor
            title={`${prompt.title} (версия 1)`}
            content={prompt.content}
            variables={prompt.variables}
            onSave={handleSaveVersion}
          />
        )}
      </div>
    </div>
  )
}
