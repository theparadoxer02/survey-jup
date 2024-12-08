import { GlassCard } from "./glass-card"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from 'lucide-react'
import * as web3 from '@solana/web3.js'

type Wallet = {
  publicKey: web3.PublicKey
  secretKey: Uint8Array
}

type WalletListProps = {
  wallets: Wallet[]
  selectedWallet: Wallet | null
  onSelectWallet: (wallet: Wallet) => void
}

export function WalletList({ wallets, selectedWallet, onSelectWallet }: WalletListProps) {
  if (wallets.length === 0) {
    return null
  }

  return (
    <GlassCard className="mb-8 w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Your Quantum Wallets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <button
            key={wallet.publicKey.toBase58()}
            onClick={() => onSelectWallet(wallet)}
            className={`flex items-center p-4 rounded-xl transition-colors ${
              selectedWallet?.publicKey.equals(wallet.publicKey)
                ? 'bg-green-900 bg-opacity-50'
                : 'bg-blue-900 bg-opacity-30 hover:bg-opacity-40'
            }`}
          >
            <Wallet className="mr-3 text-green-400" />
            <div className="text-left">
              <p className="font-medium text-green-300">{wallet.publicKey.toBase58().slice(0, 8)}...</p>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  )
}

