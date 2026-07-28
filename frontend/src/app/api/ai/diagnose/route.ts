import { NextResponse } from 'next/server';
import { runAIDiagnosis } from '@/lib/ai-engine';
import { checkRateLimit, sanitizeInput } from '@/lib/security';
import { logAuditEvent } from '@/lib/audit-logger';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Enforcement
    const rateLimit = checkRateLimit('ai-diagnose-client');
    if (!rateLimit.allowed) {
      logAuditEvent('SECURITY', 'RATE_LIMIT_EXCEEDED', 'Client exceeded rate limit on /api/ai/diagnose');
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Please wait ${rateLimit.resetInSeconds} seconds before requesting another diagnosis.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { prompt = '', hasImage = false, selectedDevice = '' } = body;

    // 2. Input Sanitization (XSS Protection)
    const sanitizedPrompt = sanitizeInput(prompt);
    const sanitizedDevice = sanitizeInput(selectedDevice);

    // Simulate AI processing latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = runAIDiagnosis(sanitizedPrompt, hasImage, sanitizedDevice);

    logAuditEvent('SYSTEM', 'AI_DIAGNOSIS_RUN', `Ran AI diagnosis for ${sanitizedDevice || 'Device'}`);

    return NextResponse.json({
      success: true,
      data: result,
      rateLimit: {
        remaining: rateLimit.remaining,
      },
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
