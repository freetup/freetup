"use client";

import {
  IconArrowRight,
  IconCalendar,
  IconMapPin,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { client } from "~/lib/orpc";

export default function Home() {
  const { data: groups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      return client.groups.list();
    },
  });

  const { data: upcomingEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: async () => {
      return client.events.upcoming({ limit: 6 });
    },
  });

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <div className="space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Groups & Events
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find and join communities that match your interests
            </p>
          </div>
          <Button asChild>
            <Link href="/start">Start a Group</Link>
          </Button>
        </div>

        {/* Upcoming Events Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>

          {isLoadingEvents && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-lg border bg-muted"
                />
              ))}
            </div>
          )}

          {!isLoadingEvents && upcomingEvents && upcomingEvents.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/${event.organisation.slug}/events/${event.id}`}
                  className="group rounded-lg border bg-card transition-colors hover:border-primary"
                >
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop"
                      alt={event.name}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <IconCalendar className="size-3.5" />
                      <span>{format(event.startsAt, "EEE, MMM d")}</span>
                      <span>•</span>
                      <ClockIcon className="size-3.5" />
                      <span>{format(event.startsAt, "h:mm a")}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                      {event.name}
                    </h3>
                    {event.description && (
                      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {event.organisation.logo ? (
                          <img
                            src={event.organisation.logo}
                            alt={event.organisation.name}
                            className="size-5 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-xs font-semibold text-primary">
                              {event.organisation.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="truncate text-xs">
                          {event.organisation.name}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <IconMapPin className="size-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoadingEvents &&
            upcomingEvents &&
            upcomingEvents.length === 0 && (
              <div className="rounded-lg border bg-card p-12 text-center">
                <IconCalendar className="mx-auto size-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  No upcoming events
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back soon for new events from groups
                </p>
              </div>
            )}
        </section>

        {/* Groups Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Groups</h2>
          </div>

          {/* Loading State */}
          {isLoadingGroups && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-lg border bg-muted"
                />
              ))}
            </div>
          )}

          {/* Groups Grid */}
          {!isLoadingGroups && groups && groups.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/${group.slug}`}
                  className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary"
                >
                  <div className="space-y-4">
                    {/* Logo */}
                    {group.logo ? (
                      <div className="size-16 overflow-hidden rounded-lg">
                        <img
                          src={group.logo}
                          alt={group.name}
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-16 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-2xl font-bold text-primary">
                          {group.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary">
                        {group.name}
                      </h3>
                      {group.description && (
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {group.description}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IconUsersGroup className="size-4" />
                      <span className="flex-1 truncate">{group.slug}</span>
                      <IconArrowRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoadingGroups && groups && groups.length === 0 && (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <IconUsersGroup className="mx-auto size-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No groups yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get started by creating the first group
                </p>
                <Button asChild className="mt-6">
                  <Link href="/start">Start a Group</Link>
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
