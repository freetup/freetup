"use client";

import { IconUsersGroup } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import pluralize from "pluralize";
import { use, useState } from "react";
import { Input } from "~/components/ui/input";
import { orpc } from "~/lib/orpc/react-query";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupMembersPage({ params }: PageProps) {
  const { slug } = use(params);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: members = [] } = useSuspenseQuery(
    orpc.groups.members.list.queryOptions({
      input: {
        slug,
      },
    }),
  );

  const filteredMembers = members.filter((member) =>
    member.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const organizers = filteredMembers.filter(
    (m) => m.role === "admin" || m.role === "owner",
  );
  const regularMembers = filteredMembers.filter(
    (m) => m.role !== "admin" && m.role !== "owner",
  );

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Members{" "}
            <span className="text-muted-foreground">
              {pluralize("member", members.length, true)}
            </span>
          </h2>
        </div>
        <div className="w-full max-w-sm">
          <Input
            type="search"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Organizers Section */}
      {organizers.length > 0 && (
        <section className="mb-12">
          <h3 className="mb-6 text-xl font-semibold">
            Organizers{" "}
            <span className="text-muted-foreground">{organizers.length}</span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {organizers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-lg border bg-card p-4"
              >
                {member.user.image ? (
                  <img
                    src={member.user.image}
                    alt={member.user.name}
                    className="size-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-semibold text-primary">
                      {member.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate font-semibold">{member.user.name}</h4>
                  <div className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Members Section */}
      <section>
        <h3 className="mb-6 text-xl font-semibold">
          All Members{" "}
          <span className="text-muted-foreground">{regularMembers.length}</span>
        </h3>

        {regularMembers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-primary"
              >
                {member.user.image ? (
                  <img
                    src={member.user.image}
                    alt={member.user.name}
                    className="size-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-2xl font-semibold text-primary">
                      {member.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="truncate font-semibold">{member.user.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Joined {format(new Date(member.createdAt), "PP")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-12 text-center">
            <IconUsersGroup className="mx-auto size-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No members found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query"
                : "This group doesn't have any members yet"}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
