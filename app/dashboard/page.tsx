'use client'

import React, { useState } from 'react'
import { LayoutDashboard, FileText, Coins, ShoppingBag, Settings, HelpCircle, Search, Bell, User, LogOut, BarChart, PlusCircle, List, Award, Wallet } from 'lucide-react'
import { NavItem } from '../../components/NavItem'
import { DashboardOverview } from '../../components/DashboardOverview'
import { CreateSurvey } from '../../components/CreateSurvey'
import { ManageSurveys } from '../../components/ManageSurveys'
import { RewardsStaking } from '../../components/RewardsStaking'
import { WalletTransactions } from '../../components/WalletTransactions'
import { UserSettings } from '../../components/UserSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { QuantumBackground } from '../../components/quantum-background'
import { GlassCard } from '../../components/glass-card'
import { WalletConnector } from '../../components/wallet-connector'

const QuantumSurveyChainDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-survey', label: 'Create Survey', icon: PlusCircle },
    { id: 'manage-surveys', label: 'Manage Surveys', icon: List },
    { id: 'rewards-staking', label: 'Rewards & Staking', icon: Award },
    { id: 'wallet', label: 'Wallet & Transactions', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardOverview />
      case 'create-survey':
        return <CreateSurvey />
      case 'manage-surveys':
        return <ManageSurveys />
      case 'rewards-staking':
        return <RewardsStaking />
      case 'wallet':
        return <WalletTransactions />
      case 'settings':
        return <UserSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative">
      <QuantumBackground />
      {/* Sidebar */}
      <aside className="w-64 bg-black bg-opacity-50 backdrop-blur-md border-r border-green-500">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-400">QuantumSurvey 📊💰</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center w-1/3">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300"
                startIcon={<Search className="h-4 w-4 text-green-400" />}
              />
            </div>
            <div className="flex items-center space-x-4">
              <WalletConnector />
              <Button variant="outline" size="icon" className="border-green-500 text-green-400">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4 text-green-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black bg-opacity-90 border-green-500 text-green-300" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-green-400">
                        john.doe@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-green-500" />
                  <DropdownMenuItem className="text-green-300 focus:bg-green-900 focus:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-green-300 focus:bg-green-900 focus:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-green-500" />
                  <DropdownMenuItem className="text-green-300 focus:bg-green-900 focus:text-white">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </GlassCard>

        {/* Page Content */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-6 text-green-300">{navItems.find(item => item.id === activePage)?.label}</h2>
          {renderActivePage()}
        </div>
      </main>
    </div>
  )
}

export default QuantumSurveyChainDashboard
