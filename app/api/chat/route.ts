import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { context } from '../../../lib/knowledge-base';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: google('gemini-2.5-flash-lite'),
      system: context,
      messages,
      temperature: 0.7,
    });

    return new Response(result.text, {
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error) {
    console.error('Chat Error:', error);
    return new Response('Hans ran into a little trouble. Try again!', { status: 500 });
  }
}