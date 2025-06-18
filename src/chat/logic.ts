import { ChatMessage } from '../types';
import { sendToN8N } from '../n8n/connection';

const USER_ID_KEY = 'myjobits_chat_user_id';

export function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = 'guest_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export async function handleUserMessage(message: string): Promise<ChatMessage> {
  const user_id = getUserId();
  try {
    const data = await sendToN8N({ user_id, message });
    return {
      sender: 'bot',
      text: data.bot_response || data.response_text || 'Lo siento, no pude procesar tu solicitud.'
    };
  } catch (error) {
    return {
      sender: 'bot',
      text: 'Hubo un error al conectar con el asistente. Intenta de nuevo más tarde.'
    };
  }
}