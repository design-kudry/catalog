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
