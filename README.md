# PromptHub - Каталог и редактор AI-промптов

Веб-сервис для поиска, адаптации и сохранения AI-промптов.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Главная страница (каталог)
│   ├── library/        # Библиотека сохраненных промптов
│   ├── prompt/         # Деталь промпта
│   ├── create/         # Создание нового промпта
│   └── layout.tsx      # Root layout
├── components/         # React компоненты
│   ├── ui/             # UI компоненты (Button, Badge, etc)
│   ├── PromptCard.tsx  # Карточка промпта
│   ├── Filters.tsx     # Фильтры
│   ├── PromptDetails.tsx
│   ├── PromptEditor.tsx
│   └── Library.tsx
├── data/               # Mock данные
│   └── mockData.ts
└── types/              # TypeScript типы
    └── index.ts
```

## Функциональность

### 🔍 Поиск и каталог
- Natural language поиск
- Фильтры по ролям, уровню, формату, инструменту
- Сортировка по релевантности, популярности, новизне
- Тематические подборки

### 📝 Редактор промптов
- Интерактивные переменные ({{name}})
- Live preview
- History + undo/redo
- Экспорт и копирование

### 📚 Библиотека
- Сохранение версий промптов
- Черновики
- Теги и папки
- Быстрый поиск

### 🤖 AI-помощь (mock)
- Генератор промптов по цели
- Улучшение промпта
- Автоматическое структурирование

## UI принципы

- Mobile-first адаптивный дизайн
- Минимум кликов до результата
- Inline-действия вместо модалок
- Skeleton loading для empty states
- Спокойный, не перегруженный интерфейс

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

## Roadmap

- [ ] Реальная база данных
- [ ] Аутентификация
- [ ] Social sharing
- [ ] AI-генерация промптов (реальная)
- [ ] Колаборация
- [ ] Analytics
