"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

interface GroupTabsProps {
  slug: string;
}

function Tab<T extends string>({
  href,
  children,
}: {
  href: Route<T>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={cn(
        "border-b-2 border-transparent pb-4 text-sm font-medium text-muted-foreground hover:border-muted-foreground/50 cursor-pointer",
        isActive && "border-primary text-primary",
      )}
    >
      {children}
    </Link>
  );
}

export function GroupTabs({ slug }: GroupTabsProps) {
  return (
    <div className="mb-8 border-b flex gap-8">
      <Tab href={`/${slug}`}>About</Tab>
      <Tab href={`/${slug}/events`}>Events</Tab>
      <Tab href={`/${slug}/members`}>Members</Tab>
      <Tab href={`/${slug}/photos`}>Photos</Tab>
      <Tab href={`/${slug}/discussions`}>Discussions</Tab>
    </div>
  );
}
