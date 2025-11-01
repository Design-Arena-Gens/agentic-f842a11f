interface Intent {
  service: 'notion' | 'calendar' | 'gmail' | 'unknown'
  action: string
  params: Record<string, any>
}

class AIRouter {
  async routeCommand(command: string): Promise<Intent> {
    const lowerCommand = command.toLowerCase()

    // Notion keywords
    if (lowerCommand.includes('notion') ||
        lowerCommand.includes('page') ||
        lowerCommand.includes('database') ||
        lowerCommand.includes('note') ||
        lowerCommand.includes('task') && !lowerCommand.includes('calendar')) {
      return this.parseNotionIntent(command)
    }

    // Calendar keywords
    if (lowerCommand.includes('calendar') ||
        lowerCommand.includes('event') ||
        lowerCommand.includes('meeting') ||
        lowerCommand.includes('schedule') ||
        lowerCommand.includes('appointment')) {
      return this.parseCalendarIntent(command)
    }

    // Gmail keywords
    if (lowerCommand.includes('email') ||
        lowerCommand.includes('gmail') ||
        lowerCommand.includes('send') ||
        lowerCommand.includes('mail') ||
        lowerCommand.includes('message')) {
      return this.parseGmailIntent(command)
    }

    return { service: 'unknown', action: 'unknown', params: {} }
  }

  private parseNotionIntent(command: string): Intent {
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('new')) {
      return {
        service: 'notion',
        action: 'create',
        params: { command }
      }
    }

    if (lowerCommand.includes('list') || lowerCommand.includes('show') || lowerCommand.includes('get')) {
      return {
        service: 'notion',
        action: 'list',
        params: { command }
      }
    }

    if (lowerCommand.includes('update') || lowerCommand.includes('edit') || lowerCommand.includes('modify')) {
      return {
        service: 'notion',
        action: 'update',
        params: { command }
      }
    }

    return {
      service: 'notion',
      action: 'query',
      params: { command }
    }
  }

  private parseCalendarIntent(command: string): Intent {
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes('create') || lowerCommand.includes('add') || lowerCommand.includes('schedule')) {
      return {
        service: 'calendar',
        action: 'create',
        params: { command }
      }
    }

    if (lowerCommand.includes('list') || lowerCommand.includes('show') || lowerCommand.includes('get') || lowerCommand.includes('what')) {
      return {
        service: 'calendar',
        action: 'list',
        params: { command }
      }
    }

    return {
      service: 'calendar',
      action: 'query',
      params: { command }
    }
  }

  private parseGmailIntent(command: string): Intent {
    const lowerCommand = command.toLowerCase()

    if (lowerCommand.includes('send')) {
      return {
        service: 'gmail',
        action: 'send',
        params: { command }
      }
    }

    if (lowerCommand.includes('read') || lowerCommand.includes('show') || lowerCommand.includes('get') || lowerCommand.includes('list')) {
      return {
        service: 'gmail',
        action: 'list',
        params: { command }
      }
    }

    return {
      service: 'gmail',
      action: 'query',
      params: { command }
    }
  }
}

export const aiRouter = new AIRouter()
