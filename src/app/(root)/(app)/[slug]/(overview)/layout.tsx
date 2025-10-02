"use client";

import { IconMapPin, IconShare, IconUsersGroup } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import pluralize from "pluralize";
import { type PropsWithChildren, use } from "react";
import { Button } from "~/components/ui/button";
import { orpc } from "~/lib/orpc/react-query";
import { GroupTabs } from "./components/group-tabs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupLayout({
  params,
  children,
}: PropsWithChildren<PageProps>) {
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
    <>
      {/* Hero Section with Image */}
      <div className="relative h-96 w-full overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&h=400&fit=crop"
          alt={group.name}
          className="size-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        {/* Group Header */}
        <div className="relative -mt-20 mb-8">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <h1 className="mb-2 text-4xl font-bold">{group.name}</h1>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <IconMapPin className="size-4" />
                <span>Brighton, United Kingdom</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUsersGroup className="size-4" />
                <span>{pluralize("member", members.length, true)}</span>
                <span>•</span>
                <span>Public group</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button size="lg">Join this group</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <IconShare />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <GroupTabs slug={slug} />

        {children}
      </div>
    </>
  );
}
