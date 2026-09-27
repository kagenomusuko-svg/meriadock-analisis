export interface LLMBackend {
  complete(systemPrompt: string, userMessage: string): Promise<string>
}
