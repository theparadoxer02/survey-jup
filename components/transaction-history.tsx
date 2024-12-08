import { GlassCard } from "./glass-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import * as web3 from '@solana/web3.js'

type TransactionHistoryProps = {
  transactions: web3.ConfirmedSignatureInfo[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <GlassCard className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Quantum Transactions</h2>
      <ul className="space-y-4">
        {transactions.map((tx) => (
          <li key={tx.signature} className="flex items-center justify-between bg-blue-900 bg-opacity-30 p-4 rounded-2xl">
            <div className="flex items-center">
              <ArrowUpRight className="mr-2 text-green-400" />
              <span className="text-green-300">Transaction</span>
            </div>
            <div className="text-right">
              <div className="text-green-400">
                {tx.signature.slice(0, 8)}...
              </div>
              <div className="text-sm text-green-300 opacity-60">
                {new Date(tx.blockTime! * 1000).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

