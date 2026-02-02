import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'PromptHub - Каталог и редактор AI-промптов',
  description: 'Найди рабочий промпт, адаптируй под себя, сохрани и переиспользуй',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
