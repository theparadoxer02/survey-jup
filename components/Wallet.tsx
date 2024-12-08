import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlassCard } from './glass-card'
import { TokenPurchaseCard } from './TokenPurchaseCard'

export const Wallet: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard>
          <h3 className="text-xl font-semibold mb-2 text-green-400">Token Balance</h3>
          <p className="text-3xl font-bold text-white">5,231 SVC</p>
          <Button variant="outline" className="mt-4 border-green-500 text-green-400 hover:bg-green-900 hover:text-white">View Transaction History</Button>
        </GlassCard>
        <GlassCard>
          <h3 className="text-xl font-semibold mb-2 text-green-400">Quick Transfer</h3>
          <p className="text-sm text-green-300 mb-4">Send tokens to another user</p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="recipient" className="text-green-300">Recipient Address</Label>
              <Input id="recipient" placeholder="Enter recipient's address" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
            </div>
            <div>
              <Label htmlFor="amount" className="text-green-300">Amount</Label>
              <Input id="amount" placeholder="Enter amount to send" type="number" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Send Tokens</Button>
          </form>
        </GlassCard>
        <TokenPurchaseCard />
      </div>
    </div>
  )
}

