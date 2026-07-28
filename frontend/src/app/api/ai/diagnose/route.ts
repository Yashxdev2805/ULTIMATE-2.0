import { NextResponse } from 'next/server';
import { runAIDiagnosis } from '@/lib/ai-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt = '', hasImage = false, selectedDevice = '' } = body;

    // Simulate AI processing latency to provide smooth loading UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = runAIDiagnosis(prompt, hasImage, selectedDevice);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred during AI diagnosis.',
      },
      { status: 500 }
    );
  }
}
