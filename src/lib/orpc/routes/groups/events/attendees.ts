import { eq } from "drizzle-orm";
import { z } from "zod";
import * as schema from "~/db/schema";
import { base } from "~/lib/orpc/context";

export const list = base
  .input(
    z.object({
      eventId: z.string(),
    }),
  )
  .handler(async ({ context, input }) => {
    const event = await context.db.query.event.findFirst({
      where: eq(schema.event.id, input.eventId),
      with: {
        attendees: {
          with: {
            user: true,
          },
        },
      },
    });

    return event?.attendees;
  });
