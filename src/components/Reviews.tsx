'use client'

import { useState } from 'react'
import { Star, MessageCircle } from 'lucide-react'
import { PromptRating } from '@/types'

interface ReviewsProps {
  ratings?: PromptRating[]
  onAddReview?: (rating: number, comment: string) => void
}

export default function Reviews({ ratings = [], onAddReview }: ReviewsProps) {
  const [showForm, setShowForm] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [comment, setComment] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const avgRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0

  const handleSubmit = () => {
    if (userRating > 0) {
      onAddReview?.(userRating, comment)
      setUserRating(0)
      setComment('')
      setShowForm(false)
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Сводка оценок */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{avgRating}</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{ratings.length} оценок</div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition"
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Оценить
        </button>
      </div>

      {/* Форма оценки */}
      {showForm && (
        <div className="border-t pt-4 space-y-3">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setUserRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoverRating || userRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Поделитесь опытом использования этого промпта..."
            className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />

          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              onClick={handleSubmit}
              disabled={userRating === 0}
              className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
            >
              Отправить оценку
            </button>
          </div>
        </div>
      )}

      {/* Список отзывов */}
      <div className="space-y-3 mt-4">
        {ratings.slice(0, 3).map(rating => (
          <div key={rating.id} className="border-t pt-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < rating.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">{new Date(rating.createdAt).toLocaleDateString()}</span>
            </div>
            {rating.comment && <p className="text-sm text-gray-700 mt-2">{rating.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
