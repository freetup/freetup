"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";
import { Button } from "~/components/ui/button";
import { orpc } from "~/lib/orpc/react-query";

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
              href={`/${slug}/discussions/${discussion.id}`}
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
                        {new Date(discussion.createdAt).toLocaleDateString()}
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
                        <svg
                          className="size-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <title>Comments</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{discussion.replyCount} replies</span>
                      </div>
                      {discussion.lastReplyAt && (
                        <>
                          <span>•</span>
                          <span>
                            Last reply{" "}
                            {new Date(
                              discussion.lastReplyAt,
                            ).toLocaleDateString()}
                          </span>
                        </>
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
                      <title>View Discussion</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
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
            <title>No Discussions</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
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
