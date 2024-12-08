import React from 'react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const RewardsStaking: React.FC = () => {
  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-2xl font-semibold mb-6 text-green-400">Rewards & Staking</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-300">Your Rewards</h4>
            <p className="text-2xl font-bold text-white mb-4">1,250 SVC</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Claim Rewards</Button>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-300">Staked Tokens</h4>
            <p className="text-2xl font-bold text-white mb-4">5,000 SVC</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Manage Stake</Button>
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Stake More Tokens</h3>
        <form className="space-y-4">
          <div>
            <Label htmlFor="stake-amount" className="text-green-300">Amount to Stake (SVC)</Label>
            <Input id="stake-amount" type="number" placeholder="Enter amount" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Stake Tokens</Button>
        </form>
      </GlassCard>
    </div>
  )
}

