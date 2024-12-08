import React from 'react'
import { Button } from '@/components/ui/button'
import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface NavItemProps {
  icon: LucideIcon
  label: string
  active: boolean
  onClick: () => void
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={`w-full justify-start ${active ? 'bg-green-900 text-white' : 'text-green-400 hover:bg-green-900 hover:bg-opacity-30'}`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

