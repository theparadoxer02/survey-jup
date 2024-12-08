import { GlassCard } from "./glass-card"

type BalanceDisplayProps = {
  balance: number
  address: string
}

export function BalanceDisplay({ balance, address }: BalanceDisplayProps) {
  return (
    <GlassCard className="w-full">
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-2 text-green-300">Your Quantum Balance</h2>
        <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-green-400">
          {balance.toFixed(2)} SOL
        </p>
        <div className="mt-4 text-sm text-green-200">
          ≈ ${(balance * 20).toFixed(2)} USD
        </div>
        <div className="mt-2 text-sm text-green-300">
          Wallet: {address}
        </div>
      </div>
    </GlassCard>
  )
}

