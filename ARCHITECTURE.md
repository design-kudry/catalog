# PromptHub - Архитектура и структура

## 1. Общая навигация

**Постоянное верхнее меню** (во всех страницах):
- Logo / Брендинг
- **Главная** (Home)
- **Каталог** (Catalog)
- **Генератор** (Generator) - ключевой инструмент
- **Моя библиотека** (Library)
- Кнопка **Создать** (Create) - primary action
- Поиск (Neural search - см. ниже)
- User menu

---

## 2. Нейропоиск (архитектура)

**Один центральный поисковый инпут** с поддержкой:

### Типы запросов:
- **По ключевым словам**: "SEO", "React", "маркетинг"
- **По цели**: "помощь с интервью", "генерация идей"
- **По контексту**: "промпт для UX-дизайнера", "шаблон письма"
- **По задаче**: "создать чеклист", "улучшить копирайтинг"

### Область поиска:
- Каталог промптов
- Моя библиотека
- Генератор (как подсказки/похожие templates)

### Архитектурно (пока без ML):
```
SearchInput
├── parseQuery(text) → intent + keywords + context
├── searchCatalog(intent, keywords)
├── searchLibrary(intent, keywords)
├── suggestGenerator(intent, context)
└── displayUnifiedResults()
```

---

## 3. Главная страница (Home)

**Роль**: Hub входных точек

**Содержимое**:
1. **Hero Search** - центральный поиск
2. **3 main action buttons**:
   - 📝 **Использовать готовый промпт** → Каталог
   - 🤖 **Сгенерировать промпт** → Генератор
   - ✏️ **Создать свой** → Create editor
3. **Популярные подборки** (категории)
4. **Последние использованные** (из библиотеки)
5. **Быстрые шаблоны** (quick access)

---

## 4. Каталог промптов (Catalog)

**Роль**: Витрина готовых промптов

**Функции**:
- Карточки промптов
- Фильтры (роль, уровень, формат, инструмент)
- Поиск
- Теги / категории

**Навигация**:
- Клик на карточку → Детальная страница промпта

---

## 5. Страница конкретного промпта (Prompt Detail)

**Когда**: Пользователь зашел в конкретный промпт из каталога

**Показываем**:
- 📋 Название, описание, теги
- 📝 Текст промпта
- 📤 Example output
- 👤 Информация (роль, уровень, инструмент)

**Кнопки / Actions**:
- **Использовать** → Go to "Use prompt" mode
- **Редактировать под себя** → Go to "Edit prompt" mode
- **Сохранить в библиотеку** → Inline (без переходов)
- **Скопировать текст** → Copy to clipboard

**Важно разделение**:
- **Использовать**: Заполнение переменных ({{name}}) → live preview → готов к применению
- **Редактировать**: Правка самого текста промпта → сохранение новой версии в библиотеке

---

## 6. Генератор промптов (Generator)

**Роль**: Полнофункциональный инструмент генерации

**Flow**:
1. **Ввод парметров**:
   - Выбор цели: "Маркетинг", "Разработка", "Дизайн" и т.д.
   - Выбор формата: "Текст", "Таблица", "Код", "Чеклист"
   - Выбор стиля: "Профессиональный", "Casual", "Техничный"
   - Контекст (textarea): описание задачи
   
2. **Генерация** (mock AI response):
   - Сгенерированный текст промпта
   - Live preview
   
3. **После генерации**:
   - ✏️ **Редактировать** → Перейти в редактор
   - 💾 **Сохранить** → В библиотеку (может быть черновик)
   - ⚡ **Использовать сразу** → Go to "Use prompt" (если есть переменные)
   - 🔄 **Регенерировать** → New parameters

**Архитектурно**:
- Отдельная страница `/generator`
- Может быть также modal из других мест
- Результат можно отправить прямо в редактор

---

## 7. Создание промпта (Create / Manual Editor)

**Роль**: Для продвинутых пользователей (ручное создание)

**Функции**:
- Название + описание
- Текст промпта (с поддержкой {{переменных}})
- Теги
- Метаданные (роль, уровень, формат, инструмент)
- Live preview
- История изменений (undo/redo)

**После создания**:
- 💾 **Сохранить как черновик**
- 📤 **Опубликовать** (в каталог - если есть права)

---

## 8. Использование промпта (Use Prompt)

**Когда**: Пользователь кликнул "Использовать" на промпте

**Логика**:
1. Если промпт имеет переменные ({{name}}):
   - Показываем форму с input fields
   - Live preview с подставленными значениями
2. Если нет переменных:
   - Сразу показываем готовый текст

**Действия**:
- 📋 **Скопировать** готовый текст
- 💾 **Сохранить версию** в библиотеку
- ↩️ **Назад** или **Создать новую версию**

---

## 9. Редактирование промпта (Edit Prompt)

**Когда**: 
- Пользователь кликнул "Редактировать под себя" на промпте
- Открыл свой сохраненный промпт из библиотеки

**Функции**:
- Правка текста
- Правка переменных ({{name}})
- Live preview
- История версий

**После редактирования**:
- 💾 **Сохранить как новую версию** → В библиотеку
- 📥 **Заменить текущую** (если свой промпт)

---

## 10. Моя библиотека (Library)

**Роль**: Персональное рабочее пространство

**Разделы**:
1. **Черновики** (Draft prompts)
   - Незаконченные промпты
   - Может редактировать и сохранять

2. **Сохраненные** (Saved versions)
   - Готовые версии своих промптов
   - История версий одного промпта
   - Может использовать, редактировать, удалять

3. **Избранные** (Favorites)
   - Сохраненные из каталога
   - Может использовать, но не редактировать

4. **Последние использованные** (Recent)
   - История использованных промптов
   - Quick access

**Функции**:
- Поиск по названию/тегам
- Теги/папки для организации
- Быстрое использование
- Версии (история)

---

## 11. Поток логики / User journeys

### Journey 1: "Я хочу быстрый готовый промпт"
```
Home → Catalog (search/filters) → Prompt Detail → Use → Fill variables → Copy
```

### Journey 2: "Я хочу сгенерировать промпт под мою задачу"
```
Home → Generator (fill params) → Generated prompt → Edit/Save → Library
```

### Journey 3: "Я хочу создать свой промпт с нуля"
```
Home → Create → Manual editor → Save as draft → Edit → Save to library
```

### Journey 4: "Я хочу найти свой старый промпт и использовать его"
```
Home (search with neural) → Library → My prompt → Use → Fill variables → Copy
```

### Journey 5: "Я хочу улучшить готовый промпт"
```
Catalog → Prompt Detail → Edit → Change text → Save as new version → Library
```

---

## 12. Структура приложения (файлы)

```
src/
├── app/
│   ├── page.tsx                 # Home (Hub)
│   ├── catalog/
│   │   ├── page.tsx             # Catalog list
│   │   └── [id]/
│   │       └── page.tsx         # Prompt detail
│   ├── generator/
│   │   └── page.tsx             # Generator full page
│   ├── create/
│   │   └── page.tsx             # Manual editor
│   ├── library/
│   │   └── page.tsx             # My library
│   ├── prompt/
│   │   └── [id]/use/
│   │       └── page.tsx         # Use prompt (fill variables)
│   ├── prompt/
│   │   └── [id]/edit/
│   │       └── page.tsx         # Edit prompt
│   ├── layout.tsx               # Root layout + Navigation
│   └── globals.css
├── components/
│   ├── ui/                      # UI components
│   ├── Navigation.tsx           # Top navigation (persistent)
│   ├── SearchBar.tsx            # Neural search (persistent)
│   ├── PromptCard.tsx
│   ├── PromptDetail.tsx
│   ├── PromptGenerator.tsx      # Generator form
│   ├── PromptEditor.tsx         # Manual editor
│   ├── PromptUse.tsx            # Use mode (variables)
│   ├── PromptEdit.tsx           # Edit mode
│   └── Library.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
└── lib/
    └── search.ts                # Search logic (mock neural)
```

---

## 13. Ключевые переходы

```
Home
├── Search → Results (catalog/library combined)
├── Catalog button → /catalog
├── Generator button → /generator
├── Create button → /create
└── Library button → /library

Catalog (/catalog)
└── Prompt card → /catalog/[id]

Prompt detail (/catalog/[id])
├── Use button → /prompt/[id]/use
├── Edit button → /prompt/[id]/edit
└── Save → Library (inline)

Generator (/generator)
├── Generate → Shows result
├── Edit → /create (with pre-filled content)
├── Save → /library
└── Use → /prompt/[id]/use

Create (/create)
└── Save → /library (as draft)

Library (/library)
├── Saved prompt → Can use or edit
├── Draft → Edit → Save
└── Favorite → Can use (read-only)

Use prompt (/prompt/[id]/use)
├── Fill variables → Live preview
└── Copy / Save

Edit prompt (/prompt/[id]/edit)
├── Change text
└── Save as new version
```

---

## 14. Architektura поиска (Neural Search)

**Пока mock, но готово для расширения**:

```typescript
interface SearchQuery {
  raw: string          // "промпт для интервью"
  intent: string       // "find" | "create" | "improve"
  keywords: string[]   // ["интервью", "промпт"]
  category?: string    // "recruiting", "design" и т.д.
  context?: string     // дополнительный контекст
}

// Результаты из разных источников
interface UnifiedSearchResults {
  catalogResults: Prompt[]
  libraryResults: SavedPrompt[]
  generatorSuggestions: GeneratorTemplate[]
}
```

Это архитектурно готово для интеграции реального ML-модели позже.

---

## Итоги

**Главное**:
1. ✅ Два разных сценария: **быстрый поиск из каталога** vs **генерация**
2. ✅ Четкое разделение: **использование** vs **редактирование**
3. ✅ Полнофункциональный Генератор как отдельный инструмент
4. ✅ Персональная Библиотека как рабочее пространство
5. ✅ Нейропоиск заложен архитектурно (пока mock)
6. ✅ Логичная навигация через постоянное меню

**Статус**: Готово для реализации в коде.
