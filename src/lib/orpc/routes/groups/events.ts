import { ORPCError } from "@orpc/client";
import { eq } from "drizzle-orm";
import z from "zod";
import * as schema from "~/db/schema";
import { base } from "~/lib/orpc/context";

export * as attendees from "./events/attendees";

export const get = base
  .input(z.object({ eventId: z.string() }))
  .handler(async ({ context, input }) => {
    const event = await context.db.query.event.findFirst({
      where: eq(schema.event.id, input.eventId),
    });

    return event;
  });

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

const CreateEventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  description: z.string().optional(),
  location: z.string().optional(),
  startsAt: z.string().min(1, "Start date and time is required"),
  endsAt: z.string().min(1, "End date and time is required"),
  status: z.enum(["draft", "published", "cancelled"]),
});

export const create = base
  .input(z.object({ slug: z.string(), event: CreateEventSchema }))
  .handler(async ({ context, input }) => {
    if (!context.user) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "Unauthorized",
      });
    }

    const group = await context.db.query.organisation.findFirst({
      where: eq(schema.organisation.slug, input.slug),
    });

    if (!group) {
      throw new ORPCError("NOT_FOUND", {
        message: "Group not found",
      });
    }

    try {
      const [event] = await context.db
        .insert(schema.event)
        .values({
          organisationId: group.id,
          name: input.event.name,
          description: input.event.description,
          location: input.event.location,
          startsAt: new Date(input.event.startsAt),
          endsAt: new Date(input.event.endsAt),
          status: input.event.status,
          createdAt: new Date(),
        })
        .returning();

      return event;
    } catch (error) {
      console.error(error);

      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Internal server error",
      });
    }
  });
