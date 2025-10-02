"use client";

import { IconMapPin, IconShare, IconUsersGroup } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { differenceInHours, format, isFuture, isPast } from "date-fns";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/ui/button";
import { orpc } from "~/lib/orpc/react-query";
import { cn } from "~/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
    eventId: string;
  }>;
}

export default function EventDetailsPage({ params }: PageProps) {
  const { slug, eventId } = use(params);

  const { data: group } = useSuspenseQuery(
    orpc.groups.get.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const { data: event } = useSuspenseQuery(
    orpc.groups.events.get.queryOptions({
      input: {
        eventId,
      },
    }),
  );

  const { data: attendees = [] } = useSuspenseQuery(
    orpc.groups.events.attendees.list.queryOptions({
      input: {
        eventId,
      },
    }),
  );

  if (!event || !group) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Event not found</h1>
          <Button asChild className="mt-6">
            <Link href={`/${slug}/events`}>Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isUpcoming = isFuture(new Date(event.startsAt));
  const isPastEvent = isPast(new Date(event.startsAt));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&h=400&fit=crop"
          alt={event.name}
          className="size-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        {/* Header Card */}
        <div className="relative -mt-20 mb-8">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <div className="mb-4">
              <Link
                href={`/${slug}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to {group.name}
              </Link>
            </div>

            <div className="flex items-start gap-6">
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center rounded-lg border bg-muted px-6 py-4 text-center">
                <span className="text-sm font-medium uppercase text-muted-foreground">
                  {format(new Date(event.startsAt), "MMM")}
                </span>
                <span className="text-4xl font-bold">
                  {format(new Date(event.startsAt), "d")}
                </span>
              </div>

              {/* Event Info */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h1 className="text-4xl font-bold">{event.name}</h1>
                  <div
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
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

                <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="size-5" />
                    <span>
                      {format(new Date(event.startsAt), "EEEE, MMMM d, yyyy")}{" "}
                      at {format(new Date(event.startsAt), "h:mm a")}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <IconMapPin className="size-5" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {isUpcoming && event.status === "published" && (
                    <>
                      <Button size="lg">Attend</Button>
                      <Button variant="outline" size="lg">
                        Add to Calendar
                      </Button>
                    </>
                  )}
                  {isPastEvent && (
                    <div className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                      This event has ended
                    </div>
                  )}
                  <Button variant="outline" size="icon">
                    <IconShare className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">Details</h2>
              <div className="rounded-lg border bg-card p-6">
                {event.description ? (
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {event.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    No description available for this event.
                  </p>
                )}
              </div>
            </section>

            {/* Attendees */}
            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Attendees{" "}
                <span className="text-muted-foreground">
                  {attendees.length}
                </span>
              </h2>
              {attendees.length > 0 ? (
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-wrap gap-2">
                    {attendees.slice(0, 20).map((attendee: any) => (
                      <div
                        key={attendee.id}
                        className="relative"
                        title={attendee.name}
                      >
                        {attendee.image ? (
                          <img
                            src={attendee.image}
                            alt={attendee.name}
                            className="size-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-semibold text-primary">
                              {attendee.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    {attendees.length > 20 && (
                      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        +{attendees.length - 20}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-12 text-center">
                  <IconUsersGroup className="mx-auto size-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    No attendees yet
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Be the first to attend this event
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Host */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Hosted by</h3>
              <Link
                href={`/${slug}`}
                className="flex items-center gap-3 hover:opacity-80"
              >
                {group.logo ? (
                  <img
                    src={group.logo}
                    alt={group.name}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-semibold text-primary">
                      {group.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold">{group.name}</p>
                  <p className="text-sm text-muted-foreground">View group</p>
                </div>
              </Link>
            </div>

            {/* Event Info */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Event Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">
                    {differenceInHours(
                      new Date(event.endsAt),
                      new Date(event.startsAt),
                    )}{" "}
                    hours
                  </p>
                </div>
                <div>
                  <p className="font-medium">Starts</p>
                  <p className="text-muted-foreground">
                    {format(new Date(event.startsAt), "PPp")}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Ends</p>
                  <p className="text-muted-foreground">
                    {format(new Date(event.endsAt), "PPp")}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            {event.location && (
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Location</h3>
                <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <IconMapPin className="mx-auto size-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Map view
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm">{event.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
