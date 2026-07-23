import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing in server environment.' }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert software developer. Generate clean, high-quality, production-ready code for the following request. Return ONLY the code snippet with essential inline comments, without conversational intro or outro text: "${prompt}"`
            }]
          }]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Failed to fetch from Gemini API.' }, { status: response.status });
    }

    const generatedCode = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No code generated.';

    return NextResponse.json({ code: generatedCode });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
