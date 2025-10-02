import { Skeleton } from "~/components/ui/skeleton";

export default function GroupLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <Skeleton className="h-96 w-full rounded-none" />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12">
        {/* Group Header Skeleton */}
        <div className="relative -mt-20 mb-8">
          <div className="space-y-4 rounded-lg border bg-card p-8 shadow-lg">
            <Skeleton className="h-10 w-96" />

            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-64" />
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-40" />
              <Skeleton className="size-11" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-8 flex gap-6 border-b">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* What we're about */}
            <section>
              <Skeleton className="mb-4 h-8 w-48" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </section>

            {/* Upcoming events */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-5 w-16" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-lg border bg-card"
                  >
                    <Skeleton className="aspect-video w-full" />
                    <div className="space-y-2 p-4">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizers */}
            <div className="rounded-lg border bg-card p-6">
              <Skeleton className="mb-4 h-6 w-24" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Skeleton key={i} className="size-12 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
