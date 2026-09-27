import { LLMBackend } from './types'

export class OllamaBackend implements LLMBackend {
  async complete(systemPrompt: string, userMessage: string): Promise<string> {
    let res: Response
    try {
      res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL ?? 'llama3.1:8b',
          prompt: systemPrompt + '\n\n' + userMessage,
          stream: false,
        }),
      })
    } catch {
      throw new Error('Ollama no disponible en localhost:11434')
    }
    const data = await res.json()
    return data.response as string
  }
}
