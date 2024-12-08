import { Github } from 'lucide-react'

export function WalletFooter() {
  return (
    <footer className="mt-12 text-center text-sm text-green-300 bg-black bg-opacity-50 p-4 rounded-2xl backdrop-blur-md">
      <p>Quantum Nexus Wallet © 2023</p>
      <div className="mt-2 flex justify-center space-x-4">
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors flex items-center">
          <Github className="mr-1" size={16} /> GitHub
        </a>
      </div>
    </footer>
  )
}

