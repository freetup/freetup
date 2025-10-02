import { relations } from "drizzle-orm";
import { event, member, organisation, user } from "./models";

export const membersRelation = relations(member, ({ one }) => ({
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  organisation: one(organisation, {
    fields: [member.organisationId],
    references: [organisation.id],
  }),
}));

export const organisationRelation = relations(organisation, ({ many }) => ({
  members: many(member),
  events: many(event),
}));

export const eventsRelation = relations(event, ({ one }) => ({
  organisation: one(organisation, {
    fields: [event.organisationId],
    references: [organisation.id],
  }),
}));
