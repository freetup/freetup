"use client";

import { IconPhoto, IconX } from "@tabler/icons-react";
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
          <IconPhoto className="mx-auto size-12 text-muted-foreground" />
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
            <IconX className="size-8" />
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
