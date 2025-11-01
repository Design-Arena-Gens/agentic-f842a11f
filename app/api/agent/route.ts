import { NextRequest, NextResponse } from 'next/server'
import { notionAgent } from '@/lib/agents/notion-agent'
import { calendarAgent } from '@/lib/agents/calendar-agent'
import { gmailAgent } from '@/lib/agents/gmail-agent'
import { aiRouter } from '@/lib/ai-router'

export async function POST(request: NextRequest) {
  try {
    const { command, history } = await request.json()

    if (!command) {
      return NextResponse.json({ error: 'Command is required' }, { status: 400 })
    }

    // Determine which agent to use based on command
    const intent = await aiRouter.routeCommand(command)

    let response = ''

    switch (intent.service) {
      case 'notion':
        response = await notionAgent.execute(command, intent.action, intent.params)
        break
      case 'calendar':
        response = await calendarAgent.execute(command, intent.action, intent.params)
        break
      case 'gmail':
        response = await gmailAgent.execute(command, intent.action, intent.params)
        break
      default:
        response = 'I can help you with Notion, Google Calendar, or Gmail. Please specify what you would like to do.'
    }

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Agent error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
