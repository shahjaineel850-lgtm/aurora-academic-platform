export type Role = 'STUDENT' | 'FACULTY' | 'DEAN' | 'ADMIN';
export type User = { id: string; name: string; email: string; roles: Role[]; status: string };
export type Course = { id: string; code: string; title: string; description: string; term: string; facultyIds: string[]; progress?: number; students?: number };
export type Recommendation = { id: string; title: string; reason: string; topic: string; status: 'NEW'|'IN_PROGRESS'|'COMPLETED'|'DISMISSED'; createdAt: string };
export type AlertItem = { id: string; title: string; description: string; severity: 'HIGH'|'MEDIUM'|'LOW'; evidence: string[]; acknowledged?: boolean };
