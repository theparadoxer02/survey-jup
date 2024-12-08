import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlassCard } from './glass-card'

export const TokenPurchaseCard: React.FC = () => {
  const [amount, setAmount] = useState<string>('')

  const handlePurchase = () => {
    console.log(`Purchasing ${amount} SVC tokens`)
    setAmount('')
  }

  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-2 text-green-400">Purchase SVC Tokens</h3>
      <p className="text-sm text-green-300 mb-4">Buy SurveyChain tokens to create surveys and access premium features</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount" className="text-green-300">Amount of SVC tokens</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-green-400">1 SVC = $0.1 USD</p>
          <Button onClick={handlePurchase} className="bg-green-600 hover:bg-green-700 text-white">Purchase Tokens</Button>
        </div>
      </div>
    </GlassCard>
  )
}

