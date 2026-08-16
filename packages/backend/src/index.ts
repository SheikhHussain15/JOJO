import { createApp } from "./app.ts";

const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? 4000);

const app = createApp();

app.listen(port, host, () => {
  console.log(`[backend] API listening on http://${host}:${port}`);
});
