"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ArrowLeft, ArrowRight, Upload, Loader2, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "./glass-card"
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
    <GlassCard key="basics" className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Token Basics</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenName" className="block text-sm font-medium text-green-300 mb-1">Token Name</label>
          <Input 
            id="tokenName" 
            value={tokenInfo.name} 
            onChange={(e) => handleInputChange('name', e.target.value)} 
            placeholder="Enter token name" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="tokenImage" className="block text-sm font-medium text-green-300 mb-1">Token Image</label>
          <div className="flex items-center space-x-4">
            <Input id="tokenImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button onClick={() => document.getElementById('tokenImage')?.click()} variant="outline" className="border-green-500 text-green-300 hover:bg-green-900 hover:bg-opacity-30">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            {tokenInfo.image && <img src={tokenInfo.image} alt="Token" className="h-16 w-16 object-cover rounded-full" />}
          </div>
        </div>
        <div>
          <label htmlFor="tokenDescription" className="block text-sm font-medium text-green-300 mb-1">Token Description</label>
          <Textarea 
            id="tokenDescription" 
            value={tokenInfo.description} 
            onChange={(e) => handleInputChange('description', e.target.value)} 
            placeholder="Describe your token" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
          />
        </div>
      </div>
    </GlassCard>,

    // Page 2: Token Details
    <GlassCard key="details" className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Token Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenAddress" className="block text-sm font-medium text-green-300 mb-1">Token Address</label>
          <Input 
            id="tokenAddress" 
            value={tokenInfo.address} 
            onChange={(e) => handleInputChange('address', e.target.value)} 
            placeholder="Enter token address" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="liquidityBurn" className="block text-sm font-medium text-green-300 mb-1">Liquidity Burn</label>
          <Input 
            id="liquidityBurn" 
            value={tokenInfo.liquidityBurn} 
            onChange={(e) => handleInputChange('liquidityBurn', e.target.value)} 
            placeholder="Enter liquidity burn details" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="tokenomics" className="block text-sm font-medium text-green-300 mb-1">Tokenomics</label>
          <Textarea 
            id="tokenomics" 
            value={tokenInfo.tokenomics} 
            onChange={(e) => handleInputChange('tokenomics', e.target.value)} 
            placeholder="Describe your token's economics" 
            className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
          />
        </div>
      </div>
    </GlassCard>,

    // Page 3: Additional Information
    <GlassCard key="additional" className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Additional Information</h2>
      <Textarea 
        value={tokenInfo.additionalInfo} 
        onChange={(e) => handleInputChange('additionalInfo', e.target.value)} 
        placeholder="Any additional information..." 
        className="min-h-[200px] bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl" 
      />
    </GlassCard>,

    // Page 4: AI Q&A
    <GlassCard key="ai-qa" className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Ask About Your Token</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-green-300 mb-1">Your Question</label>
          <div className="flex space-x-2">
            <Input 
              id="question" 
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="Ask a question about your token..." 
              className="bg-blue-900 bg-opacity-30 border-green-500 text-white placeholder-green-300 rounded-xl"
            />
            <Button onClick={handleAskQuestion} disabled={isLoading || !question.trim()} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Ask
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {aiResponse && (
          <div className="bg-blue-900 bg-opacity-30 p-4 rounded-lg border border-green-500">
            <h3 className="font-semibold mb-2 text-green-300">AI Response:</h3>
            <p className="text-green-100">{aiResponse}</p>
          </div>
        )}
      </div>
    </GlassCard>,

    // Page 5: Generated Survey
    <GlassCard key="survey" className="w-full">
      <h2 className="text-2xl font-bold text-green-300 mb-4">Generated Survey</h2>
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : generatedSurvey.length > 0 ? (
          <div>
            {generatedSurvey.map((question, index) => (
              <div key={index} className="mb-4 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-green-500">
                <p className="font-semibold text-green-300">{`Question ${index + 1}:`}</p>
                <p className="text-green-100">{question}</p>
              </div>
            ))}
          </div>
        ) : (
          <Button onClick={generateFullSurvey} className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl">
            Generate Survey
          </Button>
        )}
      </div>
    </GlassCard>
  ]

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8 text-green-300"
      >
        Quantum Token Creation
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
        <GlassCard className="w-full">
          <h2 className="text-2xl font-bold text-green-300 mb-4">Preview Questions</h2>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              </div>
            ) : previewQuestions.length > 0 ? (
              previewQuestions.map((question, index) => (
                <div key={index} className="mb-4 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-green-500">
                  <p className="text-green-100">{question}</p>
                </div>
              ))
            ) : (
              <p className="text-green-100">No preview questions available yet. Fill in more information to see previews.</p>
            )}
          </div>
        </GlassCard>
      )}

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          variant="outline"
          className="border-green-500 text-green-300 hover:bg-green-900 hover:bg-opacity-30 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pages.length - 1}
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl"
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

