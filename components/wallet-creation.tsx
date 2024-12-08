import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react'

type WalletCreationProps = {
  onCreateWallet: () => void
}

export function WalletCreation({ onCreateWallet }: WalletCreationProps) {
  return (
    <div className="mb-8 flex justify-center">
      <Button 
        onClick={onCreateWallet}
        className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl hover:from-blue-700 hover:to-green-700 text-lg py-6 px-8"
      >
        <PlusCircle className="mr-2" />
        Create Quantum Wallet
      </Button>
    </div>
  )
}

