import { Sparkles } from 'lucide-react'
import { WalletConnector } from './wallet-connector'

export function WalletHeader() {
  return (
    <header className="flex items-center justify-between mb-8 bg-black bg-opacity-50 p-4 rounded-2xl backdrop-blur-md">
      <h1 className="text-3xl font-bold flex items-center">
        <Sparkles className="mr-2 text-green-400" /> Quantum Nexus Platform
      </h1>
      <WalletConnector />
    </header>
  )
}

