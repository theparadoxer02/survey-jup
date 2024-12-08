import React from 'react'
import { Button } from '@/components/ui/button'
import { GlassCard } from './glass-card'

export const Marketplace: React.FC = () => {
  const surveyTemplates = [
    { id: 1, title: 'Customer Satisfaction', price: 50, description: 'Measure customer satisfaction with your product or service.' },
    { id: 2, title: 'Employee Engagement', price: 75, description: 'Assess employee engagement and job satisfaction.' },
    { id: 3, title: 'Market Research', price: 100, description: 'Conduct market research for your new product or service.' },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-green-400">Survey Templates</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surveyTemplates.map((template) => (
          <GlassCard key={template.id}>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{template.title}</h4>
            <p className="text-sm text-green-300 mb-4">{template.description}</p>
            <p className="text-2xl font-bold text-white mb-4">{template.price} SVC</p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Purchase Template</Button>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

