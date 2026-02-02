'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/Button'
import { Plus, Home, BookOpen, Zap, Brain } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Главная', icon: Home },
    { href: '/catalog', label: 'Каталог', icon: BookOpen },
    { href: '/generator', label: 'Генератор', icon: Brain },
    { href: '/library', label: 'Библиотека', icon: Zap },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-brand">
            💬 PromptHub
          </Link>

          {/* Nav items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      isActive(item.href)
                        ? 'bg-brand/10 text-brand font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </div>

          {/* Action button */}
          <Link href="/create">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Создать</span>
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs transition-colors ${
                    isActive(item.href)
                      ? 'bg-brand/10 text-brand font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
