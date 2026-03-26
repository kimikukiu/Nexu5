import OpenAI from 'openai';

// Simple exponential backoff helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function chatWithOpenRouter(messages: { role: string; content: string }[], apiKey: string, model: string, retries = 3, backoff = 1000) {
  if (!apiKey) {
    throw new Error('API Key is missing');
  }

  const openRouter = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'HTTP-Referer': window.location.origin,
      'X-OpenRouter-Title': 'WhoamiSec Pro',
    },
  });

  for (let i = 0; i < retries; i++) {
    try {
      const completion = await openRouter.chat.completions.create({
        model: model,
        messages: messages as any,
      });
      return completion.choices[0].message.content;
    } catch (error: any) {
      if (error?.status === 429 && i < retries - 1) {
        console.warn(`Rate limit hit, retrying in ${backoff}ms...`);
        await delay(backoff);
        backoff *= 2; // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}
