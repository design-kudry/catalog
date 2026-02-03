// Types для промптов
export interface Prompt {
  id: string
  title: string
  description: string
  content: string
  goal: string
  role: 'marketer' | 'developer' | 'designer' | 'writer' | 'analyst'
  level: 'beginner' | 'intermediate' | 'advanced'
  format: 'text' | 'table' | 'code' | 'checklist'
  tool: 'ChatGPT' | 'Claude' | 'Gemini' | 'Midjourney' | 'Other'
  tags: string[]
  exampleResult: string
  createdAt: Date
  updatedAt: Date
  savedCount: number
  usedCount: number
  isSaved?: boolean
  category: string
  variables?: PromptVariable[]
}

export interface PromptVariable {
  id: string
  name: string
  label: string
  type: 'text' | 'select' | 'textarea'
  placeholder?: string
  options?: string[]
  defaultValue?: string
}

export interface SavedPrompt {
  id: string
  promptId: string
  title: string
  content: string
  variables?: Record<string, string>
  createdAt: Date
  updatedAt: Date
  folder?: string
  tags: string[]
  isDraft: boolean
}

export interface PromptFilter {
  search: string
  role?: string
  level?: string
  format?: string
  tool?: string
  tags?: string[]
  sort: 'relevant' | 'popular' | 'new'
}

// AI функциональность
export interface AIGeneratorRequest {
  goal: string
  role?: string
  tone?: 'formal' | 'casual' | 'technical' | 'creative'
  context?: string
  specificRequirements?: string
}

export interface PromptRating {
  id: string
  promptId: string
  userId: string
  rating: 1 | 2 | 3 | 4 | 5
  comment?: string
  createdAt: Date
}

export interface UserHistory {
  id: string
  promptId: string
  title: string
  usedAt: Date
  variables?: Record<string, string>
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: string
  fields: TemplateField[]
  createdAt: Date
}

export interface TemplateField {
  id: string
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'checkbox'
  required: boolean
  placeholder?: string
  options?: string[]
}

export interface UserLibrary {
  id: string
  userId: string
  name: string
  description?: string
  prompts: string[] // массив promptId
  isPublic: boolean
  createdAt: Date
  tags: string[]
}

export interface CustomPrompt extends SavedPrompt {
  aiGenerated?: boolean
  generatedFrom?: string // id оригинального промпта
  isTemplate?: boolean
}

// Версии и итерации промптов
export interface PromptVersion {
  id: string
  promptId: string
  version: number
  content: string
  changes: string // описание что изменилось
  createdAt: Date
  createdBy: string
  isPublished: boolean
}

export interface PromptExample {
  id: string
  promptId: string
  input: string // заполненный промпт
  output: string // результат от AI
  model: string // какой AI использовался
  timestamp: Date
  screenshotUrl?: string
}

export interface WorkspaceSession {
  id: string
  userId: string
  promptId: string
  currentContent: string
  versions: PromptVersion[]
  results: PromptExample[]
  notes: string
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface SemanticTag {
  id: string
  name: string
  description: string
  icon?: string
  color: string
  relatedPrompts: string[]
}

export interface PromptComparison {
  id: string
  promptAId: string
  promptBId: string
  createdAt: Date
  notes?: string
  userId: string
}
