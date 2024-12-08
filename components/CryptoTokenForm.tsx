"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, ArrowRight, Upload, Loader2, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Simulated AI response function (replace with actual AI SDK call in production)
const simulateAIResponse = async (prompt: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return `AI-generated response about ${prompt}: This is a simulated response about the token's ${prompt}. The AI would provide detailed information based on the context of the question.`
}

// Function to generate survey questions (replace with actual AI SDK call in production)
const generateSurveyQuestions = async (tokenInfo: any) => {
  const prompt = `Generate 5 survey questions about a crypto token with the following details:
    Name: ${tokenInfo.name}
    Description: ${tokenInfo.description}
    Address: ${tokenInfo.address}
    Liquidity Burn: ${tokenInfo.liquidityBurn}
    Tokenomics: ${tokenInfo.tokenomics}
    Additional Info: ${tokenInfo.additionalInfo}`

  try {
    const response = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: prompt,
      maxTokens: 500
    })
    return response.text.split('\n').filter(q => q.trim() !== '')
  } catch (error) {
    console.error('Error generating survey questions:', error)
    return ['Error generating questions. Please try again.']
  }
}

export const CryptoTokenForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [tokenInfo, setTokenInfo] = useState({
    name: '',
    image: null as string | null,
    description: '',
    address: '',
    liquidityBurn: '',
    tokenomics: '',
    additionalInfo: ''
  })
  const [question, setQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewQuestions, setPreviewQuestions] = useState<string[]>([])
  const [generatedSurvey, setGeneratedSurvey] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setTokenInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTokenInfo(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAskQuestion = async () => {
    if (!question.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const response = await simulateAIResponse(question)
      setAiResponse(response)
    } catch (err) {
      setError('Failed to get AI response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const generatePreviewQuestions = async () => {
    setIsLoading(true)
    try {
      const questions = await generateSurveyQuestions(tokenInfo)
      setPreviewQuestions(questions.slice(0, 2)) // Show only 2 preview questions
    } catch (err) {
      setError('Failed to generate preview questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const generateFullSurvey = async () => {
    setIsLoading(true)
    try {
      const questions = await generateSurveyQuestions(tokenInfo)
      setGeneratedSurvey(questions)
    } catch (err) {
      setError('Failed to generate full survey. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (currentPage < 4) {
      generatePreviewQuestions()
    }
  }, [currentPage])

  const pages = [
    // Page 1: Token Basics
    <Card key="basics" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Token Basics</CardTitle>
        <CardDescription>Enter the fundamental information about your crypto token.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="tokenName" className="block text-sm font-medium text-gray-700 mb-1">Token Name</label>
          <Input 
            id="tokenName" 
            value={tokenInfo.name} 
            onChange={(e) => handleInputChange('name', e.target.value)} 
            placeholder="Enter token name" 
          />
        </div>
        <div>
          <label htmlFor="tokenImage" className="block text-sm font-medium text-gray-700 mb-1">Token Image</label>
          <div className="flex items-center space-x-4">
            <Input id="tokenImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button onClick={() => document.getElementById('tokenImage')?.click()} variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            {tokenInfo.image && <img src={tokenInfo.image} alt="Token" className="h-16 w-16 object-cover rounded-full" />}
          </div>
        </div>
        <div>
          <label htmlFor="tokenDescription" className="block text-sm font-medium text-gray-700 mb-1">Token Description</label>
          <Textarea 
            id="tokenDescription" 
            value={tokenInfo.description} 
            onChange={(e) => handleInputChange('description', e.target.value)} 
            placeholder="Describe your token" 
          />
        </div>
      </CardContent>
    </Card>,

    // Page 2: Token Details
    <Card key="details" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Token Details</CardTitle>
        <CardDescription>Provide specific details about your token.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="tokenAddress" className="block text-sm font-medium text-gray-700 mb-1">Token Address</label>
          <Input 
            id="tokenAddress" 
            value={tokenInfo.address} 
            onChange={(e) => handleInputChange('address', e.target.value)} 
            placeholder="Enter token address" 
          />
        </div>
        <div>
          <label htmlFor="liquidityBurn" className="block text-sm font-medium text-gray-700 mb-1">Liquidity Burn</label>
          <Input 
            id="liquidityBurn" 
            value={tokenInfo.liquidityBurn} 
            onChange={(e) => handleInputChange('liquidityBurn', e.target.value)} 
            placeholder="Enter liquidity burn details" 
          />
        </div>
        <div>
          <label htmlFor="tokenomics" className="block text-sm font-medium text-gray-700 mb-1">Tokenomics</label>
          <Textarea 
            id="tokenomics" 
            value={tokenInfo.tokenomics} 
            onChange={(e) => handleInputChange('tokenomics', e.target.value)} 
            placeholder="Describe your token's economics" 
          />
        </div>
      </CardContent>
    </Card>,

    // Page 3: Additional Information
    <Card key="additional" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
        <CardDescription>Add any extra details about your token.</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          value={tokenInfo.additionalInfo} 
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)} 
          placeholder="Any additional information..." 
          className="min-h-[200px]" 
        />
      </CardContent>
    </Card>,

    // Page 4: AI Q&A
    <Card key="ai-qa" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Ask About Your Token</CardTitle>
        <CardDescription>Get AI-generated answers about your token or crypto in general.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
          <div className="flex space-x-2">
            <Input 
              id="question" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="Ask a question about your token..." 
            />
            <Button onClick={handleAskQuestion} disabled={isLoading || !question.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Ask
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {aiResponse && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
      </CardContent>
    </Card>,

    // Page 5: Generated Survey
    <Card key="survey" className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Generated Survey</CardTitle>
        <CardDescription>Here's your AI-generated survey based on the token information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : generatedSurvey.length > 0 ? (
          <div>
            {generatedSurvey.map((question, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="font-semibold">{`Question ${index + 1}:`}</p>
                <p>{question}</p>
              </div>
            ))}
          </div>
        ) : (
          <Button onClick={generateFullSurvey} className="w-full">
            Generate Survey
          </Button>
        )}
      </CardContent>
    </Card>
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 text-indigo-800"
      >
        Crypto Token Information Form
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      {currentPage < 4 && (
        <Card className="mt-8 w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Preview Questions</CardTitle>
            <CardDescription>Here's a preview of potential survey questions based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : previewQuestions.length > 0 ? (
              previewQuestions.map((question, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p>{question}</p>
                </div>
              ))
            ) : (
              <p>No preview questions available yet. Fill in more information to see previews.</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-8 max-w-3xl mx-auto">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
        >
          {currentPage === pages.length - 2 ? (
            <>
              Generate Survey <Eye className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

