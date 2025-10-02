"use client";

import { IconCalendar } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/ui/button";
import { orpc } from "~/lib/orpc/react-query";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupPage({ params }: PageProps) {
  const { slug } = use(params);

  const { data: group } = useSuspenseQuery(
    orpc.groups.get.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const { data: members = [] } = useSuspenseQuery(
    orpc.groups.members.list.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const { data: events = [] } = useSuspenseQuery(
    orpc.groups.events.list.queryOptions({
      input: {
        slug,
      },
    }),
  );

  if (!group) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Group not found</h1>
          <p className="mt-2 text-muted-foreground">
            The group you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* What we're about */}
        <section>
          <h2 className="mb-4 text-2xl font-bold">What we're about</h2>
          <div className="space-y-4 text-muted-foreground">
            {group.description ? (
              <p className="whitespace-pre-wrap">{group.description}</p>
            ) : (
              <p>No description available for this group yet.</p>
            )}
          </div>
        </section>

        {/* Upcoming events */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Upcoming events{" "}
              <span className="text-muted-foreground">{events.length}</span>
            </h2>
            {events.length > 0 && (
              <Button variant="link" asChild>
                <Link href={`/${slug}/events`}>See all</Link>
              </Button>
            )}
          </div>

          {events.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {events.map((event) => (
                <Link
                  href={`/${slug}/events/${event.id}`}
                  key={event.id}
                  className="overflow-hidden rounded-lg border bg-card transition-colors hover:border-primary"
                >
                  {/* Event card content */}
                  <div className="aspect-video w-full bg-muted" />
                  <div className="p-4">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {format(new Date(event.startsAt), "PP")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-12 text-center">
              <IconCalendar className="mx-auto size-12 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">No upcoming events</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back soon for new events
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Organizers */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Organizers</h3>
          <div className="space-y-3">
            {members
              .filter((m) => m.role === "admin" || m.role === "owner")
              .slice(0, 3)
              .map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  {member.user.image ? (
                    <img
                      src={member.user.image}
                      alt={member.user.name}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold text-primary">
                        {member.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">
                      {member.user.name}
                    </p>
                  </div>
                </div>
              ))}

            {members.filter((m) => m.role === "admin" || m.role === "owner")
              .length === 0 && (
              <p className="text-sm text-muted-foreground">
                No organizers listed
              </p>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Members{" "}
              <span className="text-muted-foreground">{members.length}</span>
            </h3>
            {members.length > 0 && (
              <Button variant="link" size="sm" asChild>
                <Link href={`/${slug}/members`}>See all</Link>
              </Button>
            )}
          </div>

          {members.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {members.slice(0, 12).map((member) => (
                <div key={member.id} className="relative">
                  {member.user.image ? (
                    <img
                      src={member.user.image}
                      alt={member.user.name}
                      className="size-12 rounded-full object-cover"
                      title={member.user.name}
                    />
                  ) : (
                    <div
                      className="flex size-12 items-center justify-center rounded-full bg-primary/10"
                      title={member.user.name}
                    >
                      <span className="text-sm font-semibold text-primary">
                        {member.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No members yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
