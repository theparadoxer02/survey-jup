"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Wallet } from 'lucide-react'

export function WalletConnector() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // Simulating wallet connection
    setIsConnected(true)
    setWalletAddress("QN" + Math.random().toString(36).substring(2, 15))
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-green-400 text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        <Button 
          onClick={disconnectWallet}
          variant="outline" 
          size="sm"
          className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={connectWallet}
      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}

