import { os } from "@orpc/server";
import { cookies, headers } from "next/headers";
import { db } from "~/db";
import { auth as authClient } from "~/lib/auth";

const root = os.use(async ({ next }) =>
  next({
    context: {
      headers: await headers(),
      cookies: await cookies(),
    },
  }),
);

export const base = root.use(async ({ next }) => {
  const session = await authClient.api.getSession({
    headers: await headers(),
  });

  return next({
    context: {
      db: db,
      user: session?.user ?? null,
    },
  });
});
