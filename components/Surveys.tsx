"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { GlassCard } from './glass-card'

export const Surveys: React.FC = () => {
  const [surveys, setSurveys] = useState([
    { id: 1, title: 'Customer Satisfaction', responses: 150, status: 'Active' },
    { id: 2, title: 'Product Feedback', responses: 89, status: 'Active' },
    { id: 3, title: 'Employee Engagement', responses: 75, status: 'Closed' },
  ])

  const [newSurvey, setNewSurvey] = useState({ title: '', description: '' })

  const handleCreateSurvey = () => {
    setSurveys([...surveys, { id: surveys.length + 1, title: newSurvey.title, responses: 0, status: 'Active' }])
    setNewSurvey({ title: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Input type="text" placeholder="Search surveys..." className="w-1/3 bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Create New Survey</Button>
          </DialogTrigger>
          <DialogContent className="bg-black bg-opacity-90 border border-green-500 text-white">
            <DialogHeader>
              <DialogTitle className="text-green-400">Create New Survey</DialogTitle>
              <DialogDescription className="text-green-300">
                Create a new survey to gather insights from your audience.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right text-green-400">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newSurvey.title}
                  onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                  className="col-span-3 bg-blue-900 bg-opacity-30 border-green-500 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-green-400">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newSurvey.description}
                  onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                  className="col-span-3 bg-blue-900 bg-opacity-30 border-green-500 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateSurvey} className="bg-green-600 hover:bg-green-700 text-white">Create Survey</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <GlassCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-green-400">Survey Title</TableHead>
              <TableHead className="text-green-400">Responses</TableHead>
              <TableHead className="text-green-400">Status</TableHead>
              <TableHead className="text-green-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.id} className="border-b border-green-500">
                <TableCell className="text-white">{survey.title}</TableCell>
                <TableCell className="text-white">{survey.responses}</TableCell>
                <TableCell className="text-white">{survey.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="border-green-500 text-green-400 hover:bg-green-900 hover:text-white">View Results</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </GlassCard>
    </div>
  )
}

