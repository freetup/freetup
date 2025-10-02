import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    PRODUCTION_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
  },
});
