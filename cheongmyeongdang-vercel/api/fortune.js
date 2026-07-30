export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  const { systemPrompt, userPrompt } = req.body || {};
  if (!systemPrompt || !userPrompt) return res.status(400).json({ error: '요청 정보가 부족합니다.' });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: '서버 API 키가 설정되지 않았습니다.' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Anthropic error:', data);
      return res.status(response.status).json({ error: data?.error?.message || 'AI 서비스 요청에 실패했습니다.' });
    }
    const text = (data.content || []).map(block => block.text || '').join('');
    return res.status(200).json({ text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버에서 AI 리포트를 생성하지 못했습니다.' });
  }
}
