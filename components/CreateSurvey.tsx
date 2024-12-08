import React from 'react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const CreateSurvey: React.FC = () => {
  return (
    <GlassCard>
      <h3 className="text-2xl font-semibold mb-6 text-green-400">Create New Survey</h3>
      <form className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-green-300">Survey Title</Label>
          <Input id="title" placeholder="Enter survey title" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
        </div>
        <div>
          <Label htmlFor="description" className="text-green-300">Survey Description</Label>
          <Textarea id="description" placeholder="Enter survey description" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
        </div>
        <div>
          <Label htmlFor="target-audience" className="text-green-300">Target Audience</Label>
          <Input id="target-audience" placeholder="Define your target audience" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
        </div>
        <div>
          <Label htmlFor="reward" className="text-green-300">Survey Reward (SVC)</Label>
          <Input id="reward" type="number" placeholder="Enter reward amount" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
        </div>
        <div className="flex space-x-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">Create Survey</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Save as Draft</Button>
        </div>
      </form>
    </GlassCard>
  )
}

