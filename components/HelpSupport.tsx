import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GlassCard } from './glass-card'

export const HelpSupport: React.FC = () => {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Cannot create survey', status: 'Open' },
    { id: 2, title: 'Token transfer failed', status: 'Closed' },
  ])

  const [newTicket, setNewTicket] = useState({ title: '', description: '' })

  const handleCreateTicket = () => {
    setTickets([...tickets, { id: tickets.length + 1, title: newTicket.title, status: 'Open' }])
    setNewTicket({ title: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <h3 className="text-xl font-semibold mb-4 text-green-400">Create Support Ticket</h3>
        <p className="text-sm text-green-300 mb-4">Describe your issue and we'll get back to you as soon as possible.</p>
        <form className="space-y-4">
          <div>
            <Input
              id="title"
              placeholder="Ticket Title"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300"
            />
            <Textarea
              id="description"
              placeholder="Describe your issue"
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300"
            />
          </div>
          <Button onClick={handleCreateTicket} className="bg-green-600 hover:bg-green-700 text-white">Submit Ticket</Button>
        </form>
      </GlassCard>

      <h3 className="text-2xl font-semibold text-green-400">Your Support Tickets</h3>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <GlassCard key={ticket.id}>
            <h4 className="text-xl font-semibold mb-2 text-green-400">{ticket.title}</h4>
            <p className="text-sm text-green-300 mb-4">Status: {ticket.status}</p>
            <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-900 hover:text-white">View Details</Button>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

