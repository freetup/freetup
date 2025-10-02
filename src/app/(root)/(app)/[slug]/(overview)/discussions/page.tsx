"use client";

import { IconArrowRight, IconMessage } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/ui/button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupDiscussionsPage({ params }: PageProps) {
  const { slug } = use(params);

  // TODO: Replace with actual discussions endpoint when available
  const { data: discussions = [] } = useSuspenseQuery({
    queryKey: ["groups", slug, "discussions"],
    queryFn: async () => {
      // Placeholder data
      return [];
    },
  });

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Discussions{" "}
            <span className="text-muted-foreground">{discussions.length}</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Connect with other members and share ideas
          </p>
        </div>
        <Button>Start Discussion</Button>
      </div>

      {/* Discussions List */}
      {discussions.length > 0 ? (
        <div className="space-y-4">
          {discussions.map((discussion: any) => (
            <Link
              key={discussion.id}
              href={`/${slug}/discussions`}
              className="block"
            >
              <div className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-semibold text-primary">
                      {discussion.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-lg font-semibold group-hover:text-primary">
                      {discussion.title}
                    </h3>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{discussion.author.name}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(discussion.createdAt), "PP")}
                      </span>
                    </div>
                    {discussion.preview && (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {discussion.preview}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <IconMessage className="size-4" />
                        <span>{discussion.replyCount} replies</span>
                      </div>
                      {discussion.lastReplyAt && (
                        <>
                          <span>•</span>
                          <span>
                            Last reply{" "}
                            {format(new Date(discussion.lastReplyAt), "PP")}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <IconArrowRight className="size-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-12 text-center">
          <IconMessage className="mx-auto size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No discussions yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a conversation with other members
          </p>
          <Button className="mt-6">Start Discussion</Button>
        </div>
      )}
    </>
  );
}
