"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
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

  const upcomingEvents = events.filter(
    (event) => new Date(event.startsAt) >= new Date(),
  );
  const pastEvents = events.filter(
    (event) => new Date(event.startsAt) < new Date(),
  );

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
                      {new Date(event.startsAt).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-2xl font-bold">
                      {new Date(event.startsAt).getDate()}
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
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <title>Time</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {new Date(event.startsAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>Location</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
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
                    <svg
                      className="size-5 text-muted-foreground group-hover:text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>View Event</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-12 text-center">
            <svg
              className="mx-auto size-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Calendar</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
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
                      {new Date(event.startsAt).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-2xl font-bold">
                      {new Date(event.startsAt).getDate()}
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
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <title>Time</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {new Date(event.startsAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <svg
                            className="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <title>Location</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <svg
                      className="size-5 text-muted-foreground group-hover:text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>View Event</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
