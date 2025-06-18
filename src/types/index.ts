export interface Message {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
}

export interface User {
    id: string;
    username: string;
    avatarUrl?: string;
}

// Tipos para el chat y la conexión n8n

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
}

export interface N8NRequest {
  user_id: string;
  message: string;
}

export interface N8NResponse {
  bot_response?: string;
  response_text?: string;
}