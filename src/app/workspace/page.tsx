'use client'

import { mockPrompts } from '@/data/mockData'
import WorkspaceEditor from '@/components/WorkspaceEditor'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function WorkspacePage() {
  const searchParams = useSearchParams()
  const promptId = searchParams.get('prompt')
  
  const prompt = promptId ? mockPrompts.find(p => p.id === promptId) : mockPrompts[0]

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Промпт не найден</p>
          <Link href="/catalog" className="text-purple-600 hover:text-purple-700">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/catalog/${prompt.id}`}>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium mb-4">
              ← Вернуться к промпту
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Workspace</h1>
          <p className="text-gray-600 mt-2">
            Редактируй и улучшай промпты, сохраняя историю всех изменений
          </p>
        </div>

        <WorkspaceEditor
          prompt={prompt}
          onSave={(content, changes) => {
            console.log('Saved:', { content, changes })
          }}
        />
      </div>
    </div>
  )
}
