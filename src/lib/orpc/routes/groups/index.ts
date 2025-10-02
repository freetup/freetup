import { eq } from "drizzle-orm";
import z from "zod";
import { organisation } from "~/db/schema";
import { base } from "~/lib/orpc/context";

export const get = base
  .input(z.object({ slug: z.string() }))
  .handler(async ({ context, input }) => {
    const groups = await context.db.query.organisation.findFirst({
      where: eq(organisation.slug, input.slug),
    });

    return groups;
  });

export const list = base.handler(async ({ context }) => {
  const groups = await context.db.query.organisation.findMany();

  return groups;
});

export const isAdmin = base
  .input(z.object({ slug: z.string() }))
  .handler(async ({ context, input }) => {
    const { user } = context;

    if (!user?.id) {
      return false;
    }

    const group = await context.db.query.organisation.findFirst({
      where: eq(organisation.slug, input.slug),
    });

    if (!group) {
      return false;
    }

    const membership = await context.db.query.member.findFirst({
      where: (member, { and, eq }) =>
        and(eq(member.userId, user.id), eq(member.organisationId, group.id)),
    });

    return membership?.role === "admin" || membership?.role === "owner";
  });

export * as events from "./events";
export * as members from "./members";
