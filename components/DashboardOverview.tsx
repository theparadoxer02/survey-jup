import React from 'react'
import { BarChart, Coins, FileText, Users } from 'lucide-react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'
import { PersonalizedSurveyRecommendations } from './PersonalizedSurveyRecommendations'

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <GlassCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-green-300">Total Balance</h3>
            <Coins className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">5,231 SVC</div>
          <p className="text-xs text-green-400">+20.1% from last month</p>
        </GlassCard>
        <GlassCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-green-300">Active Surveys</h3>
            <FileText className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">12</div>
          <p className="text-xs text-green-400">+2 new this week</p>
        </GlassCard>
        <GlassCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-green-300">Total Respondents</h3>
            <Users className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">1,205</div>
          <p className="text-xs text-green-400">+180 this month</p>
        </GlassCard>
        <GlassCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-green-300">Survey Completion Rate</h3>
            <BarChart className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">85%</div>
          <p className="text-xs text-green-400">+5% from last month</p>
        </GlassCard>
      </div>
      <PersonalizedSurveyRecommendations />
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Actions</h3>
        <div className="flex space-x-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Create New Survey</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Analytics</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Claim Rewards</Button>
        </div>
      </GlassCard>
    </div>
  )
}

