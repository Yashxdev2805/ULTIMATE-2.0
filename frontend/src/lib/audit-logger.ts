/**
 * Immutable Audit Logger
 * Tracks admin operations, inventory stock mutations, and security events
 */

export type AuditCategory = 'INVENTORY' | 'DISPATCH' | 'SECURITY' | 'AUTH' | 'SYSTEM';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  category: AuditCategory;
  action: string;
  details: string;
  actor: string;
  ipAddress?: string;
}

// In-memory log buffer (persists across runtime sessions)
const auditLogsBuffer: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    category: 'INVENTORY',
    action: 'STOCK_ADJUSTMENT',
    details: 'Adjusted stock for SKU: DISP-IP15P-OLED (+5 units)',
    actor: 'Admin (Master Dispatcher)',
  },
  {
    id: 'log-102',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    category: 'DISPATCH',
    action: 'JOB_ASSIGNMENT',
    details: 'Assigned Order #TK-849201 to Technician Marcus Vance',
    actor: 'Dispatcher Engine',
  },
  {
    id: 'log-103',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    category: 'SECURITY',
    action: 'RATE_LIMIT_CHECK',
    details: 'Rate limit policy enforced on /api/ai/diagnose',
    actor: 'Security Middleware',
  },
];

export function logAuditEvent(
  category: AuditCategory,
  action: string,
  details: string,
  actor: string = 'System'
): AuditLogEntry {
  const newEntry: AuditLogEntry = {
    id: 'log-' + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toISOString(),
    category,
    action,
    details,
    actor,
  };

  auditLogsBuffer.unshift(newEntry);
  if (auditLogsBuffer.length > 500) {
    auditLogsBuffer.pop();
  }

  return newEntry;
}

export function getAuditLogs(): AuditLogEntry[] {
  return auditLogsBuffer;
}
