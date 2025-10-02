import { ORPCError } from "@orpc/client";
import { eq } from "drizzle-orm";
import z from "zod";
import * as schema from "~/db/schema";
import { base } from "~/lib/orpc/context";

export const list = base
  .input(
    z.object({
      slug: z.string(),
    }),
  )
  .handler(async ({ context, input }) => {
    const organisation = await context.db.query.organisation.findFirst({
      columns: {},
      where: eq(schema.organisation.slug, input.slug),
      with: {
        events: {
          columns: {
            id: true,
            name: true,
            description: true,
            startsAt: true,
            endsAt: true,
            location: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!organisation) {
      throw new ORPCError("NOT_FOUND", {
        message: "Organisation not found",
      });
    }

    return organisation.events;
  });
