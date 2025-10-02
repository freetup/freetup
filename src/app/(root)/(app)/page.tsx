"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { client } from "~/lib/orpc";

export default function Home() {
  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      return client.groups.list();
    },
  });

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Discover Groups
            </h1>
            <p className="mt-2 text-muted-foreground">
              Find and join communities that match your interests
            </p>
          </div>
          <Button asChild>
            <Link href="/start">Start a Group</Link>
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
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
        {!isLoading && groups && groups.length > 0 && (
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg
                      className="mr-1 size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <title>Group Icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {group.slug}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && groups && groups.length === 0 && (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <svg
                className="mx-auto size-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Group Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
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
      </div>
    </div>
  );
}
