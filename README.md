# AI Personal Agent

An intelligent personal assistant that manages Notion, Google Calendar, and Gmail through natural language commands.

## Features

- 📝 **Notion Integration**: Create pages, manage databases, add tasks
- 📅 **Google Calendar**: Schedule events, view appointments, manage meetings
- 📧 **Gmail**: Send emails, read messages, manage inbox
- 🤖 **AI-Powered**: Natural language understanding for intuitive commands

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (copy `.env.example` to `.env`):
```bash
NOTION_API_KEY=your_notion_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GMAIL_USER=your_email@gmail.com
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Example Commands

- "Create a new page in Notion called Meeting Notes"
- "Show my calendar events for today"
- "Send an email to john@example.com about the project update"
- "Add a task to my Notion todo list"
- "Schedule a meeting tomorrow at 2pm"

## Deployment

Deploy to Vercel:
```bash
vercel deploy --prod
```

## Configuration

### Notion Setup
1. Create integration at https://www.notion.so/my-integrations
2. Get API key and add to environment variables
3. Share database with integration

### Google Calendar & Gmail Setup
1. Create project in Google Cloud Console
2. Enable Calendar and Gmail APIs
3. Create OAuth2 credentials
4. Add credentials to environment variables

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Notion API
- Google APIs (Calendar & Gmail)
- OpenAI (optional)
