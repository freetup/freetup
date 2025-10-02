# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Freetup is a Meetup.com-inspired group management and events platform built with Next.js 15, allowing users to create groups (called "organisations" in the database), manage events, and coordinate meetups.

## Common Commands

```bash
# Development
bun dev                 # Start dev server with Turbopack
bun run build          # Production build with Turbopack
bun run start          # Start production server

# Code Quality
bun run lint           # Run Biome linter/checker
bun run format         # Format code with Biome

# Database
bunx drizzle-kit generate  # Generate migrations
bunx drizzle-kit migrate   # Run migrations
bunx drizzle-kit studio    # Open Drizzle Studio
```

## Tech Stack & Key Dependencies

- **Framework**: Next.js 15 (App Router, React Server Components)
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Authentication**: Better Auth with Google OAuth, email/password, and organization plugin
- **API Layer**: oRPC (type-safe RPC framework) with TanStack Query
- **UI**: shadcn/ui (New York style) + Tailwind CSS v4 + Tabler Icons
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: date-fns (always use this, never native Date methods)
- **Code Quality**: Biome for linting and formatting

## Architecture

### Database Schema (British spelling: "organisation")

The database uses **British English spelling** for organization-related tables:
- `organisation` table (NOT "organization")
- `organisationId` field names (NOT "organizationId")
- Better Auth organization plugin is configured with `modelName: "organisation"`

Key tables:
- `user`, `session`, `account`, `verification` (Better Auth)
- `organisation` - Groups/communities with slug, name, description, logo
- `member` - User memberships in organisations (roles: owner, admin, member)
- `event` - Events belonging to organisations with status (draft, published, cancelled)
- `event_attendee` - Event attendance tracking
- `invitation` - Organisation invitations

Schema files: `src/db/schema/models.ts` (tables) and `src/db/schema/relations.ts` (Drizzle relations)

### oRPC API Structure

API routes are organized under `src/lib/orpc/routes/`:
```
routes/
├── groups/
│   ├── index.ts       # groups.get, groups.list, groups.isAdmin
│   ├── events.ts      # groups.events.list, groups.events.get, groups.events.create
│   ├── members.ts     # groups.members.list
│   └── events/
│       └── attendees.ts  # groups.events.attendees.list
└── events.ts          # (deprecated/unused)
```

**oRPC Context** (`src/lib/orpc/context.ts`):
- Automatically injects `db` (Drizzle instance) and `user` (from Better Auth session) into all handlers
- Access via `context.db` and `context.user` in handlers

**Client Usage**:
```tsx
import { orpc } from "~/lib/orpc/react-query";

// In components
const { data: group } = useSuspenseQuery(
  orpc.groups.get.queryOptions({ input: { slug } })
);

const createEvent = useMutation(
  orpc.groups.events.create.mutationOptions({
    onSuccess() { /* ... */ }
  })
);
```

### App Router Structure

```
app/
├── (auth)/                    # Auth pages (login, signup, forgot-password, terms, privacy)
├── (root)/
│   ├── start/                # Group creation wizard (3-step form)
│   └── (app)/
│       ├── page.tsx          # Groups listing homepage
│       └── [slug]/           # Group pages by slug
│           ├── layout.tsx    # Group header, tabs, hero image (shared layout)
│           ├── (overview)/   # Tab pages under group layout
│           │   ├── page.tsx           # Group overview (default tab)
│           │   ├── events/page.tsx    # Events list with upcoming/past
│           │   ├── members/page.tsx   # Members list with search
│           │   ├── photos/page.tsx    # Photo grid with modal
│           │   └── discussions/page.tsx  # Discussion threads
│           └── events/
│               ├── create/page.tsx    # Event creation form (admins only)
│               └── [eventId]/page.tsx # Event detail page
```

**Important**: Pages in `[slug]/(overview)/` inherit the group layout (hero, header, tabs) from `[slug]/layout.tsx`. Pages outside this folder (like event creation) are standalone.

### Authentication & Authorization

- **Better Auth** handles authentication with Google OAuth and email/password
- **Organization Plugin** manages group memberships with configurable field names
- **Auth Context**: Available in all oRPC handlers via `context.user`
- **Admin Check**: Use `orpc.groups.isAdmin.queryOptions()` to check if current user is admin/owner of a group

### UI Components (shadcn/ui)

- **Style**: New York variant
- **Icons**: Tabler Icons React (prefer over Lucide)
- **Location**: `~/components/ui/`
- **Import aliases**: Use `~/ ` prefix (e.g., `~/components/ui/button`)

### Date Formatting

**Always use date-fns**, never native JavaScript Date methods:
```tsx
// ❌ WRONG
new Date(event.startsAt).toLocaleDateString()
new Date(event.startsAt) >= new Date()

// ✅ CORRECT
import { format, isFuture, isPast, differenceInHours } from "date-fns";
format(event.startsAt, "PP")           // Localized date
format(event.startsAt, "PPp")          // Localized date + time
format(event.startsAt, "MMM d, yyyy")  // Custom format
isFuture(event.startsAt)               // Date comparisons
differenceInHours(end, start)          // Duration calculations
```

Common formats:
- `"PP"` - Localized date (e.g., "Jan 15, 2025")
- `"PPp"` - Localized date + time
- `"MMM"` - Short month name
- `"d"` - Day of month
- `"h:mm a"` - 12-hour time
- `"EEEE, MMMM d, yyyy"` - Full date

## Development Patterns

### Forms with React Hook Form + Zod

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
});

type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { name: "", email: "" },
});

function onSubmit(values: FormValues) {
  // Handle submission
}
```

### oRPC Endpoint Pattern

```typescript
// src/lib/orpc/routes/groups/example.ts
import { eq } from "drizzle-orm";
import { z } from "zod";
import { organisation } from "~/db/schema";
import { base } from "~/lib/orpc/context";

export const myEndpoint = base
  .input(z.object({ slug: z.string() }))
  .handler(async ({ context, input }) => {
    // context.db is Drizzle instance
    // context.user is Better Auth session user (null if not authenticated)

    const group = await context.db.query.organisation.findFirst({
      where: eq(organisation.slug, input.slug),
    });

    return group;
  });
```

### Database Queries with Drizzle

```typescript
// Simple query
const group = await db.query.organisation.findFirst({
  where: eq(organisation.slug, slug),
});

// With relations
const group = await db.query.organisation.findFirst({
  where: eq(organisation.slug, slug),
  with: {
    events: true,
    members: {
      with: { user: true },
    },
  },
});

// Insert with returning
const [event] = await db.insert(schema.event)
  .values({
    organisationId: group.id,
    name: "Event Name",
    createdAt: new Date(),
    startsAt: new Date(input.startsAt),
    endsAt: new Date(input.endsAt),
  })
  .returning();
```

## Important Notes

1. **Organisation Spelling**: Always use British spelling (`organisation`, `organisationId`) in database and schema code
2. **Date Handling**: Never use native Date methods - always import and use date-fns functions
3. **Import Paths**: Use `~/` alias for all imports from `src/`
4. **Icons**: Prefer Tabler Icons (`@tabler/icons-react`) as configured in shadcn
5. **oRPC Context**: User session and DB are automatically injected - don't create separate DB connections
6. **Layout Inheritance**: Pages in `[slug]/(overview)/` automatically get the group layout with tabs
7. **Admin Actions**: Check `orpc.groups.isAdmin` before showing admin-only UI elements
