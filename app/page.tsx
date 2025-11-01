'use client'

import { useState } from 'react'

export default function Home() {
  const [command, setCommand] = useState('')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [loading, setLoading] = useState(false)
  const [notionConnected, setNotionConnected] = useState(false)
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [gmailConnected, setGmailConnected] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const userMessage = { role: 'user', content: command }
    setMessages(prev => [...prev, userMessage])
    setCommand('')
    setLoading(true)

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, history: messages })
      })

      const data = await response.json()

      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error communicating with agent' }])
    } finally {
      setLoading(false)
    }
  }

  const checkConnections = async () => {
    try {
      const response = await fetch('/api/check-connections')
      const data = await response.json()
      setNotionConnected(data.notion)
      setCalendarConnected(data.calendar)
      setGmailConnected(data.gmail)
    } catch (error) {
      console.error('Error checking connections:', error)
    }
  }

  // Remove connection check during SSR - only works client-side
  // useEffect would be used in production with proper client-side handling

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Personal Agent</h1>
          <p className="text-gray-600 mb-6">Manage Notion, Google Calendar, and Gmail with natural language</p>

          <div className="flex gap-4 mb-6">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${notionConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              📝 Notion {notionConnected ? '✓' : '✗'}
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${calendarConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              📅 Calendar {calendarConnected ? '✓' : '✗'}
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${gmailConnected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              📧 Gmail {gmailConnected ? '✓' : '✗'}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <p className="mb-4">Try commands like:</p>
                <ul className="text-sm space-y-2">
                  <li>"Create a new page in Notion called Meeting Notes"</li>
                  <li>"Show my calendar events for today"</li>
                  <li>"Send an email to john@example.com about the project update"</li>
                  <li>"Add a task to my Notion todo list"</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-3/4 px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="What would you like me to do?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !command.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Setup Required:</strong> Configure your API keys in environment variables:
              <code className="block mt-2 text-xs bg-yellow-100 p-2 rounded">
                NOTION_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_USER, OPENAI_API_KEY
              </code>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
