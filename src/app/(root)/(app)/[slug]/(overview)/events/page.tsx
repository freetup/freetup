"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconMapPin,
} from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format, isFuture, isPast } from "date-fns";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/ui/button";
import { orpc } from "~/lib/orpc/react-query";
import { cn } from "~/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupEventsPage({ params }: PageProps) {
  const { slug } = use(params);

  const { data: events = [] } = useSuspenseQuery(
    orpc.groups.events.list.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const { data: isAdmin = false } = useSuspenseQuery(
    orpc.groups.isAdmin.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const upcomingEvents = events.filter((event) => isFuture(event.startsAt));
  const pastEvents = events.filter((event) => isPast(event.startsAt));

  return (
    <>
      {/* Upcoming Events */}
      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Upcoming Events{" "}
            <span className="text-muted-foreground">
              {upcomingEvents.length}
            </span>
          </h2>
          {isAdmin && (
            <Button asChild>
              <Link href={`/${slug}/events/create`}>Create Event</Link>
            </Button>
          )}
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/${slug}/events/${event.id}`}
                className="block"
              >
                <div className="group flex gap-6 rounded-lg border bg-card p-6 transition-colors hover:border-primary">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted px-4 py-3 text-center">
                    <span className="text-sm font-medium uppercase text-muted-foreground">
                      {format(event.startsAt, "MMM")}
                    </span>
                    <span className="text-2xl font-bold">
                      {format(event.startsAt, "d")}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                      {event.name}
                    </h3>
                    {event.description && (
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-4" />
                        <span>{format(event.startsAt, "h:mm a")}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <IconMapPin className="size-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                          event.status === "published" &&
                            "bg-green-500/10 text-green-600 dark:text-green-400",
                          event.status === "draft" &&
                            "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                          event.status === "cancelled" &&
                            "bg-red-500/10 text-red-600 dark:text-red-400",
                        )}
                      >
                        {event.status}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <IconArrowRight className="size-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-12 text-center">
            <IconCalendar className="mx-auto size-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No upcoming events</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon for new events
            </p>
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">
            Past Events{" "}
            <span className="text-muted-foreground">{pastEvents.length}</span>
          </h2>

          <div className="space-y-4">
            {pastEvents.map((event) => (
              <Link
                key={event.id}
                href={`/${slug}/events/${event.id}`}
                className="block"
              >
                <div className="group flex gap-6 rounded-lg border bg-card p-6 opacity-75 transition-all hover:border-primary hover:opacity-100">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center rounded-lg bg-muted px-4 py-3 text-center">
                    <span className="text-sm font-medium uppercase text-muted-foreground">
                      {format(event.startsAt, "MMM")}
                    </span>
                    <span className="text-2xl font-bold">
                      {format(event.startsAt, "d")}
                    </span>
                  </div>

                  {/* Event Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                      {event.name}
                    </h3>
                    {event.description && (
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-4" />
                        <span>{format(event.startsAt, "h:mm a")}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <IconMapPin className="size-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <IconArrowLeft className="size-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
