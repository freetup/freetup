"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { Button } from "~/components/ui/button";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupPhotosPage({ params }: PageProps) {
  const { slug } = use(params);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // TODO: Replace with actual photos endpoint when available
  const { data: photos = [] } = useSuspenseQuery({
    queryKey: ["groups", slug, "photos"],
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
            Photos{" "}
            <span className="text-muted-foreground">{photos.length}</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Photos from group events and meetups
          </p>
        </div>
        <Button>Upload Photo</Button>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo: any, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedPhoto(photo.url)}
              className="group relative aspect-square overflow-hidden rounded-lg border bg-muted transition-all hover:ring-2 hover:ring-primary"
            >
              <img
                src={photo.url}
                alt={photo.caption || "Group photo"}
                className="size-full object-cover transition-transform group-hover:scale-105"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-sm text-white">{photo.caption}</p>
                </div>
              )}
            </button>
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
            <title>No Photos</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold">No photos yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to share a photo from a group event
          </p>
          <Button className="mt-6">Upload Photo</Button>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 text-white hover:text-gray-300"
          >
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <img
            src={selectedPhoto}
            alt="Full size"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </>
  );
}
