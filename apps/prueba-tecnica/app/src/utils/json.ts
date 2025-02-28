// src/utils/json.ts
export function json(data: any, init?: ResponseInit): Response {
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  }
  