import { relations } from "drizzle-orm";
import { member, organisation, user } from "./auth";
import { attendees, event } from "./models";

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

export const eventsRelation = relations(event, ({ one, many }) => ({
  organisation: one(organisation, {
    fields: [event.organisationId],
    references: [organisation.id],
  }),
  attendees: many(attendees),
}));

export const attendeesRelation = relations(attendees, ({ one }) => ({
  event: one(event, {
    fields: [attendees.eventId],
    references: [event.id],
  }),
  user: one(user, {
    fields: [attendees.userId],
    references: [user.id],
  }),
}));

export const usersRelation = relations(user, ({ many }) => ({
  attendees: many(attendees),
  members: many(member),
}));
