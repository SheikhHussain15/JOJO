import express from "express";
import type { ErrorRequestHandler, RequestHandler } from "express";
import cors from "cors";
import { contactRouter } from "./routes/contact.ts";
import { careersRouter } from "./routes/careers.ts";
import { getAllowedCorsOrigins } from "./lib/constants.ts";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");

  const corsOrigins = getAllowedCorsOrigins();
  app.use(cors(corsOrigins ? { origin: corsOrigins } : {}));

  app.use(express.json({ limit: "1mb" }));

  app.use(contactRouter);
  app.use(careersRouter);

  const notFound: RequestHandler = (_req, res) => {
    res.status(404).json({ ok: false, message: "Not found." });
  };
  app.use(notFound);

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err?.type === "entity.parse.failed") {
      return res.status(400).json({ ok: false, message: "The request body is not valid JSON." });
    }
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ ok: false, message: "Resume is too large." });
    }
    console.error(err);
    return res.status(500).json({ ok: false, message: "Something went wrong. Please try again." });
  };
  app.use(errorHandler);

  return app;
}
