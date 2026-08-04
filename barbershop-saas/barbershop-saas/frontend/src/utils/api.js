export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Erro inesperado. Tente novamente.');
  }

  return data;
}
