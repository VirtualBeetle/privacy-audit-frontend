export interface AuditEvent {
  id: string;
  tenantId: string;
  tenantName: string;
  tenantUserId: string;
  eventId: string;
  actionCode: 'READ' | 'EXPORT' | 'DELETE' | 'SHARE';
  actionLabel: string;
  dataFields: string[];
  reasonCode: string;
  reasonLabel: string;
  actorType: 'SYSTEM' | 'EMPLOYEE' | 'THIRD_PARTY' | 'OTHER_USER';
  actorLabel: string;
  actorIdentifier: string | null;
  sensitivityCode: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  thirdPartyInvolved: boolean;
  thirdPartyName: string | null;
  retentionDays: number;
  region: string | null;
  consentObtained: boolean;
  userOptedOut: boolean;
  meta: Record<string, string> | null;
  occurredAt: string;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}

export type TenantFilter = 'all' | 'health' | 'social';
