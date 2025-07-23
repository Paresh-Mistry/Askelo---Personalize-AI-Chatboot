import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: process.env.OLLAMA_MODEL , 
                prompt,
                stream: false,
            }),
        });

        const data = await ollamaResponse.json();

        return NextResponse.json({ response: data.response });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
