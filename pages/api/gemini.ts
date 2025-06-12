import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği destekleniyor.' });
  }

  const { mars, word } = req.body;
  if (!mars || !word) {
    return res.status(400).json({ error: 'Eksik parametre.' });
  }

  const prompt = `
        Kelime: ${word}
        Bağlam: ${mars}

        Aşağıdaki formatta yanıt ver:

        Türkçe Anlamı:
        Kelimenin sözlük anlamını açıkla.

        Ne Anlatmak İstemiş:
        Şiirde ya da marşta bu kelimeyle anlatılmak istenen şeyi 1-2 kısa ve açık cümleyle ifade et.
        `;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text() || 'Açıklama bulunamadı.';
    res.status(200).json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Gemini API hatası.' });
  }
}