import { os } from "@orpc/server";
import { cookies, headers } from "next/headers";
import { db } from "~/db";

const root = os.use(async ({ next }) =>
  next({
    context: {
      headers: await headers(),
      cookies: await cookies(),
    },
  })
);

export const base = root.use(async ({ next }) =>
  next({
    context: {
      db: db,
    },
  })
);
