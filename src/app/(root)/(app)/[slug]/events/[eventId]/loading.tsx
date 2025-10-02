import { Skeleton } from "~/components/ui/skeleton";

export default function EventDetailsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Skeleton */}
      <Skeleton className="h-96 w-full rounded-none" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        {/* Header Card Skeleton */}
        <div className="relative -mt-20 mb-8">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            {/* Back link skeleton */}
            <Skeleton className="mb-4 h-4 w-32" />

            <div className="flex items-start gap-6">
              {/* Date Badge Skeleton */}
              <Skeleton className="h-24 w-24 rounded-lg" />

              {/* Event Info Skeleton */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-96" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton className="h-5 w-64" />
                  <Skeleton className="h-5 w-48" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-11 w-24" />
                  <Skeleton className="h-11 w-40" />
                  <Skeleton className="size-11" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <section>
              <Skeleton className="mb-4 h-8 w-32" />
              <div className="space-y-3 rounded-lg border bg-card p-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </section>

            {/* Attendees */}
            <section>
              <Skeleton className="mb-4 h-8 w-48" />
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Skeleton key={i} className="size-12 rounded-full" />
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Host */}
            <div className="rounded-lg border bg-card p-6">
              <Skeleton className="mb-4 h-6 w-24" />
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="rounded-lg border bg-card p-6">
              <Skeleton className="mb-4 h-6 w-40" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-lg border bg-card p-6">
              <Skeleton className="mb-4 h-6 w-24" />
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="mt-3 h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
