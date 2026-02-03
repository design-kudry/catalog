import { Prompt } from '@/types'

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'SEO Copywriting для лендинга',
    description: 'Создание оптимизированного текста для посадочной страницы с ключевыми словами',
    content: `Ты — опытный SEO-копирайтер.

Задача: написать заголовок и описание для лендинга.

Входные параметры:
- Товар/услуга: {{product}}
- Целевая аудитория: {{audience}}
- Ключевые слова: {{keywords}}

Требования:
1. Заголовок 60-70 символов, с ключевым словом в начале
2. Метаописание 155-160 символов
3. Используй power words: сейчас, бесплатно, гарантия
4. Фокус на результате для читателя

Выведи:
- H1 заголовок
- Meta description
- 3 варианта call-to-action`,
    goal: 'Создать SEO-оптимизированный текст',
    role: 'marketer',
    level: 'intermediate',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['SEO', 'копирайтинг', 'лендинг', 'маркетинг'],
    exampleResult: 'H1: Лучшее ПО для управления проектами | CRM система\nMeta: Управляй проектами эффективно. Бесплатный试период 14 дней. Интеграция с популярными инструментами.',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    savedCount: 1242,
    usedCount: 5634,
    category: 'Маркетинг',
    variables: [
      { id: 'v1', name: 'product', label: 'Товар/услуга', type: 'text', placeholder: 'Например: программное обеспечение' },
      { id: 'v2', name: 'audience', label: 'Целевая аудитория', type: 'text', placeholder: 'Например: стартапы, малый бизнес' },
      { id: 'v3', name: 'keywords', label: 'Ключевые слова', type: 'textarea', placeholder: 'Через запятую' },
    ]
  },
  {
    id: '2',
    title: 'Prompt Engineering для кода',
    description: 'Улучшение качества кода через правильные инструкции для AI',
    content: `Ты — senior разработчик, эксперт в prompt engineering.

Контекст: {{context}}
Язык программирования: {{language}}
Требования: {{requirements}}

Напиши чистый, оптимизированный код с:
1. Понятными именами переменных
2. Документацией
3. Обработкой ошибок
4. Примерами использования`,
    goal: 'Сгенерировать качественный код',
    role: 'developer',
    level: 'advanced',
    format: 'code',
    tool: 'ChatGPT',
    tags: ['программирование', 'код', 'React', 'JavaScript'],
    exampleResult: '```typescript\ninterface UserData {\n  id: string\n  name: string\n}\n\nconst fetchUser = async (id: string): Promise<UserData> => {\n  // implementation\n}\n```',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    savedCount: 892,
    usedCount: 3421,
    category: 'Разработка',
    variables: [
      { id: 'v1', name: 'context', label: 'Контекст', type: 'textarea' },
      { id: 'v2', name: 'language', label: 'Язык программирования', type: 'select', options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'] },
      { id: 'v3', name: 'requirements', label: 'Требования', type: 'textarea' },
    ]
  },
  {
    id: '3',
    title: 'Анализ конкурентов для маркетолога',
    description: 'Структурированный анализ конкурентов по ключевым параметрам',
    content: `Проанализируй конкурентов по следующей матрице:

Конкуренты: {{competitors}}
Категория товара: {{category}}
Параметры анализа: {{parameters}}

Создай таблицу с колонками:
- Название компании
- USP (уникальное преимущество)
- Цены
- Каналы маркетинга
- Целевая аудитория
- Сильные стороны
- Слабые стороны`,
    goal: 'Провести анализ конкурентов',
    role: 'marketer',
    level: 'beginner',
    format: 'table',
    tool: 'Claude',
    tags: ['анализ', 'конкуренты', 'маркетинг', 'исследование'],
    exampleResult: '| Компания | USP | Цена | Каналы | Аудитория | Сильные стороны | Слабые стороны |\n|---|---|---|---|---|---|---|\n| Компания A | Лучшая цена | $10 | Social, Email | SMB | ... | ... |',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    savedCount: 654,
    usedCount: 2180,
    category: 'Маркетинг',
    variables: [
      { id: 'v1', name: 'competitors', label: 'Конкуренты (через запятую)', type: 'textarea' },
      { id: 'v2', name: 'category', label: 'Категория товара', type: 'text' },
      { id: 'v3', name: 'parameters', label: 'Параметры анализа', type: 'textarea' },
    ]
  },
  {
    id: '4',
    title: 'AI Генератор идей для дизайна',
    description: 'Быстрая генерация концепций дизайна на основе бриф',
    content: `Ты — креативный директор и UI/UX дизайнер.

Проект: {{project}}
Стиль: {{style}}
Ограничения: {{constraints}}

Предложи 5 концепций дизайна:
1. Название концепции
2. Основной визуальный элемент
3. Цветовая палитра (3-4 цвета)
4. Типография
5. Эмоция, которую передает`,
    goal: 'Получить дизайн-концепции',
    role: 'designer',
    level: 'intermediate',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['дизайн', 'идеи', 'UI/UX', 'творчество'],
    exampleResult: '1. Концепция "Минимализм"\n- Цвета: #FFFFFF, #000000, #F0F0F0\n- Типография: Montserrat Bold, Open Sans Regular\n- Эмоция: Чистота, профессионализм',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    savedCount: 523,
    usedCount: 1845,
    category: 'Дизайн',
    variables: [
      { id: 'v1', name: 'project', label: 'Описание проекта', type: 'textarea' },
      { id: 'v2', name: 'style', label: 'Стиль', type: 'select', options: ['Минимализм', 'Максимализм', 'Футуризм', 'Ретро', 'Органик'] },
      { id: 'v3', name: 'constraints', label: 'Ограничения', type: 'textarea' },
    ]
  },
  {
    id: '5',
    title: 'Чеклист для контент-плана',
    description: 'Готовый чеклист для планирования контента на месяц',
    content: `# Контент-план на {{month}}

## Подготовка
- [ ] Определить 3 главные темы месяца
- [ ] Составить ключевые слова
- [ ] Выбрать форматы контента

## Создание
- [ ] 4 основных статьи (2000+ слов)
- [ ] 8 социальных постов
- [ ] 2 видео-скрипта
- [ ] 1 инфографика

## Публикация
- [ ] Запланировать даты
- [ ] Подготовить графику
- [ ] Написать CTA
- [ ] Проверить ссылки

## Анализ
- [ ] Отследить метрики
- [ ] Проанализировать engagement
- [ ] Составить отчет`,
    goal: 'Спланировать контент',
    role: 'marketer',
    level: 'beginner',
    format: 'checklist',
    tool: 'ChatGPT',
    tags: ['контент', 'план', 'чеклист', 'маркетинг'],
    exampleResult: '✓ Подготовка\n  ✓ Определить 3 главные темы месяца\n  ✓ Составить ключевые слова',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    savedCount: 1156,
    usedCount: 4203,
    category: 'Контент',
    variables: [
      { id: 'v1', name: 'month', label: 'Месяц', type: 'text', defaultValue: 'февраль 2026' },
    ]
  },

  {
    id: '7',
    title: 'Анализ психологических триггеров в текстах',
    description: 'Определение психологических триггеров и техник убеждения в тексте',
    content: `Ты — психолог и специалист по нейромаркетингу.

Проанализируй следующий текст:

{{text}}

Определи:
1. **Психологические триггеры**: какие эмоции и потребности затрагиваются
2. **Техники убеждения**: какие методы используются (авторитет, дефицит, социальное доказательство и т.д.)
3. **Целевая аудитория**: кто этот текст задевает больше всего
4. **Эффективность**: оцени по шкале 1-10 и дай рекомендации

Используй теорию Роберта Чалдини о принципах убеждения.`,
    goal: 'Анализировать психологические аспекты текста',
    role: 'analyst',
    level: 'advanced',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['психология', 'маркетинг', 'убеждение', 'НЛП'],
    exampleResult: 'Триггеры: дефицит, социальное доказательство, авторитет. Эффективность: 8/10. Рекомендация: усилить эмоциональный посыл.',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    savedCount: 856,
    usedCount: 3421,
    category: 'Психология',
    variables: [
      { id: 'v1', name: 'text', label: 'Текст для анализа', type: 'textarea', placeholder: 'Вставь текст для анализа...' },
    ]
  },

  {
    id: '8',
    title: 'Техники убеждения NLP',
    description: 'Применение техник нейролингвистического программирования в коммуникации',
    content: `Ты — эксперт NLP и профессиональный тренер по коммуникации.

Моя цель: {{goal}}
Целевая аудитория: {{audience}}
Контекст: {{context}}

Создай текст, используя техники NLP:
1. **Якоря** - связь определённого состояния с триггером
2. **Модели репрезентации** - визуальные, аудиальные, кинестетические элементы
3. **Встроенные команды** - скрытые инструкции в тексте
4. **Фрейминг** - переосмысление ситуации

Результат: убедительный текст с высокой конверсией.`,
    goal: 'Написать убедительный текст с техниками NLP',
    role: 'marketer',
    level: 'advanced',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['NLP', 'психология', 'убеждение', 'коммуникация'],
    exampleResult: 'Текст с якорями, встроенными командами и многоуровневыми фреймингами...',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
    savedCount: 654,
    usedCount: 2890,
    category: 'Психология',
    variables: [
      { id: 'v1', name: 'goal', label: 'Твоя цель', type: 'text', placeholder: 'Например: убедить купить курс' },
      { id: 'v2', name: 'audience', label: 'Целевая аудитория', type: 'text', placeholder: 'Например: предприниматели 25-45 лет' },
      { id: 'v3', name: 'context', label: 'Контекст', type: 'textarea', placeholder: 'Опиши ситуацию...' },
    ]
  },

  {
    id: '9',
    title: 'Контент-план для социальных сетей',
    description: 'Планирование контента для Инстаграма, ТикТока, YouTube на месяц',
    content: `Ты — профессиональный контент-маркетер и SMM-специалист.

Моя ниша: {{niche}}
Целевая аудитория: {{audience}}
Платформа: {{platform}}
Цель: {{goal}}

Создай контент-план на месяц:
1. **Тематики**: разделение по дням (понедельник - советы, вторник - за кулисами и т.д.)
2. **Форматы**: посты, истории, видео, карусели
3. **Копи**: готовые заголовки и описания
4. **Хэштеги**: релевантные и трендовые
5. **CTA**: call-to-action для каждого поста

Выведи в виде таблицы с датами, темами и готовыми текстами.`,
    goal: 'Спланировать контент на месяц',
    role: 'marketer',
    level: 'intermediate',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['контент', 'социальные сети', 'маркетинг', 'SMM'],
    exampleResult: 'Таблица с 30 постами: темы, форматы, копи, хэштеги и CTA...',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
    savedCount: 1523,
    usedCount: 4567,
    category: 'Контент',
    variables: [
      { id: 'v1', name: 'niche', label: 'Твоя ниша', type: 'text', placeholder: 'Например: фитнес, саморазвитие' },
      { id: 'v2', name: 'audience', label: 'Целевая аудитория', type: 'text', placeholder: 'Например: женщины 25-40 лет' },
      { id: 'v3', name: 'platform', label: 'Платформа', type: 'text', placeholder: 'Например: Instagram' },
      { id: 'v4', name: 'goal', label: 'Цель', type: 'text', placeholder: 'Например: увеличить продажи' },
    ]
  },

  {
    id: '10',
    title: 'Исследование рынка и конкурентов',
    description: 'Глубокий анализ рынка, конкурентов и возможностей для бизнеса',
    content: `Ты — бизнес-аналитик и эксперт рынка.

Мой продукт: {{product}}
Целевой рынок: {{market}}
География: {{geography}}

Проведи анализ:
1. **Размер и рост рынка**: данные о ёмкости рынка
2. **Основные игроки**: топ 5 конкурентов, их позиции, сильные/слабые стороны
3. **SWOT анализ**: для моего продукта
4. **Возможности и угрозы**: тренды, регуляция, технологии
5. **Рекомендации**: как занять свою нишу

Ответ должен быть конкретным и базироваться на реальных данных.`,
    goal: 'Провести анализ рынка и конкурентов',
    role: 'analyst',
    level: 'advanced',
    format: 'text',
    tool: 'ChatGPT',
    tags: ['анализ', 'бизнес', 'конкуренты', 'рынок'],
    exampleResult: 'Подробный отчёт с размером рынка, анализом конкурентов и SWOT матрицей...',
    createdAt: new Date('2024-02-04'),
    updatedAt: new Date('2024-02-04'),
    savedCount: 723,
    usedCount: 2134,
    category: 'Бизнес',
    variables: [
      { id: 'v1', name: 'product', label: 'Твой продукт/услуга', type: 'text', placeholder: 'Например: SaaS для управления проектами' },
      { id: 'v2', name: 'market', label: 'Целевой рынок', type: 'text', placeholder: 'Например: IT компании' },
      { id: 'v3', name: 'geography', label: 'География', type: 'text', placeholder: 'Например: Россия, СНГ' },
    ]
  },
]

export const mockSavedPrompts: SavedPrompt[] = [
  {
    id: 'saved-1',
    promptId: '1',
    title: 'SEO текст для моего стартапа',
    content: 'Мой текст...',
    variables: {
      product: 'Платформа для фриланса',
      audience: 'Фрилансеры и малый бизнес',
      keywords: 'фриланс, удаленная работа, биржа'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    tags: ['работа', 'личное'],
    isDraft: false,
  },
  {
    id: 'saved-2',
    promptId: '3',
    title: 'Анализ конкурентов (черновик)',
    content: '',
    variables: {},
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09'),
    tags: ['черновик'],
    isDraft: true,
  },
]
