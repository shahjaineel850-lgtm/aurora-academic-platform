import type { User } from './types';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1';
export class ApiError extends Error { constructor(public status: number, message: string, public code = 'API_ERROR') { super(message); } }
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers); headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  let response: Response;
  try { response = await fetch(`${API_BASE}${path}`, { ...init, headers, credentials: 'include' }); }
  catch { throw new ApiError(0, 'The API is unavailable. Check your connection and try again.', 'OFFLINE'); }
  if (!response.ok) { let message = `Request failed (${response.status})`; let code = 'API_ERROR'; try { const body = await response.json(); message = body?.error?.message ?? message; code = body?.error?.code ?? code; } catch {} throw new ApiError(response.status, message, code); }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export async function getCurrentUser() { return apiRequest<User>('/auth/me'); }
