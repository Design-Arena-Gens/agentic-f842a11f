import { NextResponse } from 'next/server'

export async function GET() {
  const notion = !!process.env.NOTION_API_KEY
  const calendar = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  const gmail = !!process.env.GMAIL_USER

  return NextResponse.json({
    notion,
    calendar,
    gmail
  })
}
