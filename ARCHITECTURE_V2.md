# PromptHub v2 - Обновленная архитектура

## 🎯 Глобальные принципы (обновлены)

1. **Четкое разделение действий**:
   - **USE** = Заполнение переменных + AI-suggestions (помощь при использовании)
   - **EDIT** = Переделка исходного промпта (сохраняется как новая версия)
   - **CREATE** = Создание нового промпта с нуля
   - **GENERATE** = AI автоматически собирает промпт по параметрам

2. **AI в трех ролях**:
   - **Suggestions** (USE режим) - подсказки, альтернативы, коррекции
   - **Generation** (GENERATOR) - создание нового промпта по параметрам
   - **Search** (NEURAL SEARCH) - поиск по смыслу вместо ключевых слов

3. **Библиотека как рабочее пространство** - полностью функциональна для редактирования

---

## 📋 Обновленные сценарии

### 1. USE PROMPT (с AI-suggestions)

**Путь**: `/catalog/[id]/use`

**Функциональность**:
```
Левая колонна: Переменные
├── Input для каждой переменной {{name}}
├── Рядом с каждой - кнопка "AI suggest" (иконка ✨)
│   └── Открывает suggestions:
│       ├── "Усилить" → более мощная формулировка
│       ├── "Упростить" → более простая версия
│       ├── "Другой тон" → выбор тона (строже, креативнее, короче и т.п.)
│       ├── "Адаптировать" → под контекст задачи
│       └── "Альтернативы" → 3-5 вариантов

Правая колонна: Live Preview
├── Полный текст промпта с подставленными переменными
├── Highlighted AI-измененные фрагменты
├── Кнопки:
│   ├── Copy
│   ├── Save (→ Library)
│   └── Use (открыть в новой вкладке / скопировать в буфер)
```

**Логика AI-suggestions** (mock версия пока):
```typescript
interface Suggestion {
  type: 'strengthen' | 'simplify' | 'tone' | 'adapt' | 'alternatives'
  fragment: string // исходный текст
  variants: string[] // варианты замены
}

// Mock пример:
{
  fragment: "Напиши текст",
  suggestions: [
    { type: 'strengthen', variant: "Напиши привлекательный и убедительный текст" },
    { type: 'simplify', variant: "Написать текст" },
    { type: 'tone', tones: ['formal', 'creative', 'brief'] }
  ]
}
```

---

### 2. GENERATOR (переработка)

**Путь**: `/generator`

**Старый подход** (отмена):
- Фиксированные роли (5 вариантов)
- Фиксированные форматы
- Пользователь выбирал из готовых вариантов

**Новый подход**:

```
Левая колонна: Параметры конфигурации
├── Роль (dropdown, широкий список)
│   └── SEO, Copywriter, PM, UX Designer, Data Analyst, ...
├── Задача (textarea или dropdown)
│   └── "помочь написать продающий текст", "создать чеклист", и т.д.
├── Формат (dropdown)
│   └── Структурированный текст, Список, JSON, Таблица, CSV, и т.д.
├── Контекст (textarea, опционально)
│   └── "На русском для интернет-магазина", "Для B2B аудитории"
└── Ограничения (textarea, опционально)
    └── "Максимум 500 слов", "Без использования слова X"

Кнопка внизу: "Сгенерировать промпт" (отправляет на backend/mock AI)

Правая колонна: Результат
├── Сгенерированный промпт (full text)
├── Сверху: "📋 Сгенерирован по параметрам"
├── Рядом: кнопка "Переконфигурировать" (edit parameters)
├── Кнопки действий:
│   ├── Copy
│   ├── Edit (→ /catalog/[id]/edit-like)
│   ├── Save to Library
│   └── Use (→ /generated-prompts/[id]/use)
```

**Mock-генерация** (пока без реального API):
```typescript
function generatePrompt(params: GeneratorParams): string {
  return `
    Ты ${params.role}.
    Твоя задача: ${params.task}
    Формат ответа: ${params.format}
    ${params.context ? `Контекст: ${params.context}` : ''}
    ${params.constraints ? `Ограничения: ${params.constraints}` : ''}
    
    [Сгенерированный промпт на основе параметров]
  `
}
```

---

### 3. EDIT PROMPT (работающее редактирование)

**Путь**: `/catalog/[id]/edit` или `/library/[id]/edit`

**Проблема сейчас**: Может быть баг при сохранении или типах

**Сценарий**:
```
Левая/полная колонна: Форма редактирования
├── Title input
├── Description textarea
├── Tags (добавление/удаление)
├── Content textarea (основной текст)
│   └── Подсказка: "Используйте {{переменная}} для интерактивных полей"
├── Info box: "Исходный промпт: [title] → Сохранится как новая версия"
└── Кнопки:
    ├── Cancel
    └── Save Version (→ зависит от источника)

Логика сохранения:
- Если редактируем из каталога → Save as draft in Library
- Если редактируем из библиотеки → Update draft или Create version
- Если редактируем из генератора → Save to Library as draft
```

**Типизация** (проверить):
```typescript
interface PromptEdit {
  sourceId: string // откуда редактировали
  source: 'catalog' | 'library' | 'generated'
  originalTitle: string
  editedTitle: string
  editedContent: string
  editedTags: string[]
  isDraft: boolean
}
```

---

### 4. LIBRARY (с редактированием)

**Путь**: `/library`

**Функциональность**:
```
Разделы (tabs/sections):
├── Drafts (черновики)
│   └── Кнопки: Open, Edit, Delete, Share
├── Saved (сохраненные)
│   └── Кнопки: Open, Edit, Use, Delete
├── Favorites (избранные)
│   └── Кнопки: Open, Edit, Use, Unfavorite
├── Recent (недавно использованные)
│   └── Кнопки: Open, Use

Каждый промпт в библиотеке:
├── Может открываться в /library/[id] (view mode)
├── Может редактироваться в /library/[id]/edit
├── Может использоваться в /library/[id]/use
├── Может удаляться или архивироваться
```

---

### 5. NEURAL SEARCH (архитектурно)

**Расположение**: Top navigation + Home page (central search)

**Два режима поиска**:

```
SearchInput (топ навигация)
├── Mode switch (иконка 🔍 = keyword, ✨ = neural)
├── Placeholder меняется:
│   ├── Keyword: "Поиск по названию, тегам..."
│   └── Neural: "Опишите, что вам нужно..."

Поиск работает по:
├── Каталогу (все опубликованные промпты)
├── Библиотеке (личные промпты + сохраненные)
├── Генератору (как подсказки/шаблоны)
```

**Логика** (mock, без ML):
```typescript
interface SearchQuery {
  mode: 'keyword' | 'neural'
  text: string
  scope: 'catalog' | 'library' | 'all'
}

function parseNeuralQuery(text: string) {
  // "помощь с интервью" → intent: 'help', topic: 'interview'
  // "промпт для UX" → intent: 'role_based', role: 'UX'
  // "создать чеклист" → intent: 'create', format: 'checklist'
  
  return {
    intent: detectIntent(text),
    keywords: extractKeywords(text),
    context: inferContext(text)
  }
}

// Результаты: объединенный список из всех источников с рейтингом
```

---

## 🎨 VISUAL UPDATES (Карточки на главной)

**Текущее состояние**: Карточки содержат много информации, есть визуальный шум

**Новый подход** (минимализм):
```
Card Component (updated):
┌─────────────────────────────┐
│ Title (bold, larger)        │  ← главное внимание
│ Short desc (one line)       │  ← контекст
│                             │
│ 📌 Role · 🎯 Level · 🔧Tool │  ← meta, компактно
│                             │
│ [Use] [Save] [Details]      │  ← actions (меньше, чище)
└─────────────────────────────┘

Изменения:
- Убрать лишние метаданные со статистикой (saves, uses)
- Сделать компактнее метаинформацию
- Более спокойная палитра (не яркие цвета)
- Hover effect - легкий, не агрессивный
- Typography - чище, меньше шрифтов
```

---

## 🐛 BUG FIXES (Приоритет)

### Критические:
1. **Edit prompt crash** - проверить /catalog/[id]/edit
   - Проверить типизацию параметров
   - Проверить хендлер сохранения
   - Разделить логику (edit vs use)

2. **Library editing** - работающее редактирование
   - Открытие промпта из библиотеки в редакторе
   - Сохранение без потери данных
   - Версионирование (опционально)

---

## 📁 FILE STRUCTURE (обновлена)

```
src/
├── components/
│   ├── ui/ (существующие)
│   ├── Navigation.tsx
│   ├── PromptCard.tsx (update: упрощенная)
│   └── AIsuggestions.tsx (new)
│       └── Render suggestions для USE режима
│
├── app/
│   ├── page.tsx (home)
│   ├── generator/page.tsx (update: расширенная версия)
│   ├── catalog/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx (view mode)
│   │       ├── use/page.tsx (update: с AI suggestions)
│   │       └── edit/page.tsx (fix: баг редактирования)
│   ├── library/
│   │   ├── page.tsx (update: с редактированием)
│   │   └── [id]/
│   │       ├── page.tsx (view)
│   │       ├── use/page.tsx
│   │       └── edit/page.tsx
│   ├── create/page.tsx (существует)
│   └── api/ (future: для реального backend)
│
├── types/
│   ├── index.ts (update: добавить AIsuggestions, GeneratorParams)
│   └── search.ts (new: для neural search)
│
├── hooks/ (new)
│   ├── useAISuggestions.ts (mock)
│   ├── usePromptGeneration.ts (mock)
│   └── useNeuralSearch.ts (mock)
│
├── utils/
│   ├── search.ts (new: parseQuery, rankResults)
│   ├── suggestions.ts (new: AI suggestion logic)
│   └── validation.ts (new: validate edit/save)
│
└── data/
    └── mockData.ts (update: расширить роли, форматы)
```

---

## 🔄 СОСТОЯНИЕ РЕАЛИЗАЦИИ

| Компонент | Статус | Примечание |
|-----------|--------|-----------|
| Navigation | ✅ Done | Работает |
| Home page | ✅ Done | Визуал нуждается в обновлении |
| Catalog | ✅ Done | Работает |
| Generator v1 | ✅ Done | Нужна переделка (v2) |
| /catalog/[id]/use | ✅ Done | Нужны AI suggestions |
| /catalog/[id]/edit | ⚠️ Bug | Крэшится, нужен fix |
| /library | ⏳ Partial | Просмотр работает, редактирование нет |
| /library/[id]/edit | ❌ Missing | Нужна реализация |
| Neural Search | ❌ Architectural | Логика заложена в ARCHITECTURE.md |
| AI Suggestions | ❌ Missing | Нужна реализация (mock пока) |
| Card visual update | ⏳ Partial | Нужно упростить |

---

## 🚀 ПРИОРИТЕТ РЕАЛИЗАЦИИ

### Phase 1 (Критический):
1. Исправить баг редактирования → стабильность
2. Реализовать редактирование в библиотеке
3. Упростить карточки на главной

### Phase 2 (High):
1. Добавить AI suggestions в USE режим
2. Переделать Generator (v2)
3. Реализовать Neural Search (mock + архитектура)

### Phase 3 (Nice to have):
1. Версионирование промптов
2. Sharing и collaborations
3. Real ML-based neural search

---

## 📝 ЛОГИКА СОХРАНЕНИЯ (уточнено)

```
Edit Flow:
┌─────────────────────────────────────┐
│ Пользователь открывает промпт       │
├─────────────────────────────────────┤
│ Из каталога → USE или EDIT         │
│ ├─ USE: переменные + suggestions    │
│ └─ EDIT: редактирует текст         │
├─────────────────────────────────────┤
│ Из библиотеки → USE или EDIT       │
│ ├─ USE: переменные + suggestions    │
│ └─ EDIT: редактирует, сохраняет    │
├─────────────────────────────────────┤
│ Из генератора → preview → use/save │
│ ├─ SAVE: сохраняет как draft       │
│ ├─ EDIT: редактирует, сохраняет    │
│ └─ USE: использует                 │
└─────────────────────────────────────┘

На сохранение:
- Валидация всех полей
- Проверка дубликатов названий
- Сохранение в локальное состояние (или DB позже)
- Редирект на библиотеку или промпт
```

---

## 💡 ПРИМЕЧАНИЯ

**Дизайн вторичен** - сейчас фокус на:
- Стабильность логики
- Четкое разделение сценариев
- Правильная типизация
- Mock-версии AI функций (готовность к реальным API)

**AI Functions (mock версии)**:
- Suggestions → просто варианты текста в JSON
- Generation → шаблонизация по параметрам
- Search → простое сопоставление ключевых слов (готовность к embedding search)
