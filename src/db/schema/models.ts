import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organisation, user } from "./auth";

export const event = pgTable("event", {
  id: text()
    .$defaultFn(() => createId())
    .primaryKey(),
  organisationId: text("organisation_id")
    .notNull()
    .references(() => organisation.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull(),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  location: text("location"),
  status: text("status").default("draft").notNull(),
});

export const attendees = pgTable("event_attendee", {
  id: text("id").primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => event.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
