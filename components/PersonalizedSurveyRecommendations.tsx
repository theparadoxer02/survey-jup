import React from 'react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'

export const PersonalizedSurveyRecommendations: React.FC = () => {
  const recommendations = [
    { id: 1, title: 'Customer Satisfaction Survey', reward: 50 },
    { id: 2, title: 'Product Feedback Survey', reward: 75 },
    { id: 3, title: 'Market Research Survey', reward: 100 },
  ]

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-4 text-green-400">Personalized Survey Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((survey) => (
          <div key={survey.id} className="flex items-center justify-between p-4 bg-blue-900 bg-opacity-30 rounded-lg">
            <div>
              <h4 className="text-lg font-medium text-green-300">{survey.title}</h4>
              <p className="text-sm text-green-400">Potential Reward: {survey.reward} SVC</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Take Survey</Button>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

