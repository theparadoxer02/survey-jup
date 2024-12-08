import React from 'react'
import { GlassCard } from './glass-card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const ManageSurveys: React.FC = () => {
  const surveys = [
    { id: 1, title: 'Customer Satisfaction Survey', responses: 150, status: 'Active', reward: 50 },
    { id: 2, title: 'Product Feedback Survey', responses: 89, status: 'Active', reward: 75 },
    { id: 3, title: 'Employee Engagement Survey', responses: 75, status: 'Closed', reward: 100 },
  ]

  return (
    <GlassCard>
      <h3 className="text-2xl font-semibold mb-6 text-green-400">Manage Surveys</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-green-400">Survey Title</TableHead>
            <TableHead className="text-green-400">Responses</TableHead>
            <TableHead className="text-green-400">Status</TableHead>
            <TableHead className="text-green-400">Reward (SVC)</TableHead>
            <TableHead className="text-green-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.map((survey) => (
            <TableRow key={survey.id}>
              <TableCell className="text-white">{survey.title}</TableCell>
              <TableCell className="text-white">{survey.responses}</TableCell>
              <TableCell className="text-white">{survey.status}</TableCell>
              <TableCell className="text-white">{survey.reward}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2 border-green-500 text-green-400 hover:bg-green-900 hover:text-white">View</Button>
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-900 hover:text-white">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GlassCard>
  )
}

