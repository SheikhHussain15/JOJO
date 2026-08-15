// Local API server that mounts the same Vercel handler logic so the full
// pipeline (validation → spam → file sniffing → delivery sink) runs locally.
// Usage: npm run dev:api   (then POST to http://localhost:8787/api/*)

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { POST as contactHandler } from "../api/contact.ts";
import { POST as careersHandler } from "../api/careers.ts";

export function createApiServer() {
  const server = createServer(async (req, res) => {
    try {
      await routeRequest(req, res);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, message: "Internal server error." }));
    }
  });
  return server;
}

function sanitizeHeaders(req: IncomingMessage): Record<string, string> {
  const out: Record<string, string> = {};
  const ignored = new Set([
    "host",
    "connection",
    "content-length",
    "transfer-encoding",
    "keep-alive",
    "upgrade",
  ]);
  for (const [key, value] of Object.entries(req.headers)) {
    if (ignored.has(key)) continue;
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

async function routeRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const body = Buffer.concat(chunks);

  const request = new Request(url, {
    method: req.method,
    headers: sanitizeHeaders(req),
    body: req.method === "POST" ? body : undefined,
  });

  let response: Response;
  if (url.pathname === "/api/contact") {
    response = await contactHandler(request);
  } else if (url.pathname === "/api/careers") {
    response = await careersHandler(request);
  } else {
    response = new Response(JSON.stringify({ ok: false, message: "Not found." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  res.end(Buffer.from(await response.arrayBuffer()));
}

if (import.meta.main) {
  const port = Number(process.env.PORT ?? 8787);
  createApiServer().listen(port, () => {
    console.log(`[dev:api] listening on http://localhost:${port}`);
  });
}
