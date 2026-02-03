'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/SearchInput'
import { BookOpen, Zap, Edit, Sparkles, BarChart3, Layers } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery) {
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            ✨ Каталог текстовых промптов #1 в РУнете
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Найди идеальный промпт за секунду
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Используй готовый промпт, сравни версии, редактируй и улучшай. Для маркетологов, разработчиков, копирайтеров и всех, кто работает с AI.
          </p>
        </div>

        {/* Central Search */}
        <div className="mb-16">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Ищи: 'промпт для анализа конкурентов', 'написать статью', 'отладка кода'..."
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <Link href="/catalog">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3 border-2 hover:border-purple-500 hover:bg-purple-50">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">Каталог промптов</div>
                <div className="text-sm text-gray-600">100+ проверенных промптов</div>
              </div>
            </Button>
          </Link>

          <Link href="/compare">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3 border-2 hover:border-blue-500 hover:bg-blue-50">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-900">Сравнить версии</div>
                <div className="text-sm text-gray-600">A/B тестирование промптов</div>
              </div>
            </Button>
          </Link>

          <Link href="/workspace">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3 border-2 hover:border-green-500 hover:bg-green-50">
              <Layers className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold text-gray-900">Workspace</div>
                <div className="text-sm text-gray-600">Редактируй и улучшай</div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🔍', title: 'Нейро-поиск', desc: 'По смыслу, не по словам' },
            { icon: '⚡', title: 'Примеры', desc: 'Вход и выход в одном месте' },
            { icon: '💾', title: 'История', desc: 'Сохраняй все версии' },
            { icon: '⭐', title: 'Рейтинги', desc: 'Отзывы от пользователей' },
          ].map((feature, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-purple-300 transition">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section className="bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Популярные промпты</h2>
            <p className="text-gray-600">Начни с самых использованных промптов в нашем каталоге</p>
          </div>

          <div className="text-center">
            <Link href="/catalog">
              <Button className="bg-purple-600 hover:bg-purple-700 gap-2 py-3 px-8">
                <Sparkles className="w-5 h-5" />
                Посмотреть все промпты
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">Хочешь быстрее найти промпт?</h2>
            <p className="mb-6 opacity-90">
              Используй семантический поиск — просто опиши свою задачу
            </p>
            <Link href="/catalog">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                Начать поиск →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
