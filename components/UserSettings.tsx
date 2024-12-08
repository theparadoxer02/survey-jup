import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlassCard } from './glass-card'
import { Switch } from '@/components/ui/switch'

export const UserSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-green-300">Name</Label>
            <Input id="name" defaultValue="John Doe" className="bg-blue-900 bg-opacity-30 border-green-500 text-white" />
          </div>
          <div>
            <Label htmlFor="email" className="text-green-300">Email</Label>
            <Input id="email" defaultValue="john.doe@example.com" className="bg-blue-900 bg-opacity-30 border-green-500 text-white" />
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Update Profile</Button>
        </div>
      </GlassCard>
      
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Security Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-password" className="text-green-300">Current Password</Label>
            <Input id="current-password" type="password" className="bg-blue-900 bg-opacity-30 border-green-500 text-white" />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-green-300">New Password</Label>
            <Input id="new-password" type="password" className="bg-blue-900 bg-opacity-30 border-green-500 text-white" />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="text-green-300">Confirm New Password</Label>
            <Input id="confirm-password" type="password" className="bg-blue-900 bg-opacity-30 border-green-500 text-white" />
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Change Password</Button>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-green-300">Email Notifications</Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="survey-reminders" className="text-green-300">Survey Reminders</Label>
            <Switch id="survey-reminders" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reward-alerts" className="text-green-300">Reward Alerts</Label>
            <Switch id="reward-alerts" />
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="data-sharing" className="text-green-300">Data Sharing</Label>
            <Switch id="data-sharing" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="anonymous-surveys" className="text-green-300">Anonymous Survey Participation</Label>
            <Switch id="anonymous-surveys" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Privacy Settings</Button>
        </div>
      </GlassCard>
    </div>
  )
}

