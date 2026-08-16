import type { Response } from "express";

export interface ApiResult {
  status: number;
  body: unknown;
}

export function ok(message: string): ApiResult {
  return { status: 200, body: { ok: true, message } };
}

export function badRequest(message: string, errors?: Record<string, string>): ApiResult {
  return { status: 400, body: { ok: false, message, errors } };
}

export function serverError(message = "Something went wrong. Please try again."): ApiResult {
  return { status: 500, body: { ok: false, message } };
}

export function notFound(message = "Not found."): ApiResult {
  return { status: 404, body: { ok: false, message } };
}

export function send(res: Response, result: ApiResult): void {
  res.status(result.status).json(result.body);
}
