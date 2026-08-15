export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function ok(message: string): Response {
  return json({ ok: true, message });
}

export function badRequest(message: string, errors?: Record<string, string>): Response {
  return json({ ok: false, message, errors }, 400);
}

export function serverError(message = "Something went wrong. Please try again."): Response {
  return json({ ok: false, message }, 500);
}
