const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateImages(apiKey, prompt) {
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/dall-e-3',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`OpenRouter: ${response.status} ${err.error?.message || ''}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || '';
  const urls = content.match(/https?:\/\/[^\s]+\.(png|jpg|jpeg|webp)/gi) || [];
  if (urls.length === 0) throw new Error('Не удалось извлечь изображения из ответа');

  const dataUrls = [];
  for (const url of urls) {
    const imgResponse = await fetch(url);
    const blob = await imgResponse.blob();
    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    dataUrls.push(dataUrl);
  }
  return dataUrls;
}