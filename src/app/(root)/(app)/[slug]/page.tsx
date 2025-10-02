"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import pluralize from "pluralize";
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

  console.log(members);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-start gap-6">
            {/* Logo */}
            {group.logo ? (
              <div className="size-24 overflow-hidden rounded-lg">
                <img
                  src={group.logo}
                  alt={group.name}
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <div className="flex size-24 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-4xl font-bold text-primary">
                  {group.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight">
                {group.name}
              </h1>
              {group.description && (
                <p className="mt-3 text-lg text-muted-foreground">
                  {group.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4">
                <Button>Join Group</Button>
                <Button variant="outline">Share</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* About Section */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold">About</h2>
                <div className="rounded-lg border bg-card p-6">
                  {group.description ? (
                    <p className="text-muted-foreground">{group.description}</p>
                  ) : (
                    <p className="text-muted-foreground">
                      No description available for this group yet.
                    </p>
                  )}
                </div>
              </section>

              {/* Upcoming Events */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <svg
                      className="size-12 text-muted-foreground"
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
                    <h3 className="mt-4 text-lg font-semibold">
                      No upcoming events
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Check back soon for new events
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Group Info */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 font-semibold">Group Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="size-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Link</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    freetup.com/{group.slug}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="size-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Members</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    {pluralize("member", members.length, true)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="size-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Created</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    Created {new Date(group.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 font-semibold">Members ({members.length})</h3>
              {members.length > 0 ? (
                <div className="space-y-3">
                  {members.slice(0, 5).map((member) => (
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
                        <p className="truncate text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                  {members.length > 5 && (
                    <Button variant="ghost" size="sm" className="w-full">
                      View all {members.length} members
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <svg
                      className="size-6 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>User</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    No members yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
