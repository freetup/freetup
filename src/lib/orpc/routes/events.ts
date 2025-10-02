import { gte } from "drizzle-orm";
import z from "zod";
import * as schema from "~/db/schema";
import { base } from "~/lib/orpc/context";

export const upcoming = base
  .input(
    z
      .object({
        limit: z.number().int().min(1).max(100).default(10),
      })
      .optional(),
  )
  .handler(async ({ context, input }) => {
    const limit = input?.limit ?? 10;

    const events = await context.db.query.event.findMany({
      where: gte(schema.event.startsAt, new Date()),
      orderBy: (event, { asc }) => [asc(event.startsAt)],
      limit,
      with: {
        organisation: {
          columns: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
    });

    return events;
  });
