"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, Copy } from 'lucide-react'
import * as web3 from '@solana/web3.js'
import { GlassCard } from "./glass-card"

type SendReceiveProps = {
  walletAddress: string
  connection: web3.Connection | null
  wallet: { publicKey: web3.PublicKey; secretKey: Uint8Array }
  onTransactionComplete: () => void
}

export function SendReceive({ walletAddress, connection, wallet, onTransactionComplete }: SendReceiveProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    // You might want to add a toast notification here
  }

  const handleSend = async () => {
    if (!connection || !wallet || !recipient || !amount) return

    try {
      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new web3.PublicKey(recipient),
          lamports: web3.LAMPORTS_PER_SOL * parseFloat(amount)
        })
      )

      const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [web3.Keypair.fromSecretKey(wallet.secretKey)]
      )

      console.log('Transaction sent:', signature)
      onTransactionComplete()
    } catch (error) {
      console.error('Error sending transaction:', error)
    }
  }

  const handleReceive = async () => {
    if (!connection || !wallet) return

    try {
      const airdropSignature = await connection.requestAirdrop(
        wallet.publicKey,
        web3.LAMPORTS_PER_SOL
      )

      await connection.confirmTransaction(airdropSignature)

      console.log('Airdrop received')
      onTransactionComplete()
    } catch (error) {
      console.error('Error requesting airdrop:', error)
    }
  }

  return (
    <GlassCard className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Quantum Transfer</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1 text-green-300">Recipient Quantum Address</label>
          <Input 
            id="address" 
            placeholder="Enter Solana address" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1 text-green-300">Quantum Amount (SOL)</label>
          <Input 
            id="amount" 
            type="number" 
            placeholder="0.00" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <Button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl hover:from-blue-700 hover:to-green-700"
            onClick={handleSend}
          >
            <ArrowUpRight className="mr-2" /> Quantum Send
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl hover:from-green-700 hover:to-teal-700"
            onClick={handleReceive}
          >
            <ArrowDownLeft className="mr-2" /> Request Airdrop
          </Button>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1 text-green-300">Your Quantum Address</label>
          <div className="flex items-center bg-blue-900 bg-opacity-30 border border-green-500 rounded-xl p-2">
            <input 
              type="text" 
              readOnly 
              value={walletAddress} 
              className="bg-transparent text-white flex-grow"
            />
            <Button 
              onClick={copyAddress} 
              variant="ghost" 
              size="sm" 
              className="text-green-300 hover:text-green-100"
            >
              <Copy size={16} />
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

