import { N8NRequest, N8NResponse } from '../types';

const N8N_WEBHOOK_URL = 'https://flow.myjobits.com/webhook-test/e222488b-da5c-4aa0-b65d-b07d960fb1a6';

export async function sendToN8N(payload: N8NRequest): Promise<N8NResponse> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}