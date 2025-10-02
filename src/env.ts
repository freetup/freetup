import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    PRODUCTION_URL: z.string().default("https://freetup.vercel.app"),
    VERCEL_URL: z
      .string()
      .transform((val) => (val ? `https://${val}` : "http://localhost:3000")),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
});
