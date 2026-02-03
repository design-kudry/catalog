'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, BookOpen, Brain, TrendingUp, Users, PenTool, Code, BarChart3, Zap, Globe, Lightbulb, Heart } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
}

const categories: Category[] = [
  {
    id: 'marketing',
    name: 'Маркетинг & Продажи',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'SEO, копирайтинг, email, соцсети',
    color: 'text-blue-600',
  },
  {
    id: 'psychology',
    name: 'Психология',
    icon: <Brain className="w-5 h-5" />,
    description: 'НЛП, мотивация, коммуникация, поведение',
    color: 'text-purple-600',
  },
  {
    id: 'content',
    name: 'Контент & Копирайтинг',
    icon: <PenTool className="w-5 h-5" />,
    description: 'Статьи, посты, видео-сценарии',
    color: 'text-pink-600',
  },
  {
    id: 'development',
    name: 'Разработка',
    icon: <Code className="w-5 h-5" />,
    description: 'Python, JavaScript, отладка, архитектура',
    color: 'text-green-600',
  },
  {
    id: 'design',
    name: 'Дизайн & UX',
    icon: <Lightbulb className="w-5 h-5" />,
    description: 'UI/UX, брендинг, прототипирование',
    color: 'text-amber-600',
  },
  {
    id: 'analytics',
    name: 'Анализ данных',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'SQL, Excel, визуализация, отчёты',
    color: 'text-cyan-600',
  },
  {
    id: 'business',
    name: 'Бизнес & Стартапы',
    icon: <Users className="w-5 h-5" />,
    description: 'Планирование, стратегия, финансы',
    color: 'text-red-600',
  },
  {
    id: 'education',
    name: 'Образование & Обучение',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Курсы, тесты, объяснения, методики',
    color: 'text-indigo-600',
  },
  {
    id: 'productivity',
    name: 'Продуктивность',
    icon: <Zap className="w-5 h-5" />,
    description: 'Планирование, организация, фокус',
    color: 'text-yellow-600',
  },
  {
    id: 'seo',
    name: 'SEO & Поиск',
    icon: <Globe className="w-5 h-5" />,
    description: 'Поиск ключевых слов, ранжирование, вебмастер',
    color: 'text-orange-600',
  },
  {
    id: 'personal',
    name: 'Саморазвитие',
    icon: <Heart className="w-5 h-5" />,
    description: 'Здоровье, развитие, вдохновение',
    color: 'text-rose-600',
  },
]

export default function CategorySidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedCategory = searchParams.get('category')

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('category', categoryId)
    router.push(`/catalog?${params.toString()}`)
  }

  const handleClearFilter = () => {
    router.push('/catalog')
  }

  return (
    <aside className="w-full md:w-64 space-y-4">
      {/* Header */}
      <div className="sticky top-20 md:top-0 bg-white rounded-xl p-4 border border-gray-200 z-30">
        <h2 className="font-semibold text-gray-900 mb-3 text-lg">🎯 Выбери цель</h2>
        <p className="text-sm text-gray-600 mb-4">
          Найди промпты для своей задачи
        </p>
        {selectedCategory && (
          <button
            onClick={handleClearFilter}
            className="w-full py-2 px-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            ✕ Очистить фильтр
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 flex-shrink-0 ${isSelected ? category.color : 'text-gray-400'} group-hover:text-gray-600`}>
                  {isSelected && <CheckCircle className="w-5 h-5" />}
                  {!isSelected && category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm transition-colors ${
                    isSelected ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors ${
                    isSelected ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tips */}
      <div className="hidden md:block bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-2">💡 Совет</p>
        <p className="text-xs text-blue-800 leading-relaxed">
          Выбери категорию чтобы найти релевантные промпты для твоей задачи. Используй поиск для более точного результата.
        </p>
      </div>
    </aside>
  )
}
