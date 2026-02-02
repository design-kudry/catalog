'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SearchInput } from '@/components/ui/SearchInput'
import { BookOpen, Zap, Edit } from 'lucide-react'
import { useState } from 'react'
import { mockCollections } from '@/data/mockData'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery) {
      // Переход в каталог с поиском
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Найди нужный промпт за секунду
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Используй готовый промпт, генерируй новый или создавай свой. Все в одном месте.
        </p>

        {/* Central Search */}
        <div className="mb-12">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            placeholder="Ищи по смыслу: 'промпт для интервью', 'генерация идей', 'SEO'..."
          />
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/catalog">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3">
              <BookOpen className="w-6 h-6" />
              <div>
                <div className="font-semibold">Использовать готовый</div>
                <div className="text-sm text-gray-600">Каталог промптов</div>
              </div>
            </Button>
          </Link>

          <Link href="/generator">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3">
              <Zap className="w-6 h-6" />
              <div>
                <div className="font-semibold">Сгенерировать</div>
                <div className="text-sm text-gray-600">По параметрам</div>
              </div>
            </Button>
          </Link>

          <Link href="/create">
            <Button variant="outline" size="lg" className="w-full h-full py-8 flex-col gap-3">
              <Edit className="w-6 h-6" />
              <div>
                <div className="font-semibold">Создать свой</div>
                <div className="text-sm text-gray-600">С нуля</div>
              </div>
            </Button>
          </Link>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Популярные подборки
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockCollections.map((collection) => (
            <Link key={collection.id} href={`/catalog?category=${collection.id}`}>
              <button className="w-full p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center group">
                <div className="text-3xl mb-2">{collection.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-brand transition-colors">
                  {collection.name}
                </h3>
                <p className="text-xs text-gray-600">{collection.promptCount}</p>
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            💡 Быстрый старт
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Используй поиск для нейропоиска по смыслу</li>
            <li>• Генератор поможет создать промпт по параметрам (без рукотворства)</li>
            <li>• Сохраняй все версии в Библиотеке</li>
            <li>• Редактируй готовые промпты под свои нужды</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
