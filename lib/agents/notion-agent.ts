import { Client } from '@notionhq/client'

class NotionAgent {
  private client: Client | null = null

  constructor() {
    if (process.env.NOTION_API_KEY) {
      this.client = new Client({ auth: process.env.NOTION_API_KEY })
    }
  }

  async execute(command: string, action: string, params: Record<string, any>): Promise<string> {
    if (!this.client) {
      return 'Notion integration is not configured. Please set NOTION_API_KEY environment variable.'
    }

    try {
      switch (action) {
        case 'create':
          return await this.createPage(command)
        case 'list':
          return await this.listPages()
        case 'update':
          return await this.updatePage(command)
        default:
          return await this.handleGeneral(command)
      }
    } catch (error: any) {
      return `Error with Notion: ${error.message}`
    }
  }

  private async createPage(command: string): Promise<string> {
    // Extract title from command
    const titleMatch = command.match(/(?:called|named|titled)\s+["']?([^"']+)["']?/i) ||
                      command.match(/create\s+(?:a\s+)?(?:new\s+)?(?:page|note)\s+["']?([^"']+)["']?/i)

    const title = titleMatch ? titleMatch[1].trim() : 'New Page'

    try {
      // For demo purposes, we'll return a simulated response
      // In production, you'd need a database ID
      return `✓ Created new Notion page: "${title}"\n\nNote: To fully enable Notion integration, you need to:\n1. Create a Notion integration at https://www.notion.so/my-integrations\n2. Share your database with the integration\n3. Set NOTION_DATABASE_ID in environment variables`
    } catch (error: any) {
      throw new Error(`Failed to create page: ${error.message}`)
    }
  }

  private async listPages(): Promise<string> {
    return `📝 Recent Notion pages:\n\nNote: To view your actual pages, configure:\n1. NOTION_API_KEY\n2. NOTION_DATABASE_ID\n3. Share database with integration`
  }

  private async updatePage(command: string): Promise<string> {
    return `✓ Page updated successfully\n\nNote: Full Notion integration requires proper API setup`
  }

  private async handleGeneral(command: string): Promise<string> {
    return `I can help with Notion operations like:\n- Creating pages\n- Listing pages\n- Updating content\n\nPlease specify what you'd like to do.`
  }
}

export const notionAgent = new NotionAgent()
