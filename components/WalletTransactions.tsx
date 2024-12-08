import React from 'react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const WalletTransactions: React.FC = () => {
  const transactions = [
    { id: 1, type: 'Reward', amount: 50, date: '2023-06-01' },
    { id: 2, type: 'Stake', amount: -1000, date: '2023-05-28' },
    { id: 3, type: 'Survey Completion', amount: 75, date: '2023-05-25' },
  ]

  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-2xl font-semibold mb-6 text-green-400">Wallet & Transactions</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-300">Your Balance</h4>
            <p className="text-2xl font-bold text-white mb-4">5,231 SVC</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white mr-2">Buy Tokens</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Withdraw</Button>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 text-green-300">Quick Transfer</h4>
            <form className="space-y-4">
              <div>
                <Label htmlFor="recipient" className="text-green-300">Recipient Address</Label>
                <Input id="recipient" placeholder="Enter recipient's address" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
              </div>
              <div>
                <Label htmlFor="amount" className="text-green-300">Amount (SVC)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Send Tokens</Button>
            </form>
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Transaction History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-green-400">Type</TableHead>
              <TableHead className="text-green-400">Amount (SVC)</TableHead>
              <TableHead className="text-green-400">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="text-white">{tx.type}</TableCell>
                <TableCell className={tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount}
                </TableCell>
                <TableCell className="text-white">{tx.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}

