export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatHistory {
  id?: string;
  messages: Message[];
  created_at?: string;
  updated_at?: string;
}

export interface LLMResponse {
  message: Message;
  sources?: Array<{
    title: string;
    url?: string;
    content?: string;
    relevance?: number;
  }>;
}

export interface LLMQuery {
  query: string;
  history?: Message[];
  max_tokens?: number;
  temperature?: number;
}

export function sendQuery(queryData: LLMQuery): Promise<LLMResponse>;
export function fetchChatHistory(): Promise<ChatHistory[]>;
export function saveChatHistory(history: Message[]): Promise<ChatHistory>;
export function deleteChatHistory(id: string): Promise<{ message: string }>;
export function getSuggestedPrompts(): Promise<string[]>;