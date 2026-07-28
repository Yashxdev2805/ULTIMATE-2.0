import { NextResponse } from 'next/server';
import { appCache } from '@/lib/cache';
import { getAuditLogs } from '@/lib/audit-logger';

export async function GET() {
  const uptimeSeconds = process.uptime();
  const memoryUsage = process.memoryUsage();
  const cacheStats = appCache.getStats();
  const recentLogs = getAuditLogs().slice(0, 5);

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Thinkkaro (RepairHub) Core Platform',
    version: '2.0.0',
    metrics: {
      uptimeSeconds: Math.floor(uptimeSeconds),
      memory: {
        rssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),
        heapTotalMB: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
        heapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      },
      cache: cacheStats,
      auditLogsLogged: recentLogs.length,
    },
    security: {
      rateLimiter: 'Active (10 req / 15 sec)',
      headersInjected: true,
      xssSanitizer: 'Active',
    },
  });
}
